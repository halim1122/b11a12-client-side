import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuthContext from '../../Hook/useAuthContext';
import LoadingSpinner from '../../Sheared/Loading/LoadingSpinner';
import useAxiosSecure from '../../Hook/useAxiosSecure';


const PaymentForm = () => {

     const stripe = useStripe();
     const elements = useElements();
     const navigate = useNavigate();
     const { user } = useAuthContext();
     const { bookingId } = useParams();
     const axiosInstance = useAxiosSecure();
     const [error, setError] = useState('');
     const [paymenting, setPaymenting] = useState(false);



     // console.log(bookingId)

     const { data: bookingInfo = {}, isPending } = useQuery({
          queryKey: ['booking', bookingId],
          queryFn: async () => {
               const result = await axiosInstance.get(`/bookings/${bookingId}`);
               return result.data;
          }

     })

     if (isPending) {
          return <LoadingSpinner/>
     }

     // console.log(parcelInfo)
     const amount = bookingInfo.price;
     const amountInCents = amount * 100;

     const handleSubmit = async (e) => {
          setPaymenting(true)
          e.preventDefault();
          if (!stripe || !elements) {
               return;
          }

          const card = elements.getElement(CardElement)
          if (!card) {
               return;
          }

          const { error, paymentMethod } = await stripe.createPaymentMethod({
               type: 'card',
               card,
          })

          if (error) {
               // console.log("error", error);
               setError(error.message);
          } else {
               setError('');
               console.log("payment method", paymentMethod)
          }

          const res = await axiosInstance.post('/create-payment-intent', {
               amountInCents,
               bookingId,
          })

          const clientSecret = res.data.clientSecret;

          const result = await stripe.confirmCardPayment(clientSecret, {
               payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                         name: user.displayName,
                         email: user.email,
                    },
               },
          });

          if (result.error) {
               setError(result.error.message);
          } else {
               setError('');
               if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    console.log(result);
                    //step-4 
                    const paymentDoc = {
                         email: user.email,
                         bookingId,
                         amount,
                         transactionId: result.paymentIntent.id,
                         paymentMethod: result.paymentIntent.payment_method_types,
                    }

                    const PaymentRes = await axiosInstance.post('/payments', paymentDoc);
                    if (PaymentRes?.data?.insertedId) {
                         setPaymenting(false);
                         Swal.fire({
                              title: "Payment successful",
                              html: `<strong>Transaction ID:</strong> <code>${result.paymentIntent.id}</code>`,
                              icon: "success",
                              confirmButtonText: 'Go to MyBookings',
                         });
                         navigate('/dashboard/myBookings');
                    }
               }
          }

     }

     return (
          <div>
               <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                    <CardElement className='p-2 border rounded'>
                         Pay for parcel pickup
                    </CardElement>
                    <p className='text-red-500'><small>{error}</small></p>
                    <button type='submit' className='btn btn-primary w-full' disabled={!stripe}>
                         {paymenting ? `Pay ${bookingInfo.price}` : 'Loading...'}
                    </button>
               </form>
          </div>
     );
};

export default PaymentForm;