import { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DeleteModal from "./Modal/DeleteModal";
import { MdDeleteForever } from "react-icons/md";

const IncomeRows = ({ income, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  //delete income data
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosPublic.delete(`/income/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Income data deleted successfully");
      refetch();
    },
  });

  const handleDelete = async () => {
    try {
      await mutateAsync(income?._id);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      key={income._id}
      className=" grid grid-cols-5 text-center bg-zinc-100 p-2 border-b border-zinc-200">
      <h2>{income.amount}</h2>
      <h2>{income.source}</h2>
      <p title={income.notes}>
        {income.notes
          ? income.notes.length > 15
            ? income.notes.slice(0, 14) + "..."
            : income.notes
          : "--N/A--"}
      </p>
      <h2>{new Date(income.time).toLocaleDateString("en-GB")}</h2>
      <div>
        <button onClick={() => setIsOpen(true)} className="cursor-pointer">
          <MdDeleteForever size={24} color="red" />
        </button>
        {/* Delete modal */}
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default IncomeRows;
