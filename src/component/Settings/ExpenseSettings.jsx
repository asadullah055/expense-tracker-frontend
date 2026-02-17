import { LuPlus } from "react-icons/lu";

const ExpenseSettings = ({ onOpenModal, sources = [] }) => {


    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expense Sources</h5>
                <button type="button" className="add-btn" onClick={onOpenModal}>
                    <LuPlus className="text-lg" />
                    Add Expense Source
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {sources.map((source) => (
                    <div key={source.id} className="mt-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
                        <p className="text-sm font-medium text-gray-800">{source.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{source.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseSettings;
