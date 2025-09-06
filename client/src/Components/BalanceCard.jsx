import { TbCurrencyTaka } from "react-icons/tb";
import { BiDollar } from "react-icons/bi";

const BalanceCard = ({ balance }) => {
  return (
    <div className="bg-zinc-200 md:text-2xl text-xl rounded-xl flex flex-col justify-center items-center md:p-4 p-3">
      <h2 className="text-green-400  font-bold flex items-center gap-2">
        <BiDollar />
        Balance
      </h2>
      <p
        className={`flex items-center ${
          balance < 1000 && "text-red-500"
        } font-bold`}>
        <TbCurrencyTaka /> {balance}
      </p>
    </div>
  );
};

export default BalanceCard;
