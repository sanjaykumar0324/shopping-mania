import React from 'react';
import Link from 'next/link';
import { headerData, headerIconData } from './headerData';
import { CLOSE_ICON } from '@/utils/constants';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-transform transform ${
          isOpen ? 'translate-x-0 w-[100%] md:w-[35%]' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between pl-8 pr-2 text-2xl'>
          <h2>Menu</h2>
          <button onClick={onClose} className="p-4">
            <CLOSE_ICON className='text-2xl text-red-600' />
          </button>
        </div>
        <div>
          <ul className="p-8 text-lg flex flex-col gap-4">
            {headerData.map((item) => (
              <li key={item.id} onClick={onClose}>
                <Link href={item.path}>
                  <span className={`cursor-pointer`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className='border border-gray-100' />
        <div className='py-4 px-8 lg:hidden'>
          <ul className="flex flex-col gap-10 ">
            {headerIconData.map((item) => (
              <li key={item.id} className="text-lg" onClick={onClose}>
                <Link href={item.path} className='flex gap-2 items-center'>
                  <item.icon /> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
