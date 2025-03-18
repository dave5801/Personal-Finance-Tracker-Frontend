// src/services/api.ts
interface Expense {
    category: string;
    amount: number;
  }
  
  export const addExpense = async (expense: Expense) => {
    // Simulating an API call (this would call your Flask API in a real-world app)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  };