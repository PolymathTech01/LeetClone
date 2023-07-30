import { auth } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const handlePaswordRest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    if (success) {
      toast.success('Password Rest Email sent', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };
  useEffect(() => {
    error &&
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 3000,
      });
  }, [error]);

  return (
    <form
      className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8'
      onSubmit={handlePaswordRest}
    >
      <h3 className='text-xl font-medium text-white'>Reset Password</h3>
      <p className='text-sm text-white'>
        Forgotten Your password? Enter your Email Address below
      </p>
      <div>
        <label
          htmlFor='email'
          className='text-sm font-medium block mb-2 text-gray-300'
        >
          Your Email
        </label>
        <input
          type='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          id='email'
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='example@gmail.com'
        />
      </div>
      <button
        type='submit'
        className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-s '
      >
        Submit
      </button>
    </form>
  );
};

export default ResetPassword;
