import React, {createContext, useState, useRef, useEffect} from 'react';
import {View} from 'react-native';
import Toast from './Toast';

export const ToastContext = createContext();

const ToastProvider = ({children}) => {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef();

  const showToast = (message, type = 'info', duration = 3000) => {
    setToast({message, type});

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      hideToast();
    }, duration);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
      {children}
      {toast && (
        <View
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            alignItems: 'center',
            zIndex: 9999,
          }}>
          <Toast message={toast.message} type={toast.type} />
        </View>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
