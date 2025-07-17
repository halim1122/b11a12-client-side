import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";

const OurPackages = () => {
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["random-packages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/random-packages");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner/>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Our Packages</h2>
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
        {packages.map((pkg) => (
          <div key={pkg._id} className="card bg-white shadow-md rounded-xl overflow-hidden">
            <img src={pkg.images?.[0]} alt="story" className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{pkg.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Type: {pkg.personType || 'per person'}</p>
              <p className="text-xl font-bold text-primary">৳{pkg.price}</p>
              <button
                onClick={() => navigate(`/PackageDetails/${pkg._id}`)}
                className="mt-3 btn btn-sm btn-outline btn-primary"
              >
                View Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPackages;
