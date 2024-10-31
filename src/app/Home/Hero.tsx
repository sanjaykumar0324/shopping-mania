import { BASE_URL } from '@/redux/store';
import React from 'react';

interface Category {
  _id: string;
  name: string;
  menu?: string[];
}

const Hero = async () => {
  const res = await fetch(`${BASE_URL}/api/category`, {
    method: 'GET',
    cache: 'no-store', 
  });

  const data = await res.json();

  if (!data.success) {
    return <div>Failed to load categories</div>;
  }

  const categories: Category[] = data.categories;

  return (
    <div>
      <ul className='flex flex-col gap-2'>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Hero;
