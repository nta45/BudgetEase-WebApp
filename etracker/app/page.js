'use client';

import Navigation from '../components/Navigation';
import {currencyFormatter} from '@/lib/utils'
import ExpenseCategoryItem from '@/components/ExpenseCategoryItem';
import { useState } from 'react';

export default function Home() {

  const DUMMY_EXPENSES = [
    {color: 'red', title: 'Toilet Paper', amount: 94.12, date: new Date(2022, 7, 14)},
    {color: 'blue', title: 'New TV', amount: 799.49, date: new Date(2022, 7, 14)},
    {color: 'green', title: 'Car Insurance', amount: 294.67, date: new Date(2022, 7, 14)},
    {color: 'yellow', title: 'New Desk (Wooden)', amount: 450, date: new Date(2022, 7, 14)},
  ]

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    {modalOpen && (
      <div className='absolute top-0 left-0 w-full h-full backdrop-blur-sm '> {/* Modal */}
        <div className=' container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-500'>
          <section className='flex justify-between items-center gap-5 mt-4'>
            <h3 className='text-2xl px-5 py-4 '>Add New Transaction</h3>
            <button onClick={()=>{setModalOpen(false);}} className='w-10 h-10 m-2 right-1 font-bold p-4 '>❌</button>
            
          </section>
        </div>
      </div>
      )}
      <main className='my-2 py-2 container mx-auto flex flex-col'>
        <section className='flex flex-col gap-2 py-5 items-center'>
          <small className='text-3xl'> Current Balance</small>
          <h2 className='text-5xl'>{currencyFormatter(0)}</h2>
        
          <section className='flex items-center gap-5 mt-4'>
            <button onClick={()=>{setModalOpen(true);}} className="btn btn-add">+ Add Expense</button>
            <button onClick={()=>{setModalOpen(true);}} className="btn btn-add">+ Add Income</button>
          </section>
        </section>
        <hr className='w-full border-1 border-slate-500 my-6'/>
        
        <section className='py-2'>{/* Expenses List*/}
          <h3 className='text-2xl'>Nathan's Expenses</h3>
          <div className='flex flex-col gap-2 mt-6'>
            {DUMMY_EXPENSES.map((expense) =>
              <ExpenseCategoryItem color={expense.color} title={expense.title} amount={expense.amount}/>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
