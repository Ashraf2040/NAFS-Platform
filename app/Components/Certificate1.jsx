import React from 'react'
import "../Components/certificate.css"
import Image from 'next/image'

const Certificate1 = () => {
  return (
    <div className=''>
        <div className=' relative h-[400px] w-[560px]'>
        <Image src="/certificate.png" alt="certificate" width={600} height={600} />
        <div className='absolute top-0 left-0 h-full w-full box-border '>
<h1>Ashraf Elsayed Mahmoud</h1>
        </div>

        </div>
     
    </div>
  )
}

export default Certificate1
