
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ChevronRight, MapPin, ArrowLeft, Phone } from 'lucide-react';
import { format } from 'date-fns';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleCall = () => {
    // This would typically link to the restaurant's phone number
    window.location.href = "tel:+15551234567";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <Button variant="ghost" className="mb-4" onClick={() => navigate('/')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">No orders yet</h2>
          <p className="mb-6 text-muted-foreground">Place an order to see your history</p>
          <Button onClick={() => navigate('/')}>Browse Menu</Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{order.id.slice(-4)}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(order.date), 'PPP p')}
                    </CardDescription>
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {order.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.quantity} x {item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={handleCall}>
                  <Phone className="h-4 w-4 mr-2" /> Call
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                  <MapPin className="h-4 w-4 mr-2" /> View Location
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Order Location</CardTitle>
              <CardDescription>
                Order #{selectedOrder.id.slice(-4)} pickup location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                ref={mapRef}
                className="h-64 bg-muted rounded-md flex items-center justify-center"
              >
                <div className="text-center p-4">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-bistro-primary" />
                  <p className="font-medium">Quick Bistro</p>
                  <p className="text-sm text-muted-foreground">123 Foodie St, Culinary District</p>
                  <p className="text-sm text-muted-foreground">Open 9:00 AM - 10:00 PM</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
              <Button onClick={handleCall}>
                <Phone className="h-4 w-4 mr-2" /> Call Restaurant
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
