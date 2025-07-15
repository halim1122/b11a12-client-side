import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Logo from '../../Sheared/Logo/Logo';
import useAxios from '../../Hook/useAxios';
import photourl from '../../assets/image-upload-icon.png'
import photo from '../../assets/ChatGPT Image Jul 11, 2025, 02_03_06 AM.png'
import { AuthContext } from '../../Provider/AuthProvider';
import SocielGoogle from '../../Sheared/Sociel/SocielGoogle';
const RegisterForm = () => {
     const { register, formState: { errors }, handleSubmit } = useForm();
     const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
     const [registering, setRegistering] = useState(false)
     const [profilePic, setProfilePic] = useState('')
     const navigate = useNavigate();
     const fileInputRef = useRef();
     const axiosInstance = useAxios();

     const onSubmit = (data) => {
          setRegistering(true)
          console.log(data);
          createUser(data.email, data.password)
               .then(async (res) => {

                    const userInfo = {
                         email: data.email,
                         displayName: data?.name,
                         role: 'user', //default role
                         photoURL: profilePic,
                         created_at: new Date().toISOString(),
                         last_login: new Date().toISOString(),
                    }

                    const userRes = await axiosInstance.post('/users', userInfo);
                    console.log(userRes.data)

                    // console.log(res);
                    const profileInfo = {
                         displayName: data?.name,
                         photoURL: profilePic
                    }
                    updateUserProfile(profileInfo)
                         .then(() => {
                              console.log('profile updated')
                              setUser(res.user);
                              console.log(res.user)
                              setRegistering(false)
                              navigate('/')
                         }).catch(error => {
                              console.log(error)
                         })

               }).catch(error => {
                    console.log(error)
               })

     }


     const handleImageClick = () => {
          fileInputRef.current.click(); // Trigger input file click
     };

     const handleFileChange = async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const formData = new FormData();
          formData.append("image", file);

          try {
               const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageAPI_key}`,
                    formData
               );
               setProfilePic(res?.data?.data?.url);
               console.log(res.data)
          } catch (error) {
               console.error("Image upload failed:", error);
          }
     };




     return (
          <div className="bg-white min-h-screen">
               <div className="ml-4 mt-4 md:ml-8 md:mt-8">
                    <Logo />
               </div>

               <div className="flex flex-col lg:flex-row items-center justify-center px-4 md:px-10 py-6 gap-6">

                    <div className="flex-1 flex justify-center">
                         <div className="w-full max-w-[300px]">
                              <h1 className="font-extrabold text-2xl md:text-[34px] text-center md:text-left">Create an account</h1>
                              <p className="font-medium mb-3 text-center md:text-left">Register with profast</p>

                              <form onSubmit={handleSubmit(onSubmit)} className="fieldset">

                                   <div>
                                        <label className="font-semibold block mb-1">Upload Profile Image</label>

                                        {/* Image that triggers file input */}
                                        <img
                                             src={profilePic ? `${profilePic}`: photourl} // fallback image
                                             alt="Profile"
                                             onClick={handleImageClick}
                                             className="w-12 h-12 rounded-full border-2 border-primary cursor-pointer hover:opacity-80 transition"
                                        />

                                        {/* Hidden file input */}
                                        <input
                                             type="file"
                                             accept="image/*"
                                             {...register("photo", { required: true })}
                                             ref={(e) => {
                                                  register("photo").ref(e);
                                                  fileInputRef.current = e; // manually assign ref
                                             }}
                                             onChange={handleFileChange}
                                             className="hidden"
                                        />
                                   </div>
                                   {/* <div>
                                        <label className="font-semibold"> <img src={photourl} alt="" />Upload Profile Image</label><br />
                                        <input type="file" className="input input-bordered w-full" placeholder="Upload Profile Image" />
                                   </div> */}
                                   <div>
                                        <label className="font-semibold">Name</label><br />
                                        <input {...register('name', { required: true })} type="text" className="input input-bordered w-full" placeholder="Name" />
                                   </div>
                                   <div className='hidden'>
                                        <label className="font-semibold">Role</label><br />
                                        <input {...register('role')} type="text" value='user' placeholder="Name" />
                                   </div>
                                   <div>
                                        <label className="font-semibold">Email</label><br />
                                        <input {...register('email', { required: "Email is required" })} type="email" required className="input input-bordered w-full" placeholder="Email" />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                   </div>
                                   <div>
                                        <label className="font-semibold">Password</label><br />
                                        <input {...register("password", {
                                             required: "Password is required",
                                             minLength: {
                                                  value: 6,
                                                  message: "Password must be at least 6 characters or longer",
                                             },
                                             pattern: {
                                                  value: /^(?=.*[A-Z]).+$/,
                                                  message: "Password must contain at least one capital letter",
                                             },
                                        })} type="password" className="input input-bordered w-full" placeholder="Password" />
                                        {errors.password && (
                                             <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                        )}
                                   </div>
                                   <button type="submit" className="btn bg-[#acd81d] w-full text-white">{registering ? 'Registering...' : 'Register'}</button>
                              </form>

                              <p className="mt-4 text-center md:text-left">
                                   <small>
                                        Already have an account?
                                        <Link to="/login" className="text-[#acd81d] underline">Login</Link>
                                   </small>
                              </p>

                              <div className="mt-4">
                                   <SocielGoogle />
                              </div>
                         </div>
                    </div>

                    <div className="flex-1 flex justify-center items-center bg-[#FAFDF0] py-10">
                         <img
                              src={photo}
                              alt="Login Visual"
                              className="w-[250px] md:w-[350px] lg:w-[400px] h-full object-contain"
                         />
                    </div>
               </div>
          </div>
     );
};

export default RegisterForm;
