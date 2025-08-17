import { CirclesWithBar } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default LoadingSpinner;