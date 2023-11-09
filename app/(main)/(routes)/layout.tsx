
import React from 'react'

function MainLayout({ children } : { children: React.ReactNode }) {
  return (
    <div className='max-w-6xl m-auto'>
      {children}
    </div>
  )
}

export default MainLayout