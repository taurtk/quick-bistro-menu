
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative px-2">
          <ShoppingCart className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-bistro-secondary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Order</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col h-[calc(100vh-10rem)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Add items from the menu to get started</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 py-3 border-b">
                    <div className="h-16 w-16 bg-muted rounded-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-bistro-primary font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Tax (10%)</span>
                  <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold mb-6">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
