
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, ArrowLeft, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Save order to history in localStorage
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      const newOrder = {
        id: Date.now().toString(),
        items: cart,
        total: getTotalPrice() * 1.1,
        date: new Date().toISOString(),
        status: 'completed',
        location: { lat: 40.7128, lng: -74.0060 } // Default to NYC coordinates
      };
      
      orderHistory.push(newOrder);
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      
      // Clear cart
      clearCart();
      setIsProcessing(false);
      
      // Show success toast
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed and will be ready shortly.",
      });
      
      // Redirect to order confirmation
      navigate('/order-history');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">Add some items to your cart before checking out</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <Button variant="ghost" className="mb-4" onClick={() => navigate('/')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order before placing it</CardDescription>
          </CardHeader>
          <CardContent>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <span>{item.quantity} x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Tax (10%)</span>
              <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pickup Information</CardTitle>
            <CardDescription>Enter your details for pickup</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="(123) 456-7890" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="pickupTime">Pickup Time</Label>
                <Input id="pickupTime" type="time" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="notes">Special Instructions (Optional)</Label>
                <Input id="notes" placeholder="Any special requests..." />
              </div>
              
              <div className="flex flex-col gap-4 mt-6">
                <Button type="submit" disabled={isProcessing} className="w-full">
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Place Order (${(getTotalPrice() * 1.1).toFixed(2)})
                    </span>
                  )}
                </Button>
                
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
