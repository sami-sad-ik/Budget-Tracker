import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import "../index.css";
import useAuth from "../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const AddIncomeForm = ({ closeModal, isOpen, refetch }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/income", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Income added successfully");
      refetch();
      //   queryClient.invalidateQueries(["balance"]);
    },
  });
  const handleAddIncome = async (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = parseInt(form.amount.value);
    const source = form.source.value;
    const notes = form.notes.value;
    const incomeForm = {
      user: user.email,
      amount,
      source,
      notes,
      time: Date.now(),
    };
    if (amount <= 0) {
      return toast.error("Please input a valid amount!!");
    }
    try {
      await mutateAsync(incomeForm);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900">
                  Add Income
                </DialogTitle>
                {/* checkout form */}
                <form onSubmit={handleAddIncome}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm">
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="name"
                      placeholder="Enter the income amount"
                      onWheel={(e) => e.target.blur()} // disables mouse scroll
                      onKeyDown={(e) => {
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                          e.preventDefault(); // disables arrow key increment
                        }
                      }}
                      className="no-spinner w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-300 bg-gray-200 text-gray-900"
                      data-temp-mail-org="0"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-2 text-sm">Source</label>
                    <select
                      required
                      name="source"
                      defaultValue=""
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-300 bg-gray-200 text-gray-900">
                      <option value="" disabled hidden>
                        --Select Source--
                      </option>
                      <option value="salary">Salary</option>
                      <option value="freelance">Freelance</option>
                      <option value="business">Business</option>
                      <option value="pocket_money">Pocket money</option>
                      <option value="gift">Gift</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block mb-2 text-sm">
                      Notes (optional)
                    </label>
                    <textarea
                      name="notes"
                      placeholder="Enter notes..."
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-300 bg-gray-200 text-gray-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-400 text-white font-semibold rounded-md hover:bg-green-500 transition duration-200">
                    Add income
                  </button>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

AddIncomeForm.propTypes = {
  bookingInfo: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  refetch: PropTypes.func,
};

export default AddIncomeForm;
