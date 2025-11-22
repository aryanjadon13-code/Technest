import React from 'react'

function Button({text , className}) {
  return (
    <button className={`hover:bg-blue-500 bg-white outline-3 outline-blue-500 rounded-lg px-4 py-2 text-black cursor-pointer ${className}`}>{text}</button>
  )
}

export default Button