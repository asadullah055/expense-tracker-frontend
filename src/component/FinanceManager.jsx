import { useState } from "react";

const FinanceManager = () => {
    const [activeTab, setActiveTab] = useState("income");

    const incomeList = [
        { id: 1, title: "Salary", amount: 5000, date: "18 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
        { id: 2, title: "Bonus", amount: 2000, date: "17 Feb 2026" },
    ];

    const expenseList = [
        { id: 1, title: "Food", amount: 500, date: "18 Feb 2026" },
        { id: 2, title: "Transport", amount: 200, date: "17 Feb 2026" },
    ];

    return (
        <div className="p-6">

            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab("income")}
                    className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === "income"
                        ? "bg-primary text-white"
                        : "bg-gray-100"
                        }`}
                >
                    Income
                </button>

                <button
                    onClick={() => setActiveTab("expense")}
                    className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === "expense"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100"
                        }`}
                >
                    Expense
                </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* LEFT LIST */}
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-5">
                    <h3 className="text-lg font-semibold mb-4">
                        {activeTab === "income" ? "Income List" : "Expense List"}
                    </h3>

                    <div className="space-y-3">
                        {(activeTab === "income" ? incomeList : expenseList).map(item => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border rounded-xl p-3 hover:bg-gray-50"
                            >
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.date}</p>
                                </div>

                                <p
                                    className={`font-semibold ${activeTab === "income"
                                        ? "text-green-600"
                                        : "text-red-500"
                                        }`}
                                >
                                    {activeTab === "income" ? "+" : "-"}${item.amount}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
                    <h3 className="text-lg font-semibold mb-4">
                        Add {activeTab === "income" ? "Income" : "Expense"}
                    </h3>

                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <input
                            type="date"
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <textarea
                            placeholder="Note (Optional)"
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition"
                        >
                            Add {activeTab === "income" ? "Income" : "Expense"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default FinanceManager;
