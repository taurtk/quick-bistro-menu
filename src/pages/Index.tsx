
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MenuCategoryTabs from '@/components/MenuCategory';
import MenuList from '@/components/MenuList';
import ItemDetail from '@/components/ItemDetail';
import { categories } from '@/data/menuData';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('popular');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchTerm('');
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleCloseItemDetail = () => {
    setSelectedItemId(null);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      setActiveCategory('');
    } else {
      setActiveCategory('popular');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bistro-light">
        <div className="w-24 h-24 bg-bistro-primary rounded-full flex items-center justify-center mb-6 animate-pulse">
          <span className="text-white text-3xl font-bold">QB</span>
        </div>
        <h1 className="text-2xl font-bold text-bistro-primary mb-2">Quick Bistro</h1>
        <p className="text-bistro-dark">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <Header onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 max-w-xl animate-fade-in">
        <MenuCategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={handleSelectCategory} 
        />
        
        <MenuList 
          categoryId={activeCategory || 'popular'} 
          onSelectItem={handleSelectItem}
          searchTerm={searchTerm} 
        />
      </main>
      
      {selectedItemId && (
        <ItemDetail 
          itemId={selectedItemId} 
          onClose={handleCloseItemDetail} 
        />
      )}
      
      <footer className="text-center text-xs text-muted-foreground mt-8">
        Powered by Quick Bistro Menu • © 2025
      </footer>
    </div>
  );
};

export default Index;
