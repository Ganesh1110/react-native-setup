import React, {createContext, useContext, useState, useRef} from 'react';
import Toast from './Toast';

const ToastContext = createContext();

export const ToastProvider = ({children}) => {
  const [toastConfig, setToastConfig] = useState(null);
  const timerRef = useRef(null);

  const show = config => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToastConfig({...config, visible: true});

    timerRef.current = setTimeout(() => {
      setToastConfig(prev => ({...prev, visible: false}));
    }, config.duration || 3000);
  };

  const hide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToastConfig(prev => ({...prev, visible: false}));
  };

  return (
    <ToastContext.Provider value={{show, hide}}>
      {children}
      {toastConfig && <Toast {...toastConfig} />}
    </ToastContext.Provider>
  );
};

// custom hooks
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const useToast = () => {
  const {show, hide} = useToastContext();
  return {show, hide};
};
