import React from 'react';
import {Toast as ToastHelper} from './ToastContainer';

export const Toast = {
  show: (text, options) => {
    // You might need to store toasts in a state management solution
    // if you need to use this outside components
    console.warn('Toast.show should be called from a component');
    return ToastHelper.show(text, options);
  },
  hide: id => {
    ToastHelper.hide(id);
  },
};
