import { currencyFormatter } from '@/lib/utils'
import ViewIWindow from './Windows/ViewIWindow';
import { useState } from 'react';
import { red } from '@mui/material/colors';

function IncomeCategoryItem({ income }) {
    const [viewWindow, setViewWindow] = useState(false);

    return (
        <>{viewWindow && <ViewIWindow show={viewWindow} onClose={setViewWindow} income={income} />}
            <button onClick={() => { setViewWindow(true) }}>
                <div className='flex items-center justify-between px-4 py-4 bg-slate-500 rounded-full'>
                    <div className='flex items-center gap-2'>
                        <div className='w-[2em] h-[2em] rounded-full' style={{ backgroundColor: red }} />
                        <h4 className='capitalize mx+[32px] px-16'>{income.description}</h4>
                    </div>
                    <small>{currencyFormatter(income.amount)}</small>
                </div>
            </button>
        </>
    );
}

export default IncomeCategoryItem;