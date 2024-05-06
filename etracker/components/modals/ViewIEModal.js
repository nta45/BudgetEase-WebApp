import Modal from '../Modal'
import { currencyFormatter } from '@/lib/utils';

const ViewIEModal = ({show, onClose, expense}) => {
  return (
    <Modal show={show} onClose={onClose}>
        <h1>Expense Detail View</h1>
        <div className='flex flex-col gap-2 mt-6'>
          {expense.items.map((expense) =>
            <div key={expense.id} className='flex items-center justify-between px-6'>
              <div>
                <p className='font-semibold'>{expense.description}</p>
              </div>
              <div>
                <small className='font-light text-[1em]'>{currencyFormatter(expense.amount)}</small>
              </div>
            </div>
          )}
        </div>
    </Modal>
  )
}

export default ViewIEModal
