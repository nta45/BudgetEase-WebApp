import Window from '../Window'
import { currencyFormatter } from '@/lib/utils';
import { useContext } from 'react';
import { BudgetContext } from '@/lib/store/budget-context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ViewIWindow = ({ show, onClose, income }) => {

  const { removeIncomeItem } = useContext(BudgetContext);
  const deleteIncomeHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
    } catch (e) {
      console.error('Error deleting Expense: ', e);
    }
  }
  return (
    <Window show={show} onClose={onClose} title={"Income Detail"}>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-[3em] capitalize px-5 '>{income.description}</h1>
        <button onClick={() => { deleteIncomeHandler(income.id) }} ><DeleteForeverIcon style={{ fontSize: '3rem' }} /></button>
      </div>
      <div className='flex flex-col gap-2 mt-6'>
        <div key={income.id} className='flex items-center justify-between px-6'>
          <div>
            <small className='font-light text-[2em]'>{currencyFormatter(income.amount)}</small>
          </div>
          <div>
            <p className='font-semibold'>{income.createdOn.toDateString()}, at: {income.createdOn.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </Window>
  )
}

export default ViewIWindow
