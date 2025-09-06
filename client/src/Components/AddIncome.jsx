import { useState } from "react";
import AddIncomeForm from "./AddIncomeForm";

const AddIncome = ({ refetch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="text-lg font-semibold text-white px-4 py-2 bg-gradient-to-r from-blue-950 to-blue-900 rounded">
        Add income
      </button>
      <AddIncomeForm closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
};

export default AddIncome;
