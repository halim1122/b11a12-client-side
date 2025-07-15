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
               await axiosInstance.patch(`/users/role/${user.email}`, { role: "guide" });
               await axiosInstance.delete(`/applications/${id}`);
          },
          onSuccess: () => {
               Swal.fire("Success", "Candidate accepted and promoted to Tour Guide!", "success");
               queryClient.invalidateQueries({ queryKey: ["applications"] });
               queryClient.invalidateQueries({ queryKey: ["users"] });
          },
     });

     const rejectMutation = useMutation({
          mutationFn: async (id) => await axiosInstance.delete(`/applications/${id}`),
          onSuccess: () => {
               Swal.fire("Rejected", "Candidate application deleted", "info");
               queryClient.invalidateQueries({ queryKey: ["applications"] });
          },
     });

     return (
          <div className="p-4 md:p-8 bg-white rounded-lg shadow max-w-7xl mx-auto">
               <h2 className="text-2xl font-bold text-[#007777] mb-6 text-center">Manage Tour Guide Candidates</h2>
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
                              {candidates.map((c, index) => (
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
                                        <td>{c.userEmail}</td>
                                        <td className="max-w-xs text-sm">{c.reason}</td>
                                        <td>
                                             <a
                                                  href={c.cvLink}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  className="text-blue-600 underline"
                                             >
                                                  View CV
                                             </a>
                                        </td>
                                        <td className="flex gap-2">
                                             <button
                                                  className="btn btn-success btn-sm"
                                                  onClick={() => acceptMutation.mutate({ user: c, id: c._id })}
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
                              ))}
                         </tbody>
                    </table>

                    {isLoading && <LoadingSpinner />}
               </div>

          </div>
     );
};

export default ManageCandidates;
