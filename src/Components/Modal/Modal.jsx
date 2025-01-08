import React from 'react'

const Modal = () => {
  return (
    <div
      id="modal"
      class="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-0 flex items-center justify-center"
    >
      <div class="bg-transparent rounded-lg shadow-lg max-w-[60%] m-auto w-full">
        <div class="flex justify-between items-center p-4 text-gray-700 font-bold">
         <h3 className='text-[22px]'>Draw Date: 7/1/2025</h3>
         <h3 className='text-[22px]'>Draw Time: 16.30 P.M</h3>
        </div>
    
        <div class="mt-36 p-4 text-gray-700 font-bold text-center">
          <p className='text-[22px]'>PXWELL DAY LIVE DRAW</p>
          <p className='text-[22px]'>SINGAPORE LOTTERY</p>
        </div>
    
        
      </div>
    </div>
    
  )
}

export default Modal
