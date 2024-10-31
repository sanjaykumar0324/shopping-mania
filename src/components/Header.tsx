"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HEADER_MENU, SEARCH_ICON } from '../utils/constants'; 
import { headerData, headerIconData } from './headerData';
import Drawer from './Drawer';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    alert(`Search clicked for: ${search}`);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };

  return (
    <div className="border border-b-gray-300 z-10 relative">
      <div className="container mx-auto px-2 py-4">
        <div className='flex items-center md:flex-row md:justify-between md:items-center gap-2 px-1'>
          <div className='xl:hidden'>
            <button onClick={toggleDrawer}>
              <HEADER_MENU className='text-2xl'/>
            </button>
          </div>

          <h1 className='text-xl lg:text-3xl'>
            <Link href={'/'}>Shopping Mania</Link>
          </h1>

          <div className='hidden xl:block'>
            <ul className="list-none flex gap-10 ">
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
          </div>

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
          
            <ul className="flex gap-6 max-lg:hidden">
              {headerIconData.map((item) => (
                <li key={item.id} className="text-2xl">
                  <Link href={item.path}>
                    <item.icon className={`${pathname === item.path ? 'fill-red-700' : ''}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </div>
  );
};

export default Header;
