import React from 'react';
import {Link} from 'react-router-dom';

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle your form submission logic here
  };

  return (
    <div className='bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>SignUp</p>
        
        <form onSubmit={handleSubmit}>
          <div className='mt-4'>
            <div>
              <label htmlFor="username" className='text-zinc-400'>
                UserName<span className='text-red-700'>*</span>
              </label>
              <input
                type="text"
                id="username"
                placeholder='Enter The UserName'
                required
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                name='username'
                autoComplete='username'  
              />
            </div>
          </div>

          <div className='mt-4'>
            <div>
              <label htmlFor="email" className='text-zinc-400'>
                Email<span className='text-red-700'>*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder='Enter The Email'
                required
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                name='email'
                autoComplete='email'   
              />
            </div>
          </div>

          <div className='mt-4'>
            <div>
              <label htmlFor="password" className='text-zinc-400'>
                Password<span className='text-red-700'>*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder='Enter The Password'
                required
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                name='password'
                autoComplete='new-password'  
              />
            </div>
          </div>

          <div className='mt-4'>
            <div>
              <label htmlFor="address" className='text-zinc-400'>
                Address<span className='text-red-700'>*</span>
              </label>
              <textarea
                type="text"
                id="address"
                placeholder='Enter The Address'
                required
                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                name='address'
                rows='5'
                autoComplete='street-address'  
              />
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className='bg-blue-500 rounded px-4 py-2 hover:bg-gray-400 hover:text-zinc-800 w-full'>
              SignUp
            </button>
          </div>
        </form>

        <p className='flex items-center justify-center mt-4 text-zinc-200 font-semibold'> Or</p>
        <div className="flex items-center justify-center mt-4 text-zinc-200 font-semibold">
          <p className=' text-zinc-400 font-semibold'>Already have an account?</p>
          <Link to='/signin'>
            <u className='hover:text-blue-600 ml-2'>SignIn</u>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
