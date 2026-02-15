import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteAlert from "../../component/DeleteAlert";
import AddExpenseForm from "../../component/Expense/AddExpenseForm";
import ExpenseList from "../../component/Expense/ExpenseList";
import ExpenseOverview from "../../component/Expense/ExpenseOverview";
import DashboardLayout from "../../component/layout/DashboardLayout";
import Modal from "../../component/Modal";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const Expense = () => {
    useUserAuth()
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    // Get All Expense Details

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error)
        } finally {
            setLoading(false);
        }
    };
    // Handle Add Expense

    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;
        if (!category.trim()) {
            toast.error("Category is required");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }
        if (!date) {
            toast.error("Date is required");
            return;
        }
        try {

            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon,
            });
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    };
    // handle delete expense details
    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense details deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error deleting expense:", error.response?.data?.message || error.message);
            toast.error("Failed to delete expense details");
        }
    };
    // handle download expense details
    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'expense_details.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Failed to download expense details");
        }

    };
    useEffect(() => {
        fetchExpenseDetails();
        return () => { }
    }, [])

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto ">
                <div className="grid grid-cols-1 gap-6">
                    <ExpenseOverview transactions={expenseData}
                        onExpenseIncome={() => setOpenAddExpenseModal(true)}
                    />
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id });
                        }}
                        onDownload={handleDownloadExpenseDetails}
                    />
                </div>




                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense}
                    />
                </Modal>
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Confirm Delete"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expense detail?"
                        onDelete={() => {
                            deleteExpense(openDeleteAlert.data);
                        }}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Expense;