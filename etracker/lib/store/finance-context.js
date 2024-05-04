'use client';
import { createContext, useState, useEffect } from 'react';
// Firebase
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

export const FinanceContext = createContext({
    expenses: [],
    incomes: [],
    addExpense: async () => { },
    deleteExpense: async () => { },
    addIncome: async () => { },
    deleteIncome: async () => { }
});


export default function FinanceContextProvider({ children }) {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const addIncomeItem = async (newIncome) => {
        const collectionRef = collection(db, 'income');
        try {
            const docSnap = await addDoc(collectionRef, newIncome);
            // updating state
            setIncome((prevIncome) => {
                return [...prevIncome, {
                    id: docSnap.id,
                    ...newIncome
                }]
            });
        } catch (e) {
            console.error('Error adding document: ', e);
            throw e;
        }
    };
    const removeIncomeItem = async (incomeId) => {
        const docRef = doc(db, 'income', incomeId);
        try {
            await deleteDoc(docRef);
            setIncome((prevIncome) => {
                return prevIncome.filter((income) => income.id !== incomeId)
            });

        } catch (e) {
            console.error('Error deleting document: ', e);
            throw e;
        }
    };

    const values = { income, expenses, addIncomeItem, removeIncomeItem};
    useEffect(() => {
        // Fetch Income
        const getIncomeData = async () => {
            const collectionRef = collection(db, 'income')
            const docSnap = await getDocs(collectionRef);
            const data = docSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    createdOn: new Date(doc.data().createdOn.toMillis())
                }
            });
            setIncome(data);
        };

        const getExpenseData = async () => {
            const collectionRef = collection(db, 'expenses')
            const docSnap = await getDocs(collectionRef);
            const data = docSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            });
            setExpenses(data);
        }

        getIncomeData();
        getExpenseData();
    }, []);

    return <FinanceContext.Provider value={values}>
        {children}
    </FinanceContext.Provider>
}