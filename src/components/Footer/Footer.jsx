import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative py-10 overflow-hidden bg-blue-600 border border-t-2 border-t-black">
            <div className="relative z-10 px-4 mx-auto max-w-7xl">
                <div className="flex flex-wrap -m-6">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex flex-col justify-between h-full">
                            <div className="inline-flex items-center mb-4">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-900">
                                    &copy; Copyright 2023. All Rights Reserved by Ali Hossain Nayan
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">

                            <Link className="text-xs font-semibold text-gray-900 uppercase tracking-px mb-9"
                                to="/">
                            </Link>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <Link className="text-xs font-semibold text-gray-900 uppercase tracking-px mb-9"
                              to="/">
                            </Link>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >

                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <Link className="text-xs font-semibold text-gray-900 uppercase tracking-px mb-9"
                             to="/">
                                {/* Legals */}
                            </Link>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        {/* Licensing */}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer