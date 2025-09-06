import { IoMdTrendingUp } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";

const IncomeCard = ({ income }) => {
  return (
    <div className="bg-zinc-200 md:text-2xl text-xl rounded-xl flex flex-col justify-center items-center md:p-4 p-3">
      <h2 className="text-green-400 font-bold flex items-center gap-2">
        <IoMdTrendingUp />
        Incomes
      </h2>
      <p className="flex items-center font-bold">
        <TbCurrencyTaka /> {income}
      </p>
    </div>
  );
};

export default IncomeCard;
