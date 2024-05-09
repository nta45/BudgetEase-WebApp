import {currencyFormatter} from '@/lib/utils'
import ViewIEModal from './modals/ViewIEModal';
import { useState } from 'react';

function ExpenseCategoryItem({expense}) {
    const [viewModal, setViewModal] = useState(false);

    return (
        <>{viewModal && <ViewIEModal show={viewModal} onClose={setViewModal} expense={expense}/>}
        <button onClick={()=>{setViewModal(true)}}>
            <div className='flex items-center justify-between px-4 py-4 bg-slate-500 rounded-full'>
                <div className='flex items-center gap-2'>
                <div className='w-[2em] h-[2em] rounded-full' style={{backgroundColor:expense.color}}/>
                <h4 className='capitalize mx+[32px] px-16'>{expense.title}</h4>
                </div>
                <small>{currencyFormatter(expense.amount)}</small>
            </div>
        </button>
        </>
    );
}

export default ExpenseCategoryItem;