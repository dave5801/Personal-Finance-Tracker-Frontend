// src/App.tsx
import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseChart from './components/ExpenseChart';
import { addExpense } from './services/api';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<{ category: string; amount: number }[]>(
    []
  );

  const handleAddExpense = async (expense: { category: string; amount: number }) => {
    // Send the expense to the API (here it's just a mock)
    await addExpense(expense);
    
    // Add expense to state
    setExpenses([...expenses, expense]);
  };

  return (
    <div>
      <h1>Personal Finance Tracker</h1>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <h2>Expense Breakdown</h2>
      <ExpenseChart data={expenses} />
    </div>
  );
};

export default App;

