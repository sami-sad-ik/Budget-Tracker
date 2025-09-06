import { IoMdTrendingUp } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";

const IncomeCard = ({ income }) => {
  return (
    <div className="bg-zinc-200 text-2xl rounded-xl flex flex-col justify-center items-center p-4">
      <h2 className="text-green-400 font-bold flex items-center gap-2">
        <IoMdTrendingUp />
        Incomes
      </h2>
      <p className="flex items-center ">
        <TbCurrencyTaka /> {income}
      </p>
    </div>
  );
};

export default IncomeCard;
