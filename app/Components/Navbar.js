"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setUser } from '../reducers/userSlice';

function Navbar(props) {
  const [currentScore, setCurrentScore] = useState(0);
  const { data: session } = useSession();
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      dispatch(setUser(session.user));
    } else {
      dispatch(clearUser());
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (user !== null) {
      const { score } = user;
      setCurrentScore(score);
    }
  }, [user]);

  return (
    <nav className="poppins mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center items-center w-2/5 sm:text-left flex justify-between max-h-fit">
          <Link href="/" className="flex gap-1 items-center">
            <Image
              src="/hero-img.svg"
              alt=""
              width={100}
              height={100}
            />
            <h2 className="text-2xl font-bold text-theme flex gap-2">
              NAFS <span className="text-themeYellow">TRAINING</span>
            </h2>
          </Link>
          <div>
            {session && (
              <span className='text-xl font-semibold text-theme px-4 rounded-md py-2'>
                Score: <span className='text-themeYellow'>{currentScore}</span>
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          <div className='flex items-center justify-center gap-6 relative'>
            {session && (
              <div className="flex gap-2">
                <span className='text-xl text-theme font-medium'>
                  Welcome: <span className='text-themeYellow'>{session?.user?.name}</span>
                </span>
              </div>
            )}
            {session ? (
              <button
                className="block rounded-lg bg-theme px-7 py-3 text-sm font-medium text-white transition hover:bg-purple-800 focus:outline-none"
                type="button"
                onClick={() => signOut()}
              >
                Logout
              </button>
            ) : (
              <button
                className="block rounded-lg bg-theme px-7 py-3 text-sm font-medium text-white transition hover:bg-purple-800 focus:bg-purple-800 focus:outline-none"
                type="button"
                onClick={() => {
                  router.push('/login');
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
