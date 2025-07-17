import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";

const TourGuidesSection = () => {
     const axiosInstance = useAxiosSecure();
     const navigate = useNavigate();

     const { data: guides = [], isLoading } = useQuery({
          queryKey: ["tour-guides"],
          queryFn: async () => {
               const res = await axiosInstance.get("/users?role=tour-guide");
               return res.data;
          },
     });

     if (isLoading) return <LoadingSpinner />;

     return (
          <div className="mt-10">
               <h2 className="text-xl font-semibold text-center mb-4 border-b pb-2">Choose Your Tour Guides</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {guides.map((guide) => (
                         <div
                              key={guide._id}
                              onClick={() => navigate(`/tourGuideProfile/${guide.email}`)}
                              className="cursor-pointer border rounded-lg p-4 hover:shadow-md transition duration-200"
                         >
                              <img
                                   src={guide.photoURL || "https://i.ibb.co/4f3QW4J/user.png"}
                                   alt="Tour Guide"
                                   className="w-20 h-20 object-cover rounded-full mx-auto"
                              />
                              <div className="text-center mt-3">
                                   <p className="font-semibold">{guide.displayName}</p>
                                   <p className="text-sm text-gray-500">{guide.email}</p>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default TourGuidesSection;
