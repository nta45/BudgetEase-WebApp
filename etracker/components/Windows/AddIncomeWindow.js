import Window from '@/components/Window';
import { useRef, useEffect, useState, useContext } from 'react';
import { currencyFormatter } from '@/lib/utils';
import { BudgetContext } from '@/lib/store/budget-context';
import { authContext } from '@/lib/store/auth-context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function AddIncomeWindow({ show, onClose }) {
  const { user } = useContext(authContext);

  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncomeItem, removeIncomeItem } = useContext(BudgetContext);

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdOn: new Date(),
      uid: user.uid
    }
    try {
      await addIncomeItem(newIncome);
      descriptionRef.current.value = '';
      amountRef.current.value = '';
    } catch (e) {
      console.error('Error adding income: ', e);
    }
  }

  const deleteIncomeHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
    } catch (e) {
      console.error('Error deleting income: ', e);
    }
  }


  return (
    show && (
      <Window show={show} onClose={onClose} title={"Add an Income"}>
        <form onSubmit={addIncomeHandler} className='flex flex-col gap-4 px-6'>
          <div className='input-group'>
            <label htmlFor="description" className='mr-2 text-l'>Income Description:</label>
            <input className="px-4 py-2 bg-slate-500 rounded-xl text-l" type="text" ref={descriptionRef} placeholder="Enter Income Description" required />
          </div>
          <div className='input-group'>
            <label htmlFor="amount" className='mr-2 text-l'>Income Amount:</label>
            <input className="px-4 py-2 bg-slate-500 rounded-xl text-l" type="number" ref={amountRef} min={0.01} step={0.01} placeholder="Enter Income Amount" required />
          </div>

          <button type="submit" className="btn btn-add items-center m-5">Add Income</button>
        </form>

        <div>
          <div className='flex flex-col gap-2 mt-6'>
            <h3 className='text-2xl px-6'>Income History</h3>
            {income.map((income) =>
              <div key={income.id} className='flex items-center justify-between px-6'>
                <div>
                  <p className='font-semibold'>{income.description}</p>
                  <p className='text-xs'>{income.createdOn.toDateString()}, at {income.createdOn.toLocaleTimeString()}</p>
                </div>
                <div>
                  <small className='font-light text-[1em]'>{currencyFormatter(income.amount)}</small>
                  <button onClick={() => { deleteIncomeHandler(income.id) }}><DeleteForeverIcon /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Window>

    )
  )
}

export default AddIncomeWindow;