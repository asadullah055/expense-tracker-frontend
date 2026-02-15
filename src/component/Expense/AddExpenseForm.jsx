import { useState } from 'react';
import EmojiPickerPopup from '../EmojiPickerPopup';
import Inputs from '../Inputes/Inputs';

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
        category: '',
        amount: '',
        date: '',
        icon: '',
    })
    const handleChange = (key, value) => {
        setExpense({ ...expense, [key]: value })
    }

    return (
        <div>

            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />
            <Inputs
                value={expense.category}
                onChange={(e) => handleChange('category', e.target.value)}
                label="Expense Category"
                placeholder="Enter expense category"
                type="text"

            />
            <Inputs
                value={expense.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                label="Amount"
                placeholder="Enter amount"
                type="number"
            />
            <Inputs
                value={expense.date}
                onChange={(e) => handleChange('date', e.target.value)}
                label="Date"
                placeholder=""
                type="date"
            />
            <div className="flex justify-end mt-6">
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddExpense(expense)}
                >Add Expense</button>
            </div>
        </div>
    );
};

export default AddExpenseForm;