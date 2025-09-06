import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import LoadingSpinner from "../Components/LoadingSpinner";
import IncomeRows from "../Components/IncomeRows";

const Income = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: incomes = [],
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["incomes", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-incomes/${user?.email}`);
      return data;
    },
  });

  if (isFetching || isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">All Incomes</h1>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[650px]">
          <div className="font-bold grid grid-cols-5 text-center bg-zinc-300 p-2 rounded-t-md">
            <h2>Amount</h2>
            <h2>Category</h2>
            <h2>Notes</h2>
            <h2>Date</h2>
            <h2>Delete</h2>
          </div>
          <div>
            {incomes.map((income) => (
              <IncomeRows key={income._id} income={income} refetch={refetch} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
