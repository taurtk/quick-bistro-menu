
import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '@/data/menuData';
import { Heart, ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';

interface MenuItemProps {
  item: MenuItemType;
  onClick: (itemId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Use the cart context to add the item
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} added to your order`,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${item.name} ${isFavorite ? "removed from" : "added to"} your favorites`,
    });
  };

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
          <div className="flex items-center gap-2">
            <button 
              className={`text-muted-foreground ${isFavorite ? 'text-red-500' : 'hover:text-red-500'} transition-colors`}
              onClick={handleToggleFavorite}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button 
              className="bg-bistro-primary text-white p-1 rounded-full hover:bg-bistro-primary/90 transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
