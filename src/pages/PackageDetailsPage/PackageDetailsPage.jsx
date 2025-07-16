import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";
import { useState } from "react";
import { MdArrowRight } from "react-icons/md";
import TourGuidesSection from "../TourGuidesSection/TourGuidesSection";

const PackageDetailsPage = () => {

     const { id } = useParams();
     const axiosInstance = useAxios();
     const [activeStoryImages, setActiveStoryImages] = useState([]);
     const [openModal, setOpenModal] = useState(false);

     const { data: pkg = {}, isLoading } = useQuery({
          queryKey: ["package", id],
          queryFn: async () => {
               const res = await axiosInstance.get(`/packages/${id}`);
               return res.data;
          },
     });

     if (isLoading) return <LoadingSpinner />;

     const { name, description, tourTime, images, rating, price, personType, tourPlans } = pkg;

     return (
          <div className="max-w-6xl mx-auto px-4 md:mt-20 mt-10 py-6 space-y-8">
               {/* Title */}
               <h2 className="text-3xl font-bold text-center">{name}</h2>

               {/* Gallery Section */}
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {images?.slice(0, 5).map((img, idx) => (
                         <img
                              key={idx}
                              src={img}
                              onClick={() => {
                                   setActiveStoryImages(img);
                                   setOpenModal(true);
                              }}
                              alt={`gallery-${idx}`}
                              className="rounded-lg object-cover h-48 w-full shadow"
                         />
                    ))}
               </div>
               {openModal && (
                    <dialog id="image_modal" className="modal modal-open">
                         <div className="modal-box max-w-4xl w-full">
                              <h3 className="font-bold text-lg mb-4">Story Images</h3>
                              <div className="overflow-y-auto">
                                   {
                                        <img
                                             src={activeStoryImages}
                                             className="rounded w-full object-cover"
                                        />
                                   }
                              </div>
                              <div className="modal-action">
                                   <form method="dialog">
                                        <button className="btn" onClick={() => setOpenModal(false)}>
                                             Close
                                        </button>
                                   </form>
                              </div>
                         </div>
                    </dialog>
               )}

               {/* About Tour */}
               <div className="bg-base-200 p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">About This Tour</h3>
                    <p className="text-gray-700">{description}</p>
                    <div className="mt-4 flex flex-wrap gap-6 text-sm">
                         <p><strong>Rating:</strong> {rating}⭐</p>
                         <p><strong>Price:</strong> ${price}</p>
                         <p><strong>Person Type:</strong> {personType}</p>
                         <p><strong>Tour Time:</strong> {tourTime} Days</p>
                    </div>
               </div>

               {/* Tour Plans */}
               <div>
                    <h3 className="text-xl font-semibold mb-4">Tour Plan</h3>
                    <div className="space-y-4">
                         {tourPlans?.map((faq, index) => (
                              <div
                                   key={index}
                                   className="collapse collapse-arrow bg-base-200 rounded-lg border border-transparent transition-all duration-300"
                              >
                                   <input type="checkbox" className="peer" />
                                   <div className="collapse-title text-xl font-medium text-accent-content
              peer-checked:bg-accent-content/10 peer-checked:text-accent-content
               peer-checked:border-accent-content/50 peer-checked:border-t-2 peer-checked:border-r-2 peer-checked:border-l-2
              peer-checked:rounded-t-lg flex flex-row items-center">
                                        <div className="bg-emerald-400 p-1 rounded-md relative flex z-20 pr-2 flex-row mr-4"><MdArrowRight className="text-emerald-400 absolute h-14 w-14 bg-transparent -top-[10px] left-9" />Day {index + 1} </div> {faq.title}
                                   </div>
                                   <div className="collapse-content peer-checked:bg-accent-content/10  peer-checked:border-accent-content/50 peer-checked:border-b-2 peer-checked:border-r-2 peer-checked:border-l-2 peer-checked:text-gray-800 peer-checked:rounded-b-lg">
                                        <hr className='text-gray-400' />
                                        <p className="p-2">{faq.details}</p>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
               <section>
                    <TourGuidesSection></TourGuidesSection>
               </section>
          </div>
     );
};

export default PackageDetailsPage;
