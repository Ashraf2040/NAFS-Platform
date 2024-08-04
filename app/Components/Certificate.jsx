"use client"

import Image from 'next/image'

import React, { useCallback, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

const Certificate = () => {

  const {user}= useSelector(state=>state.user)
  const {data:session}= useSession()

  const certificateRef = useRef(null)
  const onButtonClick = useCallback(() => {
    if (certificateRef.current === null) {
      return
    }

    toPng(certificateRef.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'certificate.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [certificateRef])
  const handlePrint = () => {
    // Capture the current page content
    const originalContent = document.body.innerHTML;

    // Hide all content except the certificate element
    const certificateElement = certificateRef.current;
    document.body.innerHTML = certificateElement.outerHTML;

    // Trigger browser's print dialog
    window.print();

    // Restore original content
    document.body.innerHTML = originalContent;
  };
  return (
   
      <div className='flex items-center justify-center rounded-md gap-10  py-2 bg-white w-full top-[-70px] absolute h-[500px]'>
        <div className='   relative  mt-8 h-[500px]   flex justify-center items-center ' ref={certificateRef}>
        <Image src="/certificate1.png" alt="certificate" width={500} height={600} className='h-[500px] w-[750px] rounded-md'/>
        
        
        <div className='absolute top-60 left-60 font-bold text-3xl  w-full box-border '>
<h1>{session?.user?.name}</h1>



        </div>
        <p className='text-lg absolute bottom-[180px] font-semibold'>For completing the qualifying training for <span className='text-theme'>NAFS</span>  National Tests.</p>
        <p className='absolute bottom-[150px] font-bold'>Score : <span className='text-theme'>{user?.score}</span> </p>

        <h2 className='absolute bottom-[70px] max-w-fit  px-2 py-1 border-t-2 border-slate-600 left-[180px] font-semibold text-[14px]    '>Abdullah Al-Ghamdi</h2>
        <h2 className='absolute bottom-[70px] right-[180px] font-semibold  text-[14px]   
         max-w-fit  px-2 py-1 border-t-2 border-slate-600'>Ahmed Soliman</h2>
        
        </div>
     <div className='fle flex-col justify-center items-center '>
     <button onClick={onButtonClick} className='block mb-6 cursor-pointer bg-themeYellow px-4 py-2 rounded-md text-theme font-bold text-lg'>Save</button>
     <button onClick={handlePrint} className='cursor-pointer bg-themeYellow px-4 py-2 rounded-md text-theme font-bold text-lg'>Print</button>
     </div>
        
    </div>
  )
}

export default Certificate
