import Modal from '@/components/Modal';
import { useRef, useState, useContext } from 'react';
import { FinanceContext } from '@/lib/store/finance-context';
import ExpenseCategoryItem from '@/components/ExpenseCategoryItem';
import { v4 as uuidv4 } from 'uuid';


function AddExpensesModal({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { expenses,
    // addIncomeItem, removeIncomeItem 
  } = useContext(FinanceContext);

  // Handler Functions
  const addExpenseHandler = async (e) => {
    e.preventDefault();

    const expense = expenses.find((e) => e.id === selectedCategory);

    const newExpense = {
      color: expense.color,
      total: +expense.total + +expenseAmount,
      title: expense.title,
      items: [...expense.items, {
        description: expenseDescription,
        amount: +expenseAmount,
        createdOn: new Date(),
        id: uuidv4()
      }
      ]
    };

    console.log(newExpense);
    setExpenseAmount("");
    setExpenseDescription("");
    setSelectedCategory(null);
    onClose();
    // try {
    //   await addIncomeItem(newIncome);
    //   descriptionRef.current.value = '';
    //   amountRef.current.value = '';
    // } catch (e) {
    //   console.error('Error adding income: ', e);
    // }
  }

  // const deleteIncomeHandler = async (incomeId) => {
  //   try {
  //     await removeIncomeItem(incomeId);
  //   } catch (e) {
  //     console.error('Error deleting income: ', e);
  //   }
  // }


  return (
    show && (
      <Modal show={show} onClose={onClose}>
        <form className='flex flex-col gap-4 px-6'>
          <div className='input-group'>
            <label htmlFor="description" className='mr-2 text-l'>Expense Description:</label>
            <input className="px-4 py-2 bg-slate-500 rounded-xl text-l" type="text"
              placeholder="Enter Expense Description" value={expenseDescription}
              onChange={
                (e) => {
                  setExpenseDescription(e.target.value);
                }
              }
              required />
          </div>
          <div className='input-group'>
            <label htmlFor="amount" className='mr-2 text-l'>Expense Amount:</label>
            <input className="px-4 py-2 bg-slate-500 rounded-xl text-l" type="number"
              min={0.01} step={0.01} value={expenseAmount}
              onChange={
                (e) => {
                  setExpenseAmount(e.target.value);
                }
              } placeholder="Enter Expense Amount" required />
          </div>
          {expenseAmount > 0 && (<>
            <label htmlFor="category" className='mr-2 text-l'>Expense Category:</label>
            <div className='flex flex-col gap-2 mt-6 max-w-fit'>
              {expenses.map((expense) =>
                <button onClick={() => { setSelectedCategory(expense.id); }} style={{
                  boxShadow: expense.id === selectedCategory ? '1px 1px 4px' : 'none'
                }}>
                </button>
              )}
            </div>
          </>
          )}

          {expenseAmount > 0 && selectedCategory && (
            <button onClick={addExpenseHandler} type="submit" className="btn btn-add items-center m-5">Add Expense</button>
          )}
        </form>
      </Modal>
    )
  )
}

export default AddExpensesModal;