import { auth } from '@/firebase/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';

const Logout = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const handleLogout = () => {
    signOut();
  };
  return (
    <button
      type='button'
      className='bg-dark-fill-3 py-1.5 px-3  rounded text-brand-orange'
      onClick={handleLogout}
    >
      <FiLogOut />
    </button>
  );
};

export default Logout;
