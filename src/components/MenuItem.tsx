
import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '@/data/menuData';
import { Heart, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface MenuItemProps {
  item: MenuItemType;
  onClick: (itemId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onClick }) => {
  const [quantity, setQuantity] = useState(0);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const itemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === item.id);
    
    if (itemIndex > -1) {
      // Update quantity if item exists
      existingCart[itemIndex].quantity = quantity + 1;
    } else {
      // Add new item to cart
      existingCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setQuantity(quantity + 1);
    
    toast({
      title: "Added to cart",
      description: `${item.name} added to your order`,
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
              className="text-muted-foreground hover:text-red-500 transition-colors"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <Heart size={18} />
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
