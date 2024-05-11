import Window from '../Window'
import { currencyFormatter } from '@/lib/utils';
import { useContext } from 'react';
import { BudgetContext } from '@/lib/store/budget-context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ViewEWindow = ({ show, onClose, expense }) => {

  const { removeExpenseItem } = useContext(BudgetContext);
  const deleteExpenseHandler = async (expenseId) => {
    try {
      await removeExpenseItem(expenseId);
    } catch (e) {
      console.error('Error deleting Expense: ', e);
    }
  }
  return (
    <Window show={show} onClose={onClose} title={"Expense detail"}>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-[3em] capitalize px-5 '>{expense.description}</h1>
        <button onClick={() => { deleteExpenseHandler(expense.id) }} ><DeleteForeverIcon style={{ fontSize: '3rem' }} /></button>
      </div>
      <div className='flex flex-col gap-2 mt-6'>
        <div key={expense.id} className='flex items-center justify-between px-6'>
          <div>
            <small className='font-light text-[2em]'>{currencyFormatter(expense.amount)}</small>
          </div>
          <div>
            <p className='font-semibold'>{expense.createdOn.toDateString()}, at: {expense.createdOn.toLocaleTimeString()}</p>

          </div>
        </div>
      </div>
    </Window>
  )
}

export default ViewEWindow
