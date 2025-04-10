
import React from 'react';
import { getItem } from '@/data/menuData';
import { X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ItemDetailProps {
  itemId: string;
  onClose: () => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ itemId, onClose }) => {
  const item = getItem(itemId);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center animate-fade-in">
      <div className="bg-card w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-xl animate-slide-up">
        <div className="relative h-64">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 rounded-full p-2 text-bistro-dark hover:bg-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <span className="text-2xl font-bold text-bistro-primary">${item.price.toFixed(2)}</span>
          </div>
          
          <p className="text-muted-foreground mb-4">{item.description}</p>
          
          {(item.allergens || item.dietary) && (
            <div className="mb-4">
              {item.allergens && item.allergens.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-sm font-medium mb-1">Allergens:</h3>
                  <div className="flex flex-wrap gap-1">
                    {item.allergens.map(allergen => (
                      <Badge key={allergen} variant="outline" className="bg-red-50 text-red-700 border-red-300">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {item.dietary && item.dietary.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Dietary:</h3>
                  <div className="flex flex-wrap gap-1">
                    {item.dietary.map(diet => (
                      <Badge key={diet} variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        {diet}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button className="flex-1 bg-bistro-primary hover:bg-bistro-primary/90">
              Add to Order
            </Button>
            <Button variant="outline" className="border-bistro-primary text-bistro-primary hover:bg-bistro-primary/10">
              <Heart size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
