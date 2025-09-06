import { LuTrendingDown } from "react-icons/lu";
import { TbCurrencyTaka } from "react-icons/tb";

const ExpenseCard = ({ expense }) => {
  return (
    <div className="bg-zinc-200 md:text-2xl text-xl rounded-xl flex flex-col justify-center items-center md:p-4 p-3">
      <h2 className="text-red-400 font-bold flex items-center gap-2">
        <LuTrendingDown />
        Expenses
      </h2>
      <p className="flex items-center font-bold">
        <TbCurrencyTaka /> {expense}
      </p>
    </div>
  );
};

export default ExpenseCard;
