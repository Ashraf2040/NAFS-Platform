'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';



function Navbar(props) {
  


const {data:session} = useSession();
console.log(session)



  
  const router = useRouter();
  return (
    <nav className=" poppins  mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 ">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center items-center w-2/5  sm:text-left flex justify-between max-h-fit">
          <a className="flex gap-1 items-center">
            <Image
              src="/hero-img.svg"
              alt=""
              width={100} // Width of the image
              height={100}
            />
            <h2 className="text-2xl font-bold flex gap-2">
              NAFS <span className="text-theme">TRAINING</span>
            </h2>
          </a>
        <div>
        {session && (
<span className='text-xl font-medium text-white  bg-themeYellow px-4 rounded-md py-2  '>Score: {session?.user?.score}</span>
)}
        </div>
  
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
        <div className='flex items-center justify-center gap-6 relative'>
  {session && (
    <div className="flex gap-2 ">
      <span className='text-xl text-theme font-medium'>Welcome: <span className='text-themeYellow'>{session?.user?.name}</span></span>
      
      
    </div>
    
  )}
  {session ? (
    <button
    className="block rounded-lg bg-theme px-7 py-3 text-sm font-medium text-white transition hover:bg-purple-800 focus:outline-none"
    type="button"
    onClick={()=>signOut()}
  >
   Logout
  </button>
  ):<button
  className="block rounded-lg bg-theme px-7 py-3 text-sm font-medium text-white transition hover:bg-purple-800 focus:bg-purple-800 focus:outline-none"
  type="button"
  onClick={() => {
    router.push('/login');
  }}
>
  login
</button>}
  
</div>


         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

































// async function changeTheLoginState() {
  //   console.log(isLoading);
  //   const userCopy = { ...user };
  //   userCopy.isLogged = !userCopy.isLogged;

  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(
  //       `http://localhost:3000/api/user?id=${userCopy._id}`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           'Content-type': 'application/json',
  //         },
  //         body: JSON.stringify({ updateUser: userCopy }),
  //       },
  //     );

  //     if (!response.ok) {
  //       toast.error('Something went wrong...');
  //       throw new Error('fetching failed...');
  //     }

  //     setUser(userCopy);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }