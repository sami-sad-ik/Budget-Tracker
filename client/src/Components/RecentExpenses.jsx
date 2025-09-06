import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const RecentExpenses = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/expenses/${user?.email}`);
      return data;
    },
  });

  return (
    <div>
      <h1 className="my-4 text-center text-lg font-bold">Recent Expenses</h1>
      <div>
        <div className="font-bold grid grid-cols-3 text-center bg-zinc-300 p-2 rounded-t-md">
          <h2>Amount</h2>
          <h2>Category</h2>
          <h2>Date</h2>
        </div>
        <div>
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="font-medium grid grid-cols-3 text-center bg-zinc-100 p-2 ">
              <h2>{expense.amount}</h2>
              <h2>{expense.expenseCategory}</h2>
              <h2>{new Date(expense.time).toLocaleDateString("en-GB")}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentExpenses;
