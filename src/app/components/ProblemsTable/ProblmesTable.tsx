'use client';
import { problems } from '@/MockProblems/Problems';
import Link from 'next/link';
import { BsCheckCircle } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import Youtube, { YouTubeProps } from 'react-youtube';
import { useEffect, useState } from 'react';

const ProblmesTable = () => {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: '',
  });

  const closeModal = () =>
    setYoutubePlayer({
      isOpen: false,
      videoId: '',
    });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <tbody className='text-white'>
        {problems.map((problem, index) => {
          const diffultyColor =
            problem.difficulty === 'Easy'
              ? 'text-dark-green-s'
              : problem.difficulty === 'Medium'
              ? 'text-dark-yellow'
              : 'text-dark-pink';
          return (
            <tr
              className={`${index % 2 === 1 ? 'bg-dark-layer-1' : ''}`}
              key={index}
            >
              <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                <BsCheckCircle fontSize={18} width={18} />
              </th>
              <td className='px py-4'>
                <Link
                  href={`/problem/${problem.id}`}
                  className='hover:text-blue-600 cursor-pointer'
                >
                  {problem.title}
                </Link>
              </td>
              <td className={`px-6 py-4 ${diffultyColor}`}>
                {problem.difficulty}
              </td>
              <td className='px-6 py-4'>{problem.category}</td>
              <td className='px-6 py-4'>
                {problem.videoId ? (
                  <AiFillYoutube
                    fontSize={28}
                    className='cursor-pointer hover:text-red-600'
                    onClick={() =>
                      setYoutubePlayer({
                        isOpen: true,
                        videoId: problem.videoId as string,
                      })
                    }
                  />
                ) : (
                  <p className='text-gray-400'>Coming Soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {youtubePlayer.isOpen && (
        <section
          className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center '
          onClick={closeModal}
        >
          <div className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'></div>
          <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
            <div className='w-full h-full flex items-center justify-center relative'>
              <div className='w-full relative'>
                <IoClose
                  fontSize={'35'}
                  className='cursor-pointer absolute -top-16 right-0'
                  onClick={closeModal}
                />
                <Youtube
                  videoId={youtubePlayer.videoId}
                  loading='lazy'
                  iframeClassName='w-full min-h-[500px]'
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProblmesTable;
