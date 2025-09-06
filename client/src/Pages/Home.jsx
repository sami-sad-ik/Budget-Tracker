import { useQuery } from "@tanstack/react-query";
import AddExpense from "../Components/AddExpense";
import AddIncome from "../Components/AddIncome";
import BalanceCard from "../Components/BalanceCard";
import ExpenseCard from "../Components/ExpenseCard";
import IncomeCard from "../Components/IncomeCard";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import LoadingSpinner from "../Components/LoadingSpinner";

const Home = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: moneyInfo,
    isLoading,
    isFetching,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["balance", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/balance/${user?.email}`);
      return data;
    },
  });
  console.log(moneyInfo);
  if (isLoading || isFetching || isPending) return <LoadingSpinner />;

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="col-span-2 lg:col-span-1">
          <BalanceCard balance={moneyInfo?.balance} />
        </div>
        <IncomeCard income={moneyInfo?.totalIncome} />
        <ExpenseCard expense={moneyInfo?.totalExpense} />
      </div>
      <div className="w-10/12 my-6 mx-auto flex justify-center items-center gap-3">
        <AddIncome refetch={refetch} />
        <AddExpense refetch={refetch} />
      </div>
    </div>
  );
};

export default Home;
