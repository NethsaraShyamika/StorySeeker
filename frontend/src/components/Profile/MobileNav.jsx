import React from 'react'
import {Link} from "react-router-dom"

const MobileNav = () => {
  return (
    <div className='w-full flex items-center justify-between my-8 lg:hidden md:hidden'>
        <Link
          to="/profile"
          className="w-full text-center py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 font-medium"
        >
          Favourites
        </Link>

        <Link
          to="/profile/order-history"
          className="w-full text-center py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 font-medium"
        >
          Order History
        </Link>

        <Link
          to="/profile/settings"
          className="w-full text-center py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 font-medium"
        >
          Settings
        </Link>
    </div>
  )
}

export default MobileNav