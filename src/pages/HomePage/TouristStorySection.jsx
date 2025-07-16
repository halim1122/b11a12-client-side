import { FacebookShareButton } from "react-share";
import { FaFacebook, FaShareAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { useNavigate } from "react-router";
import useAuthContext from "../../Hook/useAuthContext";
import { Link } from "react-router";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";

const TouristStorySection = () => {
  const axiosInstance = useAxios();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["randomStories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/stories/random");
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
    <div className="max-w-7xl mx-auto text-center px-4 py-10">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#007777]">Tourist Stories</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-all duration-300">
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
                    <button className="text-[#007777] flex items-center gap-1 hover:text-[#005555] text-sm">
                      <FaFacebook /> Share
                    </button>
                  </FacebookShareButton>
                ) : (
                  <button
                    onClick={(e) => handleShareClick(e)}
                    className="text-[#007777] flex items-center gap-1 hover:text-[#005555] text-sm"
                  >
                    <FaShareAlt /> Share
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="community" className="btn mt-8 btn-outline btn-sm sm:btn-md text-[#007777] border-[#007777] hover:bg-[#007777] hover:text-white">
        All Stories
      </Link>
    </div>
  );
};

export default TouristStorySection;
