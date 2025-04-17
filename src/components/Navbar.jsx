import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex flex-row gap-10 justify-center py-6 bg-gray-100 shadow-sm">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
            : 'text-gray-600 hover:text-blue-600 transition'
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/Pastes"
        className={({ isActive }) =>
          isActive
            ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
            : 'text-gray-600 hover:text-blue-600 transition'
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
