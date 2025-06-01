import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <p className="text-sm">
            Created by{' '}
            <a
              href="https://github.com/Simone-Fratini"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              sfrat
            </a>
            {' '}for entertainment
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer