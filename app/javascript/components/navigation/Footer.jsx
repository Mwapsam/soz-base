import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className="bg-black w-full py-8">
        <div className="max-w-screen-xl px-4 mx-auto">
            <ul className="flex flex-wrap justify-between max-w-screen-md mx-auto text-lg font-light">
            <li className="my-2">
                <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                FAQ
                </a>
            </li>
            <li className="my-2">
                <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                Configuration
                </a>
            </li>
            <li className="my-2">
                <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                Github
                </a>
            </li>
            <li className="my-2">
                <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                LinkedIn
                </a>
            </li>
            </ul>
        </div>
        </footer>
    </>
  )
}

export default Footer