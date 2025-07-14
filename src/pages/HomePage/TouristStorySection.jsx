import { useQuery } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../../Sheared/Loading/LoadingSpinner';
import useAuthContext from '../../Hook/useAuthContext';

const TouristStorySection = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { data: stories = [], isLoading, isError } = useQuery({
    queryKey: ['randomStories'],
    queryFn: async () => {
      const res = await fetch('/api/stories'); // Adjust API path
      const data = await res.json();
      // Shuffle and return 4 random stories
      return data.sort(() => 0.5 - Math.random()).slice(0, 4);
    },
  });

  const handleShare = () => {
    if (!user) {
      navigate('/login');
    }
  };

  const handleAllStories = () => {
    navigate('/all-stories');
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-center text-red-500">Failed to load stories</p>;

  return (
    <div className="py-10 px-4 md:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Tourist Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {stories.map((story, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-5 flex flex-col md:flex-row gap-4">
            <img src={story.image} alt={story.title} className="w-full md:w-48 h-32 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{story.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">By: {story.userName}</span>
                <div onClick={handleShare}>
                  {user ? (
                    <FacebookShareButton url={story.url}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  ) : (
                    <button className="text-blue-600 hover:text-blue-800 font-semibold">
                      Login to Share
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleAllStories}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          All Stories
        </button>
      </div>
    </div>
  );
};

export default TouristStorySection;
