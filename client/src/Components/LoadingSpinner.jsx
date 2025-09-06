import loadingGif from "../assets/loading.gif";

const LoadingSpinner = () => {
  return (
    <div className="flex h-[calc(100vh-140px)] justify-center items-center">
      <img className="w-24" src={loadingGif} alt="" />
    </div>
  );
};

export default LoadingSpinner;
