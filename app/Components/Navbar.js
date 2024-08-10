"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';   

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import   
 { clearUser, setUser } from '../reducers/userSlice';

function Navbar(props) {
  const { data: session } = useSession();
  const [myUser,setMyUser] = useState({})
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      dispatch(setUser(session.user));
      setMyUser(session.user)
    } else {
      dispatch(clearUser());
    }
  }, [ dispatch,session]);
 
  
      // setCurrentScore(session?.user?.score)   
     


  return (
  
      <div className="px-4 sm:flex sm:flex-col md:flex-row w-full sm:items-center sm:justify-between">
        <div className=" items-center     flex justify-between max-h-fit">
          <Link href="/" className="flex gap-1 items-center">
            <Image
              src="/hero-img.svg"
              alt=""
              width={100}
              height={100}
            />
            <h2 className="sm:text-xl font-bold  md:text-xl  text-theme flex gap-2">
              NAFS <span className="text-themeYellow">TRAINING</span>
            </h2>
          </Link>
          
        </div>
        <div className='hidden lg:flex'>
            {session && (
              <span className='text-xl font-semibold text-theme px-4 rounded-md py-2'>
                Score: <span className='text-themeYellow'>{user?.score}</span>
              </span>
            )}
          </div>
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          <div className='flex items-center justify-center gap-6 relative'>
            {session && (
              <div className="flex gap-2">
                <span className='text-xl text-theme font-medium'>
                  Welcome: <span className='text-themeYellow'>{myUser?.name}</span>
                </span>
              </div>
            )}
            {session ? (
              <button
                className="block rounded-lg bg-theme px-2 py-2 text-sm font-medium text-white transition hover:bg-purple-800 focus:outline-none"
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

  );
}

export default Navbar;
