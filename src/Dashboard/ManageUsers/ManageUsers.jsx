import { useState } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";

const ManageUsers = () => {
  const axiosInstance = useAxios();
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState({ value: "all", label: "All Roles" });

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", search, selectedRole],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?search=${search}&role=${selectedRole.value}`);
      return res.data;
    },
  });

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "user", label: "User/Tourist" },
    { value: "tour-guide", label: "Tour Guide" },
    { value: "admin", label: "Admin" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#007777",
      boxShadow: "none",
      '&:hover': { borderColor: "#007777" },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007777" : state.isFocused ? "#e6f2f2" : "white",
      color: state.isSelected ? "white" : "#333",
    }),
  };

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-[#007777] mb-6 text-center">Manage Users</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name/email"
          className="input input-bordered w-full max-w-md focus:border-[#007777]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="w-full max-w-md">
          <Select
            options={roleOptions}
            defaultValue={selectedRole}
            onChange={(selected) => setSelectedRole(selected)}
            styles={customStyles}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-[#007777] text-white">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-[#f0fafa]">
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.photoURL || "https://i.ibb.co/4f3QW4J/user.png"}
                    className="w-10 h-10 rounded-full object-cover"
                    alt="User"
                  />
                </td>
                <td className="font-medium">{user.displayName}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge bg-[#007777] text-white capitalize">
                    {user.role || "user"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <p className="text-center py-4 text-[#007777]">Loading users...</p>}
      </div>
    </div>
  );
};

export default ManageUsers;
