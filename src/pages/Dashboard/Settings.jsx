import { useMemo, useState } from "react";
import AddExpenseSourceForm from "../../component/Expense/AddExpenseSourceForm";
import AddIncomeSourceForm from "../../component/Income/AddIncomeSourceForm";
import Modal from "../../component/Modal";
import ExpenseSettings from "../../component/Settings/ExpenseSettings";
import IncomeSettings from "../../component/Settings/IncomeSettings";
import DashboardLayout from "../../component/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";

const Settings = () => {
    useUserAuth();

    const [activeTab, setActiveTab] = useState("income");
    const [openAddIncomeSourceModal, setOpenAddIncomeSourceModal] = useState(false);
    const [openAddExpenseSourceModal, setOpenAddExpenseSourceModal] = useState(false);
    const [sourceType, setSourceType] = useState("personal");
    const [incomeSources, setIncomeSources] = useState([
        { id: 1, type: "personal", name: "Freelancing" },
        { id: 2, type: "company", name: "Company Salary" },
    ]);
    const [expenseSources, setExpenseSources] = useState([
        { id: 1, type: "personal", name: "Groceries" },
        { id: 2, type: "company", name: "Office Supplies" },
    ]);

    const filteredIncomeSources = useMemo(() => {
        if (!sourceType) return incomeSources;
        return incomeSources.filter((source) => source.type === sourceType);
    }, [incomeSources, sourceType]);
    const filteredExpenseSources = useMemo(() => {
        if (!sourceType) return expenseSources;
        return expenseSources.filter((source) => source.type === sourceType);
    }, [expenseSources, sourceType]);

    const handleAddIncomeSource = (income) => {
        const sourceName = income?.source?.trim();
        if (!sourceName) return;

        setIncomeSources((prev) => [
            {
                id: Date.now(),
                type: sourceType,
                name: sourceName,
            },
            ...prev,
        ]);
        setOpenAddIncomeSourceModal(false);
    };
    const handleAddExpenseSource = (sourceName) => {
        const trimmedName = sourceName?.trim();
        if (!trimmedName) return;

        setExpenseSources((prev) => [
            {
                id: Date.now(),
                type: sourceType,
                name: trimmedName,
            },
            ...prev,
        ]);
        setOpenAddExpenseSourceModal(false);
    };

    return (
        <DashboardLayout activeMenu={"Settings"}>
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

                    />
                ) : (
                    <ExpenseSettings
                        onOpenModal={() => setOpenAddExpenseSourceModal(true)}
                        sources={filteredExpenseSources}
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
