import Image from 'next/image';
import Link from 'next/link';
import TopBar from './components/TopBar/TopBar';
import ProblmesTable from './components/ProblemsTable/ProblmesTable';
import dynamic from 'next/dynamic';

export default function Home() {
  const YouTubeBaseUrl = (videoId: string) => {
    const url = 'https://www.youtube.com/watch?v=' + videoId;
    return url;
  };

  return (
    <>
      <main className='bg-dark-layer-2 min-h-screen'>
        <TopBar />
        <h1 className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5'>
          &ldquo; QUALITY OVER QUANTITY &rdquo;
        </h1>
        <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
          {dynamic.length > 0 && (
            <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 max-w-[1200px] mx-auto'>
              <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b'>
                <tr>
                  <th scope='col' className='px-1 py-3 w-0 font-medium'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3 w-0 font-medium'>
                    title
                  </th>
                  <th scope='col' className='px-6 py-3 w-0 font-medium'>
                    Difficulty
                  </th>
                  <th scope='col' className='px-6 py-3 w-0 font-medium'>
                    Category
                  </th>
                  <th scope='col' className='px-6 py-3 w-0 font-medium'>
                    Solution
                  </th>
                </tr>
              </thead>
              <ProblmesTable />
            </table>
          )}
        </div>
      </main>
    </>
  );
}
