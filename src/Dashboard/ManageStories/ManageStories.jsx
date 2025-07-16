import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";
import useAxios from "../../Hook/useAxios";

const ManageStories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activeStoryImages, setActiveStoryImages] = useState([]);
  const axiosInstance = useAxios();

  const { data: stories = [], isPending, refetch } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/stories");
      return res.data;
    },
  });

  if (isPending) return <LoadingSpinner />;

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`http://localhost:5000/stories/${id}`);
      Swal.fire("Deleted!", "Your story has been deleted.", "success");
      refetch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Manage Your Stories</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-base-100 shadow-md rounded-lg overflow-hidden flex flex-col">
            <div
              className={`grid overflow-hidden ${
                story?.images?.length === 1
                  ? "grid-cols-1 grid-rows-1"
                  : story?.images?.length === 2
                  ? "grid-cols-1 grid-rows-2"
                  : "grid-cols-2 grid-rows-2"
              } h-[250px] w-full gap-[2px]`}
            >
              {story.images?.slice(0, 4).map((img, index) => {
                const isLast = index === 3 && story.images.length > 4;
                return (
                  <div
                    key={index}
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => {
                      setActiveStoryImages(story.images);
                      setOpenModal(true);
                    }}
                  >
                    <img
                      src={img}
                      alt={`story-${index}`}
                      className="w-full h-full object-cover"
                    />
                    {isLast && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-xs font-semibold">
                        +{story.images.length - 4}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h2 className="text-lg font-semibold">{story.title}</h2>
                <p className="line-clamp-3 text-sm text-gray-700 overflow-clip">{story.description}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Link to={`/editStory/${story._id}`} className="btn btn-warning btn-sm">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing all images */}
      {openModal && (
        <dialog id="image_modal" className="modal modal-open">
          <div className="modal-box max-w-4xl w-full">
            <h3 className="font-bold text-lg mb-4">Story Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto">
              {activeStoryImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`modal-img-${idx}`}
                  className="rounded w-full object-cover"
                />
              ))}
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
    </div>
  );
};

export default ManageStories;
