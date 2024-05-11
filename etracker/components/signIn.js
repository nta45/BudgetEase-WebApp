import { FcGoogle } from 'react-icons/fc';
import React, { useContext, useState } from 'react';
import { authContext } from '@/lib/store/auth-context';
import Window from '@/components/Window';

const SignIn = () => {

  const { googleLoginHandler } = useContext(authContext);
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  return (
    <main className='container max-w-2xl px-6 mx-auto h-screen w-screen'>
      {/* SIGN IN FUNCTIONALITY */}
      {/* <h1 className='text-6xl font-bold text-center'>Welcome!</h1>
      <p className='text-2xl'>Please sign in to continue</p>
      <form className='mt-6'>
        <div className='flex flex-col gap-4'>
          <label htmlFor='email' className='text-lg'>Email</label>
          <input type='email' id='email' className='input'/>
        </div>
        <div className='flex flex-col gap-4'>
          <label htmlFor='password' className='text-lg'>Password</label>
          <input type='password' id='password' className='input'/>
        </div>
        <button type='submit' className='btn btn-primary'>Sign In</button>
      </form> */}

      <div className="relative isolate">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="mx-auto py-20 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">BudgetEase</h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Hello!
              My name is Nathan, and I am a Full Stack Developer.<br></br>
              This project is built using React /using Next.js/ and Firebase.<br></br>
              Please sign in with Google to continue.<br></br>
              Sign in functionality with email & password is coming soon.<br></br>
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-6">
              <button onClick={googleLoginHandler} className=" flex flex-row gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center">
                <FcGoogle /> Login with Google
              </button>
              <button onClick={() => setIsWindowOpen(true)} className="text-sm font-semibold leading-6 text-gray-200">Learn more about this Project <span aria-hidden="true">→</span></button>
              {isWindowOpen && (<Window show={isWindowOpen} onClose={setIsWindowOpen} title={"Information"}>
                <h1> Citation</h1>
                <p> I have taken inspiration and guidance from
                  <button onClick={() => window.location = 'https://www.youtube.com/watch?v=f6B_rIoX0Lw&list=PL4HikwTaYE0Hf-F6jzDF_llm_I1mwtGUf&index=1'} className=''>Leon van Zyl's</button>
                  Budget Tracker project, which he built with the same tools.
                  I am fairly new to these tools and I learn visually, therefore I followed the steps he took & modified my code
                  along the way to match my needs. </p>

                <h1> Documentation </h1>

                <button onClick={() => window.location = 'https://github.com/nta45/BudgetEase-WebApp'} className='flex items-center px-4 py-4 bg-slate-500 rounded-full'>Source Code</button>

              </Window>)}
            </div>
          </div>
        </div>
      </div>
      {/* <div className='mt-6'>
        <p className='text-lg'>
          Don't have an account?{' '}
          <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
            Sign up
          </a>
        </p>
      </div> */}

    </main>
  )
}

export default SignIn
