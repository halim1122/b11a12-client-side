import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import useAuthContext from '../../Hook/useAuthContext';
import LoadingSpinner from '../../Sheared/Loading/LoadingSpinner';

const CommunityPage = () => {
     const { user } = useAuthContext();
     const navigate = useNavigate();

     const { data: stories = [], isLoading, isError } = useQuery({
          queryKey: ['allStories'],
          queryFn: async () => {
               const res = await fetch('/api/stories'); // fetch all stories endpoint
               return res.json();
          },
     });

     const handleShareClick = () => {
          if (!user) navigate('/login');
     };

     if (isLoading) return <LoadingSpinner/>;
     if (isError) return <p className="text-center py-8 text-red-500">Failed to load stories.</p>;

     return (
          <div className="max-w-7xl mx-auto p-6">
               <h1 className="text-4xl font-bold mb-8 text-center">Community Stories</h1>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story, idx) => (
                         <div key={idx} className="bg-white rounded-xl shadow p-5 flex flex-col">
                              <img
                                   src={story.image}
                                   alt={story.title}
                                   className="rounded-lg object-cover h-48 w-full mb-4"
                              />
                              <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
                              <p className="text-gray-700 flex-grow line-clamp-3">{story.description}</p>
                              <p className="text-sm text-gray-500 mt-3">By: {story.userName}</p>

                              <div className="mt-4 flex justify-end">
                                   {user ? (
                                        <FacebookShareButton url={story.url}>
                                             <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                   ) : (
                                        <button
                                             onClick={handleShareClick}
                                             className="text-blue-600 hover:underline font-semibold"
                                        >
                                             Login to Share
                                        </button>
                                   )}
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default CommunityPage;
