import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className=" mt-20 boreder-t-1 bg-white">
  <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8  ">
    <div className="flex flex-col  items-center md:flex-row justify-between">
      
      <Image src="/preview123.png" alt='' width={100} height={100} />

      <p className="mt-4 text-center  text-theme lg:mt-0 lg:text-right">
        Copyright &copy; <span>{new Date().getFullYear()}</span>. All rights reserved BY <span className='font-bold text-themeYellow'>AEM.DEV.</span> 
      </p>
    </div>
  </div>
</footer>
  )
}

export default Footer
