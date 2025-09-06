import { LuTrendingDown } from "react-icons/lu";
import { TbCurrencyTaka } from "react-icons/tb";

const ExpenseCard = ({ expense }) => {
  return (
    <div className="bg-zinc-200 text-2xl rounded-xl flex flex-col justify-center items-center p-4">
      <h2 className="text-red-400 font-bold flex items-center gap-2">
        <LuTrendingDown />
        Expenses
      </h2>
      <p className="flex items-center ">
        <TbCurrencyTaka /> {expense}
      </p>
    </div>
  );
};

export default ExpenseCard;
