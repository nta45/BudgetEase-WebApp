import SettingsIcon from '@mui/icons-material/Settings';

function Navigation() {
  return (
    <>
    <header className="container mx-auto max-w-full box-border border-2 border-transparent bg-slate-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl normalcase font-bold px-5 py-5">ExpenseTracker</h1>
        <div className='flex items-center'>
          <button><SettingsIcon fontSize="large" className='icon'/></button>
          <div className="flex flex-col items-center gap-1 my-2">
            <img className="h-[3em] w-[3em] rounded-full overflow-hidden" src="http://graph.facebook.com/v2.5/5/picture?height=200&height=200" alt="Profile Picture"/>
            <small className="box-border h-8 w-40 border-1 text-[1em] text-center">Nathan</small>
        </div>
        </div>
      </div>
    </header>
    </>
  );
}

export default Navigation;