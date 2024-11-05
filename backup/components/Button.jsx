import React from 'react'

const Button = ({ buttonText }) => {
  return (
    <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
    {buttonText}
    </button>
  )
}

export default Button