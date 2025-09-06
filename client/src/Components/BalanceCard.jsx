import { TbCurrencyTaka } from "react-icons/tb";
import { BiDollar } from "react-icons/bi";

const BalanceCard = ({ balance }) => {
  return (
    <div className="bg-zinc-200 text-2xl rounded-xl flex flex-col justify-center items-center p-4">
      <h2 className="text-green-400  font-bold flex items-center gap-2">
        <BiDollar />
        Balance
      </h2>
      <p className="flex items-center ">
        <TbCurrencyTaka /> {balance}
      </p>
    </div>
  );
};

export default BalanceCard;
