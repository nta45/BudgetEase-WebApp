'use client';
import { currencyFormatter } from '@/lib/utils'
import ExpenseCategoryItem from '@/components/ExpenseCategoryItem';
import IncomeCategoryItem from '@/components/IncomeCategoryItem';
import { useState, useContext, useEffect } from 'react';
import AddIncomeWindow from '@/components/Windows/AddIncomeWindow';
import AddExpenseWindow from '@/components/Windows/AddExpenseWindow';
import { BudgetContext } from '@/lib/store/budget-context';
import { authContext } from '@/lib/store/auth-context';
import SignIn from '@/components/signIn';

export default function Home() {
  const [showAddIncomeWindow, setAddIncomeWindow] = useState(false);
  const [showAddExpenseWindow, setAddExpenseWindow] = useState(false);
  const { user, loading } = useContext(authContext);

  const [balance, setBalance] = useState(0);
  const { expense, income } = useContext(BudgetContext);

  useEffect(() => {
    const newBalance = income.reduce((total, i) => {
      return total + i.amount;
    }, 0) -
      expense.reduce((total, e) => {
        return total + e.amount;
      }, 0);


    setBalance(newBalance);
  }, [expense, income]);

  if (!user || loading) {
    return <SignIn />
  }

  const fname = user.displayName.split(' ')[0];

  return (
    <>
      {showAddIncomeWindow && <AddIncomeWindow show={showAddIncomeWindow} onClose={setAddIncomeWindow}></AddIncomeWindow>}
      {showAddExpenseWindow && <AddExpenseWindow show={showAddExpenseWindow} onClose={setAddExpenseWindow}></AddExpenseWindow>}
      <main className='my-2 py-2 container mx-auto flex flex-col'>
        <section className='flex flex-col gap-2 py-5 items-center'>
          <small className='text-3xl'> Current Balance</small>
          <h2 className='text-5xl'>{currencyFormatter(balance)}</h2>
          <section className='flex items-center gap-5 mt-4'>
            <button onClick={() => { setAddExpenseWindow(true); }} className="btn btn-add">+ Add Expense</button>
            <button onClick={() => { setAddIncomeWindow(true); }} className="btn btn-add">+ Add Income</button>
          </section>
        </section>
        <hr className='w-full border-1 border-slate-500 my-6' />

        <section className='flex  items-center mx-auto sm=flex-col'>{/* Lists Container */}
          <section className='py-2'>{/* Expenses List*/}
            <h3 className='text-2xl px-6'>{fname}'s Expenses</h3>
            <div className='flex flex-col gap-2 mt-6'>
              {expense.map((expense) =>
                <ExpenseCategoryItem key={expense.id} expense={expense} />
              )}
            </div>
          </section>
          <section className='py-2'>{/* Incomes List*/}
            <h3 className='text-2xl px-6'>{fname}'s Incomes</h3>
            <div className='flex flex-col gap-2 mt-6'>
              {income.map((income) =>
                <IncomeCategoryItem key={income.id} income={income} />
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

