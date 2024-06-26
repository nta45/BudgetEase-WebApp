import { currencyFormatter } from '@/lib/utils'
import ViewEWindow from './Windows/ViewEWindow';
import { useState } from 'react';
import { red } from '@mui/material/colors';

function ExpenseCategoryItem({ expense }) {
    const [viewWindow, setViewWindow] = useState(false);

    return (
        <>{viewWindow && <ViewEWindow show={viewWindow} onClose={setViewWindow} expense={expense} />}
            <button onClick={() => { setViewWindow(true) }}>
                <div className='flex items-center justify-between px-4 py-4 bg-slate-500 rounded-full'>
                    <div className='flex items-center gap-2'>
                        <div className='w-[2em] h-[2em] rounded-full' style={{ backgroundColor: red }} />
                        <h4 className='capitalize mx+[32px] px-16'>{expense.description}</h4>
                    </div>
                    <small>{currencyFormatter(expense.amount)}</small>
                </div>
            </button>
        </>
    );
}

export default ExpenseCategoryItem;