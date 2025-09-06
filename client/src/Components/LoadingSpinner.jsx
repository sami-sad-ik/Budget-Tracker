import loading from "../assets/spinner.svg";

const LoadingSpinner = () => {
  return (
    <div className="flex h-[calc(100vh-140px)] justify-center items-center">
      <img className="w-24" src={loading} alt="" />
    </div>
  );
};

export default LoadingSpinner;
