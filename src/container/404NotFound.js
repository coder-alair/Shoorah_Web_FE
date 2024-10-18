import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../contents/context/themeContext';

const NotFound = () => {
  const history = useHistory();
  const {theme}=useTheme();

  const handleGoBack = () => {
    history.push('/');
  };

  return (
    <>
      <div className='flex h-screen flex-col bg-white pt-16 pb-12'>
        <main className='mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8'>
          <div className='py-16'>
            <div className='text-center'>
              <p className={`text-base font-semibold ${theme.shoorah_text_5}`}>404</p>
              <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                Page not found.
              </h1>
              <p className='mt-2 text-base text-gray-500'>
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className='mt-6'>
                <button
                  onClick={handleGoBack}
                  type='button'
                  className={`text-base font-medium ${theme.shoorah_text_5} ${theme.shoorah_text_hover_5}`}
                >
                  Go back home
                  <span aria-hidden='true'> &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotFound;
