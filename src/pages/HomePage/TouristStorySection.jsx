import { FacebookShareButton } from "react-share";
import { FaFacebook, FaShareAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuthContext from "../../Hook/useAuthContext";
import { Link } from "react-router";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxios from "../../Hook/useAxios";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  }),
};

const TouristStorySection = () => {
  const axiose = useAxios();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["randomStories"],
    queryFn: async () => {
      const res = await axiose.get("/stories/random");
      return res.data;
    },
  });

  const handleShareClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div
      className="max-w-7xl mx-auto text-center px-4 py-10 bg-gray-100 rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-3xl sm:text-3xl font-bold text-[#007777]">Tourist Stories</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((story, index) => (
          <motion.div
            key={story._id}
            className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-all duration-300"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ scale: 1.03 }}
          >
            <img src={story.images?.[0]} alt="story" className="h-48 w-full object-cover" />
            <div className="p-4 text-start space-y-2">
              <h3 className="text-lg font-semibold">{story.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{story.description}</p>

              <div className="flex justify-between items-center mt-3">
                <div className="text-xs text-gray-500">By {story.author?.name || "Anonymous"}</div>

                {user ? (
                  <FacebookShareButton
                    url={`https://your-app-domain.com/story/${story._id}`}
                    quote={story.title}
                  >
                    <Link className="text-[#007777] flex items-center gap-1 hover:text-[#005555] text-sm">
                      <FaFacebook /> Share
                    </Link>
                  </FacebookShareButton>
                ) : (
                  <Link
                    onClick={(e) => handleShareClick(e)}
                    className="text-[#007777] flex items-center gap-1 hover:text-[#005555] text-sm"
                  >
                    <FaShareAlt /> Share
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Link to="community" className="btn btn-outline btn-sm sm:btn-md text-[#007777] border-[#007777] hover:bg-[#007777] hover:text-white">
          All Stories
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default TouristStorySection;
