import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className=" mt-20">
  <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      
      <Image src="/hero-img.svg" alt='' width={100} height={100} />

      <p className="mt-4 text-center  text-theme lg:mt-0 lg:text-right">
        Copyright &copy; <span>{new Date().getFullYear()}</span>. All rights reserved BY <span className='font-bold'>AEM.DEV.</span> 
      </p>
    </div>
  </div>
</footer>
  )
}

export default Footer
