
import React from 'react';
import { Phone, MapPin, Clock, Search, ShoppingBag, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Cart from '@/components/Cart';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-bistro-primary text-white p-4 rounded-b-2xl shadow-md mb-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <span className="text-bistro-primary text-xl font-bold">QB</span>
            </div>
            <h1 className="text-xl font-bold">Quick Bistro</h1>
          </div>
          <div className="flex space-x-2">
            <a href="tel:+1234567890" className="text-white hover:text-bistro-secondary">
              <Phone size={20} />
            </a>
            <a href="#location" className="text-white hover:text-bistro-secondary">
              <MapPin size={20} />
            </a>
            <a href="#hours" className="text-white hover:text-bistro-secondary">
              <Clock size={20} />
            </a>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-bistro-secondary"
              onClick={() => navigate('/order-history')}
            >
              <History size={20} />
            </Button>
            <Cart />
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search menu items..." 
            className="pl-10 bg-white/20 border-0 focus:bg-white/30 text-white placeholder:text-white/70 rounded-full"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
