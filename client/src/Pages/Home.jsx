import { useQuery } from "@tanstack/react-query";
import AddExpense from "../Components/AddExpense";
import AddIncome from "../Components/AddIncome";
import BalanceCard from "../Components/BalanceCard";
import ExpenseCard from "../Components/ExpenseCard";
import IncomeCard from "../Components/IncomeCard";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import LoadingSpinner from "../Components/LoadingSpinner";
import RecentExpenses from "../Components/RecentExpenses";
import { Link } from "react-router-dom";

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
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/balance/${user?.email}`);
      return data;
    },
  });

  if (isLoading || isFetching || isPending) return <LoadingSpinner />;

  if (!user)
    return (
      <div className="h-[50vh] flex flex-col gap-3 justify-center items-center">
        <h2 className="text-3xl font-bold">Login to track your finance</h2>
        <Link
          to={"/login"}
          className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-200 px-6 py-1 rounded-full text-xl text-white font-semibold">
          Login
        </Link>
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="col-span-2 lg:col-span-1">
          <BalanceCard balance={moneyInfo?.balance} />
        </div>
        <IncomeCard income={moneyInfo?.totalIncome} />
        <ExpenseCard expense={moneyInfo?.totalExpense} />
      </div>
      <div className="w-full my-6 mx-auto flex justify-center items-center gap-3">
        <AddIncome refetch={refetch} />
        <AddExpense refetch={refetch} />
      </div>
      <RecentExpenses />
    </div>
  );
};

export default Home;
