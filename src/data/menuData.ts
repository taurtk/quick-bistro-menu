
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  allergens?: string[];
  dietary?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
}

export const categories: MenuCategory[] = [
  { id: "popular", name: "Popular", emoji: "🔥" },
  { id: "starters", name: "Starters", emoji: "🥗" },
  { id: "mains", name: "Main Dishes", emoji: "🍲" },
  { id: "pastas", name: "Pastas", emoji: "🍝" },
  { id: "desserts", name: "Desserts", emoji: "🍰" },
  { id: "drinks", name: "Drinks", emoji: "🍹" },
];

export const menuItems: MenuItem[] = [
  {
    id: "caesar-salad",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, croutons, parmesan cheese, and our special Caesar dressing",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format",
    category: "starters",
    popular: true,
    dietary: ["vegetarian"]
  },
  {
    id: "bruschetta",
    name: "Tomato Bruschetta",
    description: "Toasted baguette slices topped with diced tomatoes, fresh basil, garlic, and olive oil",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&auto=format",
    category: "starters",
    popular: false,
    dietary: ["vegetarian", "vegan"]
  },
  {
    id: "lasagna",
    name: "Beef Lasagna",
    description: "Layers of pasta, rich meat sauce, creamy béchamel, and three cheeses",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&auto=format",
    category: "mains",
    popular: true,
    allergens: ["dairy", "gluten"]
  },
  {
    id: "steak",
    name: "Ribeye Steak",
    description: "Premium 10oz ribeye, grilled to your liking, served with roasted potatoes and seasonal vegetables",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&auto=format",
    category: "mains",
    popular: true
  },
  {
    id: "seafood-pasta",
    name: "Seafood Linguine",
    description: "Linguine pasta with shrimp, mussels, calamari in a white wine garlic sauce",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&auto=format",
    category: "pastas",
    popular: true,
    allergens: ["shellfish", "gluten"]
  },
  {
    id: "carbonara",
    name: "Spaghetti Carbonara",
    description: "Classic carbonara with pancetta, egg, hard cheese, and pepper",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format",
    category: "pastas",
    popular: false,
    allergens: ["dairy", "gluten"]
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    description: "Coffee-soaked ladyfingers layered with mascarpone cream and dusted with cocoa",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format",
    category: "desserts",
    popular: true,
    allergens: ["dairy", "gluten"]
  },
  {
    id: "cheesecake",
    name: "New York Cheesecake",
    description: "Rich and creamy cheesecake with graham cracker crust and seasonal berry topping",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1533134242453-d810d57e0ea3?w=500&auto=format",
    category: "desserts",
    popular: false,
    allergens: ["dairy", "gluten"]
  },
  {
    id: "mojito",
    name: "Classic Mojito",
    description: "Refreshing cocktail with white rum, fresh mint, lime, sugar, and soda water",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format",
    category: "drinks",
    popular: true
  },
  {
    id: "latte",
    name: "Caramel Latte",
    description: "Espresso with steamed milk and caramel syrup, topped with whipped cream",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1593412323862-085165237483?w=500&auto=format",
    category: "drinks",
    popular: false,
    allergens: ["dairy"]
  }
];

export const getItemsByCategory = (categoryId: string) => {
  if (categoryId === "popular") {
    return menuItems.filter(item => item.popular);
  }
  return menuItems.filter(item => item.category === categoryId);
};

export const getItem = (itemId: string) => {
  return menuItems.find(item => item.id === itemId);
};
