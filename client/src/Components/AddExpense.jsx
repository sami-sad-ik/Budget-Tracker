import { useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import PropTypes from "prop-types";

const AddExpense = ({ refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="text-lg font-semibold text-white px-4 py-1 cursor-pointer bg-gradient-to-r from-blue-950 to-blue-900 rounded">
        Add Expense
      </button>
      <AddExpenseForm
        closeModal={closeModal}
        isOpen={isOpen}
        refetch={refetch}
      />
    </div>
  );
};

AddExpense.propTypes = {
  refetch: PropTypes.func,
};

export default AddExpense;
