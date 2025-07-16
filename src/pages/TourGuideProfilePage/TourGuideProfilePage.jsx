import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";

const TourGuideProfilePage = () => {
  const { email } = useParams();
  const axiosInstance = useAxios();

  const { data: guide = {}, isLoading } = useQuery({
    queryKey: ["tourGuide", email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 mt-10 md:mt-20 py-8">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={guide?.photoURL || "https://i.ibb.co/4f3QW4J/user.png"}
            alt={guide.displayName}
            className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-[#007777]"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#007777]">
            {guide.displayName}
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            <strong>Email:</strong> {guide.email}
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            <strong>Role:</strong>{" "}
            <span className="capitalize text-green-600 font-medium">
              {guide.role || "N/A"}
            </span>
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            <strong>Joined:</strong>{" "}
            {new Date(guide.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            <strong>Last Login:</strong>{" "}
            {new Date(guide.last_login).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfilePage;
