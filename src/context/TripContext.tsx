import React, { createContext, useContext, useState, useMemo } from 'react';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: 'Dining' | 'Accommodation' | 'Transport' | 'Fun' | 'Personal';
  date: string;
  time: string;
}

interface TripContextType {
  budget: number;
  setBudget: (amount: number) => void;
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  totalSpent: number;
  remainingBudget: number;
  spentByCategory: Record<string, number>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [budget, setBudget] = useState(20000000); // Default 20M VNĐ
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Dinner at Da Lat', amount: 450000, category: 'Dining', date: '2023-11-20', time: '19:00' },
    { id: '2', name: 'Homestay Stay', amount: 1200000, category: 'Accommodation', date: '2023-11-20', time: '14:00' },
  ]);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...newExpense, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const totalSpent = useMemo(() => expenses.reduce((sum, ex) => sum + ex.amount, 0), [expenses]);
  
  const remainingBudget = budget - totalSpent;

  const spentByCategory = useMemo(() => {
    return expenses.reduce((acc, ex) => {
      acc[ex.category] = (acc[ex.category] || 0) + ex.amount;
      return acc;
    }, {} as Record<string, number>);
  }, [expenses]);

  return (
    <TripContext.Provider value={{ 
      budget, 
      setBudget, 
      expenses, 
      addExpense, 
      totalSpent, 
      remainingBudget,
      spentByCategory
    }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrip must be used within a TripProvider');
  return context;
}
