'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SuccessNotification } from './SuccessNotification';

interface NotificationContextType {
  showSuccess: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSuccess = (msg: string) => {
    setMessage(msg);
    setIsVisible(true);
  };

  return (
    <NotificationContext.Provider value={{ showSuccess }}>
      {children}
      <SuccessNotification
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        message={message}
      />
    </NotificationContext.Provider>
  );
};
