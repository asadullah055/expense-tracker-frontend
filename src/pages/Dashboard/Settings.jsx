import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddExpenseSourceForm from "../../component/Expense/AddExpenseSourceForm";
import AddIncomeSourceForm from "../../component/Income/AddIncomeSourceForm";
import Modal from "../../component/Modal";
import ExpenseSettings from "../../component/Settings/ExpenseSettings";
import IncomeSettings from "../../component/Settings/IncomeSettings";
import DashboardLayout from "../../component/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const Settings = () => {
    useUserAuth();

    const [activeTab, setActiveTab] = useState("income");
    const [openAddIncomeSourceModal, setOpenAddIncomeSourceModal] = useState(false);
    const [openAddExpenseSourceModal, setOpenAddExpenseSourceModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [incomeSources, setIncomeSources] = useState([]);
    const [expenseSources, setExpenseSources] = useState([
    ]);


    const fetchExpenseCategoryDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSECATEGORY.GET_ALL_EXPENSE_CATEGORY);
            if (response.data) {
                setExpenseSources(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error)
        } finally {
            setLoading(false);
        }
    };
    const fetchIncomeCategoryDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.INCOMECATEGORY.GET_ALL_INCOME_CATEGORY);
            if (response.data) {
                setIncomeSources(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error)
        } finally {
            setLoading(false);
        }
    };


    const handleAddIncomeSource = async (income) => {
        const { category, type } = income;
        if (!category.trim()) {
            toast.error("Category is required");
            return;
        }
        if (!type) {
            toast.error("Type is required");
            return;
        }

        try {

            await axiosInstance.post(API_PATHS.INCOMECATEGORY.ADD_EXPENSE_CATEGORY, {
                category,
                type,
            });
            setOpenAddExpenseSourceModal(false);
            toast.success("Expense added successfully");
            fetchIncomeCategoryDetails();
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
        setOpenAddIncomeSourceModal(false);
    };
    const handleAddExpenseSource = async (expense) => {
        const { category, type } = expense;
        if (!category.trim()) {
            toast.error("Category is required");
            return;
        }
        if (!type) {
            toast.error("Type is required");
            return;
        }

        try {

            await axiosInstance.post(API_PATHS.EXPENSECATEGORY.ADD_EXPENSE_CATEGORY, {
                category,
                type,
            });
            setOpenAddExpenseSourceModal(false);
            toast.success("Expense added successfully");
            fetchExpenseCategoryDetails();
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error(error.response?.data?.message || "Failed to add expense");
        }

    };
    useEffect(() => {
        fetchExpenseCategoryDetails();
        return () => { }
    }, [])
    useEffect(() => {
        fetchIncomeCategoryDetails();
        return () => { }
    }, [])
    return (
        <DashboardLayout  activeMenu={"Settings"}>
            <div className="my-5 mx-auto card">
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => setActiveTab("income")}
                        className={`px-8 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${activeTab === "income"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                    >
                        Income
                    </button>

                    <button
                        onClick={() => setActiveTab("expense")}
                        className={`px-8 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${activeTab === "expense"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                    >
                        Expense
                    </button>
                </div>

                {activeTab === "income" ? (

                    <IncomeSettings
                        onOpenModal={() => setOpenAddIncomeSourceModal(true)}
                        sources={incomeSources}

                    />
                ) : (
                    <ExpenseSettings
                        onOpenModal={() => setOpenAddExpenseSourceModal(true)}
                        sources={expenseSources}
                    />
                )}

                <Modal
                    isOpen={openAddIncomeSourceModal}
                    onClose={() => setOpenAddIncomeSourceModal(false)}
                    title="Add Income Source"
                >
                    <AddIncomeSourceForm onAddIncome={handleAddIncomeSource} />
                </Modal>
                <Modal
                    isOpen={openAddExpenseSourceModal}
                    onClose={() => setOpenAddExpenseSourceModal(false)}
                    title="Add Expense Source"
                >
                    <AddExpenseSourceForm onAddExpenseSource={handleAddExpenseSource} />
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
