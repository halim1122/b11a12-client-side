import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopRatedPackagesChart = () => {
  const axiosInstance = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["topRatedPackages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/top-rated-packages");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const chartData = {
    labels: data.map(pkg => pkg.name),
    datasets: [
      {
        label: "Rating",
        data: data.map(pkg => pkg.rating),
        backgroundColor: "#007777",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Top Rated Packages" },
    },
    scales: {
      y: { min: 0, max: 5 },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TopRatedPackagesChart;
