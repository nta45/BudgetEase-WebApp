import Window from '@/components/Window';
import { useRef, useEffect, useState, useContext } from 'react';
import { currencyFormatter } from '@/lib/utils';
import { BudgetContext } from '@/lib/store/budget-context';
import { authContext } from '@/lib/store/auth-context';
// Icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function AddExpenseWindow({ show, onClose }) {
  const { user } = useContext(authContext);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { expense, addExpenseItem, removeExpenseItem } = useContext(BudgetContext);

  const addExpenseHandler = async (e) => {
    e.preventDefault();

    const newExpense = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdOn: new Date(),
      user: user.uid
    }
    try {
      await addExpenseItem(newExpense);
      descriptionRef.current.value = '';
      amountRef.current.value = '';
    } catch (e) {
      console.error('Error adding Expense: ', e);
    }
  }

  const deleteExpenseHandler = async (expenseId) => {
    try {
      await removeExpenseItem(expenseId);
    } catch (e) {
      console.error('Error deleting Expense: ', e);
    }
  }


  return (
    show && (
      <Window show={show} onClose={onClose} title={"Add an Expense"}>
        <form onSubmit={addExpenseHandler} className='flex flex-col gap-4 px-6'>
          <div className='input-group'>
            <label htmlFor="description" className='mr-2 text-l'>Expense Description:</label>
            <input className="px-4 py-2 bg-slate-500 rounded-xl text-l" type="text" ref={descriptionRef} placeholder="Enter Expense Description" required />
          </div>
          <div className='input-group'>
            <label htmlFor="amount" className='mr-2 text-l'>Expense Amount:</label>
            <input className="px-4 py-2 bg-slate-500 rounded-xl text-l" type="number" ref={amountRef} min={0.01} step={0.01} placeholder="Enter Expense Amount" required />
          </div>

          <button type="submit" className="btn btn-add items-center m-5">Add Expense</button>
        </form>

        <div>
          <div className='flex flex-col gap-2 mt-6'>
            <h3 className='text-2xl px-6'>Expense History</h3>
            {expense.map((Expense) =>
              <div key={Expense.id} className='flex items-center justify-between px-6'>
                <div>
                  <p className='font-semibold'>{Expense.description}</p>
                  <p className='text-xs'>{Expense.createdOn.toDateString()}, at {Expense.createdOn.toLocaleTimeString()}</p>
                </div>
                <div>
                  <small className='font-light text-[1em]'>{currencyFormatter(Expense.amount)}</small>
                  <button onClick={() => { deleteExpenseHandler(Expense.id) }}><DeleteForeverIcon /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Window>

    )
  )
}

export default AddExpenseWindow;