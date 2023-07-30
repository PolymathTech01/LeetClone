'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AuthModal from '../components/Modals/AuthModal';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { authModalState } from '@/atoms/AuthModalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';

type Props = {};

const AuthPage = (props: Props) => {
  const authmodal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [loginLoading, setloginLoading] = useState(true);
  const router = useRouter();
  // useEffect(() => {
  //   if (user) router.push('/');
  //   if (!loginLoading && !user) setloginLoading(false);
  // }, [user, router, loginLoading]);

  // if (loginLoading) return null;
  return (
    <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
      <div className='max-w-7xl mx-auto'>
        <Navbar />
        <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
          <Image src='/hero.png' alt='hero image' width={1080} height={1080} />
        </div>
        {authmodal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};

export default AuthPage;
