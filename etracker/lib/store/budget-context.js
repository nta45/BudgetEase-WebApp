'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import { authContext } from './auth-context';
// Firebase
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';

export const BudgetContext = createContext({
    expenses: [],
    incomes: [],
    addExpense: async () => { },
    deleteExpense: async () => { },
    addIncome: async () => { },
    deleteIncome: async () => { }
});


export default function BudgetContextProvider({ children }) {
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const { user } = useContext(authContext);

    const addIncomeItem = async (newIncome) => {
        const collectionRef = collection(db, 'income');
        try {
            const docSnap = await addDoc(collectionRef, newIncome);
            // updating state
            setIncome((prevIncome) => {
                return [...prevIncome, {
                    uid: user.uid,
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
    const addExpenseItem = async (newExpense) => {
        const collectionRef = collection(db, 'expense');
        try {
            const docSnap = await addDoc(collectionRef, newExpense);
            // updating state
            setExpense((prevExpenses) => {
                return [...prevExpenses, {
                    uid: user.uid,
                    id: docSnap.id,
                    ...newExpense
                }]
            });
        } catch (e) {
            console.error('Error adding document: ', e);
            throw e;
        }
    }

    const removeExpenseItem = async (expenseId) => {
        const docRef = doc(db, 'expense', expenseId);
        try {
            await deleteDoc(docRef);
            setExpense((prevIncome) => {
                return prevIncome.filter((expense) => expense.id !== expenseId)
            });

        } catch (e) {
            console.error('Error deleting document: ', e);
            throw e;
        }
    };

    useEffect(() => {
        if (!user) return;
        // Fetch Income
        const getIncomeData = async () => {
            const collectionRef = collection(db, 'income')
            const q = query(collectionRef, where('uid', '==', user.uid));
            const docSnap = await getDocs(q);

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
            const collectionRef = collection(db, 'expense')
            const q = query(collectionRef, where('uid', '==', user.uid));
            const docSnap = await getDocs(q);

            const data = docSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    createdOn: new Date(doc.data().createdOn.toMillis())
                }
            });
            setExpense(data);
        }

        getIncomeData();
        getExpenseData();
    }, [user]);

    const values = { income, expense, addIncomeItem, removeIncomeItem, addExpenseItem, removeExpenseItem };
    return <BudgetContext.Provider value={values}>
        {children}
    </BudgetContext.Provider>
}