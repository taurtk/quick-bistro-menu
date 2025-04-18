
import React from 'react';
import { MenuCategory } from '@/data/menuData';

interface MenuCategoryTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const MenuCategoryTabs: React.FC<MenuCategoryTabsProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="overflow-x-auto pb-2 mb-6">
      <div className="flex space-x-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`category-badge whitespace-nowrap transition-all duration-200 ${
              activeCategory === category.id 
                ? 'bg-bistro-secondary text-white scale-105 shadow-md' 
                : 'hover:bg-bistro-accent/80'
            }`}
          >
            <span className="mr-1">{category.emoji}</span> {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryTabs;
