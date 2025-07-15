import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";

const ManageCandidates = () => {
     const axiosInstance = useAxios();
     const queryClient = useQueryClient();

     const { data: candidates = [], isLoading } = useQuery({
          queryKey: ["applications"],
          queryFn: async () => {
               const res = await axiosInstance.get("/applications");
               return res.data;
          },
     });

     const acceptMutation = useMutation({
          mutationFn: async ({ user, id }) => {
               try {
                    await axiosInstance.patch(`/users/role/${user}`);
                    await axiosInstance.delete(`/applications/${id}`);
               } catch (error) {
                    console.error("Mutation failed:", error);
                    throw error;
               }
          },
          onSuccess: () => {
               Swal.fire("Success", "Candidate accepted and promoted to Tour Guide!", "success");
               queryClient.invalidateQueries({ queryKey: ["applications"] });
               queryClient.invalidateQueries({ queryKey: ["users"] });
          },
          onError: (error) => {
               Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
          }
     });

     const rejectMutation = useMutation({
          mutationFn: async (id) => await axiosInstance.delete(`/applications/${id}`),
          onSuccess: () => {
               Swal.fire("Rejected", "Candidate application deleted", "info");
               queryClient.invalidateQueries({ queryKey: ["applications"] });
          },
     });

     const handleReadMore = (text) => {
          Swal.fire({
               title: "Why Wants to be a Tour Guide",
               html: `<div style="text-align: left;">${text}</div>`,
               confirmButtonColor: "#007777"
          });
     };

     return (
          <div className="overflow-x-auto">
               <table className="table w-full">
                    <thead className="bg-[#007777] text-white">
                         <tr>
                              <th>#</th>
                              <th>Photo</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Why Guide?</th>
                              <th>CV Link</th>
                              <th>Actions</th>
                         </tr>
                    </thead>
                    <tbody>
                         {candidates.map((c, index) => {
                              const slicedText = c.reason.length > 100 ? c.reason.slice(0, 40) + "..." : c.reason;
                              const isLong = c.reason.length > 100;

                              return (
                                   <tr key={c._id} className="hover:bg-[#f0fafa]">
                                        <td>{index + 1}</td>
                                        <td>
                                             <img
                                                  src={
                                                       c.photo?.startsWith("http")
                                                            ? c.photo
                                                            : "https://i.ibb.co/4f3QW4J/user.png"
                                                  }
                                                  className="w-10 h-10 rounded-full object-cover"
                                                  alt="candidate"
                                             />
                                        </td>
                                        <td>{c.userName}</td>
                                        <td className="">{c.userEmail}</td>
                                        <td className="text-sm">
                                             {slicedText}
                                             {isLong && (
                                                  <span
                                                       onClick={() => handleReadMore(c.reason)}
                                                       className="text-blue-600 cursor-pointer ml-1 underline"
                                                  >
                                                       Read More
                                                  </span>
                                             )}
                                        </td>

                                        <td>
                                             <a
                                                  href={c.cvLink}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  className="text-blue-600 underline"
                                             >
                                                  ViewCV
                                             </a>
                                        </td>
                                        <td className="flex gap-2">
                                             <button
                                                  className="btn btn-success btn-sm"
                                                  onClick={() => acceptMutation.mutate({ user: c.userEmail, id: c._id })}
                                             >
                                                  Accept
                                             </button>
                                             <button
                                                  className="btn btn-error btn-sm"
                                                  onClick={() => rejectMutation.mutate(c._id)}
                                             >
                                                  Reject
                                             </button>
                                        </td>
                                   </tr>
                              );
                         })}
                    </tbody>
               </table>

               {isLoading && <LoadingSpinner />}
          </div>
     );
};


export default ManageCandidates;
