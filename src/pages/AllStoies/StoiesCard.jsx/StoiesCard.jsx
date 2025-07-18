import useAuthContext from '../../../Hook/useAuthContext';
import { FacebookShareButton } from "react-share";
import { IoArrowRedoOutline } from "react-icons/io5";
import { useState } from 'react';
import useAxios from '../../../Hook/useAxios';

const StoiesCard = ({ story, setActiveStoryImages, setOpenImageModal }) => {
     const { user } = useAuthContext();
     const axiose = useAxios();

     const { likedBy, images, title, description,author, _id } = story;
     const [liked, setLiked] = useState(likedBy?.includes(user?.email));
     const [likeCount, setLikeCount] = useState(likedBy.length);
     // console.log(liked)

const hendleLiked = () => {
     if(user?.email === author?.email) return;
     axiose.patch(`/like/${_id}`,{email: user?.email})
     .then((data) => {
          console.log(data?.data);
          const isLiked = data?.data?.liked;
          setLiked(isLiked);
          setLikeCount(prev => isLiked ? prev + 1 : prev - 2)
     }).catch(error => {
          console.log(error.message)
     })
}
     return (
          <div>
               <div className="bg-base-100 shadow-md rounded-lg overflow-hidden flex flex-col">
                    {/* Image Grid */}
                    <div className={`grid shadow overflow-hidden ${images?.length === 1
                         ? "grid-cols-1 grid-rows-1"
                         : images?.length === 2
                              ? "grid-cols-1 grid-rows-2"
                              : "grid-cols-2 grid-rows-2"
                         } h-[250px] w-full gap-[2px]`}>
                         {images?.slice(0, 4).map((img, index) => {
                              const isLast = index === 3 && images.length > 4;
                              return (
                                   <div key={index} className="relative w-full h-full cursor-pointer" onClick={() => {
                                        setActiveStoryImages(images);
                                        setOpenImageModal(true);
                                   }}>
                                        <img src={img} alt={`story-${index}`} className="w-full h-full object-cover" />
                                        {isLast && (
                                             <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-xs font-semibold">
                                                  +{images.length - 4}
                                             </div>
                                        )}
                                   </div>
                              );
                         })}
                    </div>

                    {/* Title + Description + Share */}
                    <div className="p-4 flex flex-col flex-grow justify-between">
                         <div>
                              <h2 className="text-lg font-semibold">{title}</h2>
                              <p className="line-clamp-2 text-sm text-gray-700">{description}</p>
                         </div>

                         <div className="flex justify-between mt-4 items-center">
                              <button onClick={hendleLiked}>{liked ? "liked" : "like"} {likeCount}</button>
                              <FacebookShareButton
                                   className="flex gap-1 items-center"
                                   url={window.location.href + `#story-${_id}`}
                                   quote={title}
                                   onClick={(e) => {
                                        if (!user) {
                                             e.preventDefault();
                                             window.location.href = "/login";
                                        }
                                   }}
                              >
                                   <IoArrowRedoOutline />share
                              </FacebookShareButton>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default StoiesCard;