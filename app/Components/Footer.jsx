import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className=" mt-20 boreder-t-1 border-gray-200">
  <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8 border-t-[1px] border-gray-200 ">
    <div className="sm:flex sm:items-center sm:justify-between">
      
      <Image src="/logonew.svg" alt='' width={50} height={50} />

      <p className="mt-4 text-center  text-theme lg:mt-0 lg:text-right">
        Copyright &copy; <span>{new Date().getFullYear()}</span>. All rights reserved BY <span className='font-bold text-themeYellow'>AEM.DEV.</span> 
      </p>
    </div>
  </div>
</footer>
  )
}

export default Footer
