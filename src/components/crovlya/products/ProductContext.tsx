'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DATA, Product } from './data';

interface ProductContextType {
  product: Product | null;
  setProduct: (product: Product | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
  initialProductTitle?: string;
}

export const ProductProvider = ({ children, initialProductTitle }: ProductProviderProps) => {
  const initialProduct = initialProductTitle
    ? DATA.find((item) => item.slug === initialProductTitle) || null
    : null;
  const [product, setProduct] = useState<Product | null>(initialProduct);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>{children}</ProductContext.Provider>
  );
};
