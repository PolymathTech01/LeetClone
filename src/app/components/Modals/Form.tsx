import { toast } from 'react-toastify';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FormProps } from '..';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/AuthModalAtom';
import { auth } from '@/firebase/firebase';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
const Form = ({
  formType,
  isNotRegistered,
  haveAccount,
  createAccoutOrLoginIn,
}: FormProps) => {
  type handleClickTypes = 'login' | 'register' | 'forgotPassword';
  const handleClick = (type: handleClickTypes) => {
    setAuthModelState((prev) => ({ ...prev, type }));
  };
  const router = useRouter();
  const setAuthModelState = useSetRecoilState(authModalState);
  const [inputs, setInputs] = useState({
    email: '',
    text: '',
    password: '',
  });
  const [
    createUserWithEmailAndPassword,
    userSignUp,
    loadingSignUp,
    errorSignUp,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, userLogIn, loadingLogIn, errorLogIn] =
    useSignInWithEmailAndPassword(auth);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNotRegistered)
      try {
        const newUser = await createUserWithEmailAndPassword(
          inputs.email,
          inputs.password
        );
        if (!newUser) return;
        setInputs({ email: '', text: '', password: '' });
        router.push('/');
      } catch (error: any) {
        toast.error(error.message);
      }
    else {
      try {
        const user = await signInWithEmailAndPassword(
          inputs.email,
          inputs.password
        );
        if (!user) return;
        router.push('/');
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    if (errorSignUp) {
      toast(errorSignUp.message, {
        position: 'top-center',
        autoClose: 3000,
      });
      console.log(errorSignUp.message);
    }
    if (errorLogIn?.message === 'Firebase: Error (auth/user-not-found).') {
      toast('Sorry User not Found', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  }, [errorSignUp, errorLogIn]);

  return (
    <form className='space-y-6 px-6 pb-4' onSubmit={handleSubmit}>
      <h3 className='text-xl font-medium text-white'>
        {formType} to LeetClone
      </h3>
      <div>
        <label
          htmlFor='email'
          className='text-sm font-medium block mb-2 text-gray-300'
        >
          Email
        </label>
        <input
          onChange={handleChangeInput}
          required
          type='email'
          name='email'
          id='email'
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='example@gmail.com'
        />
      </div>
      {isNotRegistered && (
        <div>
          <label
            htmlFor='text'
            className='text-sm font-medium block mb-2 text-gray-300'
          >
            Display Name
          </label>
          <input
            onChange={handleChangeInput}
            required
            type='text'
            name='text'
            id='text'
            className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
            placeholder='John Doe'
          />
        </div>
      )}
      <div>
        <label
          htmlFor='password'
          className='text-sm font-medium block mb-2 text-gray-300'
        >
          Password
        </label>
        <input
          onChange={handleChangeInput}
          required
          type='password'
          name='password'
          id='password'
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='********'
        />
      </div>
      <button
        type='submit'
        className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-s'
      >
        {loadingSignUp && formType === 'Register'
          ? 'Registering...'
          : loadingLogIn && formType === 'Log In'
          ? 'Logging In...'
          : formType}
      </button>

      {!isNotRegistered && (
        <button
          className='flex w-full'
          onClick={() => handleClick('forgotPassword')}
        >
          <Link
            href='#'
            className='text-sm block text-brand-orange hover:underline w-full text-right'
          >
            Forgot Passowrd?
          </Link>
        </button>
      )}
      <div className='text-sm font-medium text-gray-300'>
        <span className='mr-1'>{haveAccount}</span>
        {createAccoutOrLoginIn === 'Create Account' ? (
          <span
            className='text-blue-700 hover:underline cursor-pointer'
            onClick={() => handleClick('register')}
          >
            {createAccoutOrLoginIn}
          </span>
        ) : (
          <span
            className='text-blue-700 hover:underline cursor-pointer'
            onClick={() => handleClick('login')}
          >
            {createAccoutOrLoginIn}
          </span>
        )}
      </div>
    </form>
  );
};

export default Form;
