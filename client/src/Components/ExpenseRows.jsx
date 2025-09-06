import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import DeleteModal from "./Modal/DeleteModal";
import { MdDeleteForever } from "react-icons/md";

const ExpenseRows = ({ expense, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  //delete expense data
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosPublic.delete(`/expense/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Expense data deleted successfully");
      refetch();
    },
  });

  const handleDelete = async () => {
    try {
      await mutateAsync(expense?._id);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <tr>
      <td className="px-5 py-2 border-b border-gray-200 text-center bg-zinc-100 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{expense?.amount}</p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 text-center bg-zinc-100 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {expense?.expenseCategory}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 text-center bg-zinc-100 text-sm">
        <p className="text-gray-900 whitespace-no-wrap" title={expense.notes}>
          {expense.notes
            ? expense.notes.length > 15
              ? expense.notes.slice(0, 14) + "..."
              : expense.notes
            : "--N/A--"}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 text-center bg-zinc-100 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(expense?.time).toLocaleDateString("en-GB")}
        </p>
      </td>

      <td className="px-5 py-2 border-b border-gray-200 text-center bg-zinc-100 text-sm">
        <button onClick={() => setIsOpen(true)} className="cursor-pointer">
          <MdDeleteForever size={24} color="red" />
        </button>
        {/* Delete modal */}
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

ExpenseRows.propTypes = {
  expense: PropTypes.object,
  refetch: PropTypes.func,
};

export default ExpenseRows;
