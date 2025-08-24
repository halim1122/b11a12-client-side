// src/pages/AllStories/AllStories.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import {motion, AnimatePresence } from "framer-motion";
import useAxios from "../../Hook/useAxios";
import StoiesCard from "./StoiesCard.jsx/StoiesCard";

const AllStories = () => {
  const [openImageModal, setOpenImageModal] = useState(false);
  const [activeStoryImages, setActiveStoryImages] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const axiosInstance = useAxios();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["stories", page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/stories?page=${page}&limit=${limit}`);
      return res.data; // { stories: [...], total: 50 }
    },
    keepPreviousData: true,
  });

  const stories = data?.stories || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto mt-10 md:mt-20 p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          All Stories
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-60 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 md:mt-20 p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        All Stories
      </h2>

      {/* Stories Grid */}
      <AnimatePresence>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {stories.map((story, index) => (
            <motion.div
              key={story._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.05 } },
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              className="rounded-lg bg-white overflow-hidden cursor-pointer"
            >
              <StoiesCard
                story={story}
                setActiveStoryImages={setActiveStoryImages}
                setOpenImageModal={setOpenImageModal}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="mt-8 flex gap-2 justify-center flex-wrap">
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              className={`px-4 py-2 border rounded ${
                page === pageNum
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openImageModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg max-w-4xl w-full p-6 relative max-h-[80vh] overflow-y-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <h3 className="text-xl font-bold mb-4">Story Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {activeStoryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`story-img-${idx}`}
                    className="w-full h-40 object-cover rounded"
                  />
                ))}
              </div>
              <button
                className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => setOpenImageModal(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllStories;
