"use client"; // Make this a client component
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use this for route detection
import { LOGO, SEARCH_ICON } from '../utils/constants'; // Adjust the path as needed
import { headerData, headerIconData } from './headerData';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const pathname = usePathname(); // Get current pathname

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    alert(`Search clicked for: ${search}`);
  };

  return (
    <div className="border border-b-gray-300">
      <div className="container mx-auto flex justify-between items-center py-4">
        <h1 className='text-3xl'>Shopping Mania</h1>
        <ul className="list-none flex gap-10">
          {headerData.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>
                <span className={`cursor-pointer ${pathname === item.path ? 'border border-b-gray-400 pb-1 border-b-2 border-l-0 border-r-0 border-t-0' : ''}`}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-10'>
          <div className="border border-gray-200 px-4 py-1 rounded-sm flex items-center gap-3">
            <input
              type="text"
              placeholder="What are you looking for?"
              onChange={handleChange}
              className="text-sm focus:outline-none"
            />
            <button onClick={handleSearch}>
              <SEARCH_ICON />
            </button>
          </div>
          <ul className="flex gap-6">
            {headerIconData.map((item) => (
              <li key={item.id} className="text-2xl">
                <Link href={item.path}>
                  <item.icon />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
