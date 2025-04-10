
import React from 'react';
import MenuItem from './MenuItem';
import { getItemsByCategory } from '@/data/menuData';

interface MenuListProps {
  categoryId: string;
  onSelectItem: (itemId: string) => void;
  searchTerm?: string;
}

const MenuList: React.FC<MenuListProps> = ({ categoryId, onSelectItem, searchTerm = '' }) => {
  const items = getItemsByCategory(categoryId);
  
  const filteredItems = searchTerm 
    ? items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    : items;

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No menu items found. Try a different search term or category.
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="category-title">
        {searchTerm ? 'Search Results' : getItemsByCategory(categoryId)[0]?.category.charAt(0).toUpperCase() + getItemsByCategory(categoryId)[0]?.category.slice(1)}
      </h2>
      <div>
        {filteredItems.map((item) => (
          <MenuItem key={item.id} item={item} onClick={onSelectItem} />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
