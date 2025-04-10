
import React from 'react';
import { MenuItem as MenuItemType } from '@/data/menuData';
import { Heart } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  onClick: (itemId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onClick }) => {
  return (
    <div 
      className="menu-card mb-4 cursor-pointer" 
      onClick={() => onClick(item.id)}
    >
      <div className="w-1/3 h-24 md:h-32">
        <img 
          src={item.image} 
          alt={item.name} 
          className="item-image"
        />
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="item-description">{item.description}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="item-price">${item.price.toFixed(2)}</span>
          <button className="text-muted-foreground hover:text-red-500 transition-colors">
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
