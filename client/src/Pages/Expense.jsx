import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import LoadingSpinner from "../Components/LoadingSpinner";
import ExpenseRows from "../Components/ExpenseRows";

const Expense = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: expenses = [],
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["expenses", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/all-expenses/${user?.email}`);
      return data;
    },
  });

  if (isFetching || isLoading) return <LoadingSpinner />;
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="my-4 text-center text-2xl font-bold">All Expenses</h1>
      <div className="">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-zinc-300  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold">
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-zinc-300  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold">
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-zinc-300  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold">
                    Notes
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-zinc-300  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold">
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-zinc-300  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Table Row Data */}
                {expenses.map((expense) => (
                  <ExpenseRows
                    key={expense._id}
                    expense={expense}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
