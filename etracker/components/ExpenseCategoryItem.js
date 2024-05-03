import {currencyFormatter} from '@/lib/utils'

function ExpenseCategoryItem({color, title, amount}) {
    return (
        <button>
            <div className='flex items-center justify-between px-4 py-4 bg-slate-500 rounded-full'>
                <div className='flex items-center gap-2'>
                <div className='w-[2em] h-[2em] rounded-full' style={{backgroundColor:color}}/>
                <h4 className='capitalize mx+[32px]'>{title}</h4>
                </div>
                <small>{currencyFormatter(amount)}</small>
            </div>
        </button>
    );
}

export default ExpenseCategoryItem;