'use client';
import {currencyFormatter} from '@/lib/utils'
import ExpenseCategoryItem from '@/components/ExpenseCategoryItem';
import { useState, useContext, useEffect} from 'react';
import AddIncomeModal from '@/components/modals/AddIncomeModal';
import AddExpensesModal from '@/components/modals/AddExpensesModal';
import { FinanceContext } from '@/lib/store/finance-context';

export default function Home() {

  const [showAddIncomeModal, setAddIncomeModal] = useState(false);
  const [showAddExpensesModal, setAddExpensesModal] = useState(false);

  const [balance, setBalance] = useState(0);
  const {expenses, income} = useContext(FinanceContext);

  useEffect(() => {
    const newBalance = income.reduce((total, i) => {
      return total + i.amount;
    }, 0) - 
    expenses.reduce((total, e) => {
      return total + e.amount;
    }, 0);


    setBalance(newBalance);
  }, [expenses, income]);
  return (
    <>
       <AddIncomeModal show={showAddIncomeModal} onClose={setAddIncomeModal}/>
       <AddExpensesModal show={showAddExpensesModal} onClose={setAddExpensesModal}/>

      <main className='my-2 py-2 container mx-auto flex flex-col'>
        <section className='flex flex-col gap-2 py-5 items-center'>
          <small className='text-3xl'> Current Balance</small>
          <h2 className='text-5xl'>{currencyFormatter(balance)}</h2>
        
          <section className='flex items-center gap-5 mt-4'>
            <button onClick={()=>{setAddExpensesModal({val:true, name:'Add New Expense'});}} className="btn btn-add">+ Add Expense</button>
            <button onClick={()=>{setAddIncomeModal({val:true, name:'Add New Income'});}} className="btn btn-add">+ Add Income</button>
          </section>
        </section>
        <hr className='w-full border-1 border-slate-500 my-6'/>
        
        <section className='flex items-center mx-auto gap-5'>{/* Lists Container */}
          <section className='py-2'>{/* Expenses List*/}
            <h3 className='text-2xl px-6'>Nathan's Expenses</h3>
            <div className='flex flex-col gap-2 mt-6 max-w-fit'>
              {expenses.map((expense) =>
                <ExpenseCategoryItem key={expense.id} expense={expense}/>
              )}
            </div>
          </section>
          <section className='py-2'>{/* Incomes List*/}
            <h3 className='text-2xl px-6'>Nathan's Incomes</h3>
            <div className='flex flex-col gap-2 mt-6'>
              {expenses.map((expense) =>
                <ExpenseCategoryItem key={expense.id} expense={expense}/>
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

