// import React, {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   useRef,
// } from 'react';
// import {View, StyleSheet, Dimensions, Platform} from 'react-native';
// import ToastItem from './ToastItem'; // Import our enhanced ToastItem

// const ToastContext = createContext();

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const MAX_TOASTS = 3; // Maximum number of visible toasts at once

// export const ToastProvider = ({children}) => {
//   const [toasts, setToasts] = useState([]);
//   const toastQueue = useRef([]);
//   const isProcessingQueue = useRef(false);

//   // Process queue when a toast is dismissed or when queue changes
//   const processQueue = useCallback(() => {
//     if (isProcessingQueue.current || toastQueue.current.length === 0) {
//       return;
//     }

//     isProcessingQueue.current = true;

//     // If we can add more toasts, add from queue
//     if (toasts.length < MAX_TOASTS) {
//       const nextToast = toastQueue.current.shift();
//       setToasts(prev => [...prev, nextToast]);
//     }

//     isProcessingQueue.current = false;
//   }, [toasts.length]);

//   // Show a toast
//   const show = useCallback(
//     ({
//       title,
//       message,
//       type = 'info',
//       timeout = 4000,
//       position = 'top', // 'top' or 'bottom'
//     }) => {
//       const id =
//         Date.now().toString() + Math.random().toString(36).substr(2, 5);
//       const newToast = {id, title, message, type, timeout, position};

//       // If we can show immediately
//       if (toasts.length < MAX_TOASTS) {
//         setToasts(prev => [...prev, newToast]);
//       } else {
//         // Otherwise queue it
//         toastQueue.current.push(newToast);
//       }

//       // Auto-dismiss after timeout
//       if (timeout) {
//         setTimeout(() => hide(id), timeout + 500); // Additional 500ms for exit animation
//       }

//       return id; // Return ID so toast can be dismissed programmatically
//     },
//     [toasts.length],
//   );

//   // Hide a toast
//   const hide = useCallback(
//     id => {
//       setToasts(prev => {
//         const newToasts = prev.filter(toast => toast.id !== id);

//         // If we removed a toast, process queue to see if we can show more
//         if (newToasts.length < prev.length) {
//           setTimeout(processQueue, 300); // Small delay to allow animation to complete
//         }

//         return newToasts;
//       });
//     },
//     [processQueue],
//   );

//   // Utility method to hide all toasts
//   const hideAll = useCallback(() => {
//     setToasts([]);
//     toastQueue.current = [];
//   }, []);

//   // Object with all toast methods
//   const toastMethods = {
//     show,
//     hide,
//     hideAll,
//     success: (title, message, options = {}) =>
//       show({title, message, type: 'success', ...options}),
//     error: (title, message, options = {}) =>
//       show({title, message, type: 'error', ...options}),
//     info: (title, message, options = {}) =>
//       show({title, message, type: 'info', ...options}),
//     warning: (title, message, options = {}) =>
//       show({title, message, type: 'warning', ...options}),
//   };

//   // Group toasts by position
//   const topToasts = toasts.filter(toast => toast.position !== 'bottom');
//   const bottomToasts = toasts.filter(toast => toast.position === 'bottom');

//   return (
//     <ToastContext.Provider value={toastMethods}>
//       {children}

//       {/* Top toasts container */}
//       <View style={styles.topContainer}>
//         {topToasts.map(toast => (
//           <ToastItem
//             key={toast.id}
//             {...toast}
//             onDismiss={() => hide(toast.id)}
//           />
//         ))}
//       </View>

//       {/* Bottom toasts container */}
//       <View style={styles.bottomContainer}>
//         {bottomToasts.map(toast => (
//           <ToastItem
//             key={toast.id}
//             {...toast}
//             onDismiss={() => hide(toast.id)}
//           />
//         ))}
//       </View>
//     </ToastContext.Provider>
//   );
// };

// export const useToast = () => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error('useToast must be used inside a ToastProvider');
//   }
//   return context;
// };

// const styles = StyleSheet.create({
//   topContainer: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 50 : 25,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     zIndex: 999,
//     paddingHorizontal: 10,
//   },
//   bottomContainer: {
//     position: 'absolute',
//     bottom: Platform.OS === 'ios' ? 50 : 25,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     zIndex: 999,
//     paddingHorizontal: 10,
//   },
// });

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import ToastItem from './ToastItem';

// Create context for toast functionality
const ToastContext = createContext();

// Screen dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// Default configurations
const DEFAULT_CONFIG = {
  maxToasts: 3,
  offsetTop: Platform.OS === 'ios' ? 50 : 25,
  offsetBottom: Platform.OS === 'ios' ? 50 : 25,
  animationType: 'slide', // 'slide', 'fade', 'bounce', 'zoom'
  swipeEnabled: true,
  containerStyle: {},
  backdropOpacity: 0, // Set > 0 to show backdrop behind toasts
};

/**
 * Toast Provider Component
 *
 * @param {Object} props - Provider props
 * @param {React.ReactNode} props.children - Child components
 * @param {Object} props.config - Global toast configuration
 */
export const ToastProvider = ({children, config = {}}) => {
  // Merge default config with user config
  const toastConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  // State for active toasts
  const [toasts, setToasts] = useState([]);

  // Queue for pending toasts
  const toastQueue = useRef([]);
  const isProcessingQueue = useRef(false);

  // Process queue when a toast is dismissed or when queue changes
  const processQueue = useCallback(() => {
    if (isProcessingQueue.current || toastQueue.current.length === 0) {
      return;
    }

    isProcessingQueue.current = true;

    // If we can add more toasts, add from queue
    if (toasts.length < toastConfig.maxToasts) {
      const nextToast = toastQueue.current.shift();
      setToasts(prev => [...prev, nextToast]);
    }

    isProcessingQueue.current = false;
  }, [toasts.length, toastConfig.maxToasts]);

  /**
   * Show a toast notification
   *
   * @param {Object} options - Toast options
   * @returns {string} Toast ID
   */
  const show = useCallback(
    ({
      title,
      message,
      type = 'info',
      timeout = 4000,
      position = 'top',
      animationType,
      onPress,
      onDismiss: onDismissCallback,
      renderCustomToast,
      style = {},
      swipeEnabled,
      swipeDirection,
      progressBar = true,
      icon,
      hideCloseButton = false,
      ...customProps
    }) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 5);

      const newToast = {
        id,
        title,
        message,
        type,
        timeout,
        position,
        animationType: animationType || toastConfig.animationType,
        onPress,
        onDismissCallback,
        renderCustomToast,
        style,
        swipeEnabled:
          swipeEnabled !== undefined ? swipeEnabled : toastConfig.swipeEnabled,
        swipeDirection,
        progressBar,
        icon,
        hideCloseButton,
        ...customProps,
      };

      // If we can show immediately
      if (toasts.length < toastConfig.maxToasts) {
        setToasts(prev => [...prev, newToast]);
      } else {
        // Otherwise queue it
        toastQueue.current.push(newToast);
      }

      // Auto-dismiss after timeout
      if (timeout) {
        setTimeout(() => hide(id), timeout + 500); // Additional 500ms for exit animation
      }

      return id; // Return ID so toast can be dismissed programmatically
    },
    [toasts.length, toastConfig],
  );

  /**
   * Hide a specific toast by ID
   *
   * @param {string} id - Toast ID to hide
   */
  const hide = useCallback(
    id => {
      setToasts(prev => {
        // Find toast to trigger its onDismissCallback if exists
        const toast = prev.find(toast => toast.id === id);
        if (toast && toast.onDismissCallback) {
          toast.onDismissCallback(id);
        }

        const newToasts = prev.filter(toast => toast.id !== id);

        // If we removed a toast, process queue to see if we can show more
        if (newToasts.length < prev.length) {
          setTimeout(processQueue, 300); // Small delay to allow animation to complete
        }

        return newToasts;
      });
    },
    [processQueue],
  );

  /**
   * Hide all toasts at once
   */
  const hideAll = useCallback(() => {
    setToasts([]);
    toastQueue.current = [];
  }, []);

  /**
   * Update an existing toast's content
   *
   * @param {string} id - Toast ID to update
   * @param {Object} newProps - New properties to apply
   */
  const update = useCallback((id, newProps) => {
    setToasts(prev =>
      prev.map(toast => (toast.id === id ? {...toast, ...newProps} : toast)),
    );
  }, []);

  // Convenience methods for different toast types
  const success = useCallback(
    (title, message, options = {}) =>
      show({title, message, type: 'success', ...options}),
    [show],
  );

  const error = useCallback(
    (title, message, options = {}) =>
      show({title, message, type: 'error', ...options}),
    [show],
  );

  const info = useCallback(
    (title, message, options = {}) =>
      show({title, message, type: 'info', ...options}),
    [show],
  );

  const warning = useCallback(
    (title, message, options = {}) =>
      show({title, message, type: 'warning', ...options}),
    [show],
  );

  // Object with all toast methods
  const toastMethods = {
    show,
    hide,
    hideAll,
    update,
    success,
    error,
    info,
    warning,
  };

  // Group toasts by position
  const topToasts = toasts.filter(toast => toast.position !== 'bottom');
  const bottomToasts = toasts.filter(toast => toast.position === 'bottom');

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}

      {/* Optional backdrop - visible when backdropOpacity > 0 */}
      {toasts.length > 0 && toastConfig.backdropOpacity > 0 && (
        <View
          style={[styles.backdrop, {opacity: toastConfig.backdropOpacity}]}
          pointerEvents="none"
        />
      )}

      {/* Top toasts container */}
      <View
        style={[
          styles.topContainer,
          {top: toastConfig.offsetTop},
          toastConfig.containerStyle,
        ]}
        pointerEvents="box-none">
        {topToasts.map(toast => (
          <ToastItem
            key={toast.id}
            {...toast}
            onDismiss={() => hide(toast.id)}
          />
        ))}
      </View>

      {/* Bottom toasts container */}
      <View
        style={[
          styles.bottomContainer,
          {bottom: toastConfig.offsetBottom},
          toastConfig.containerStyle,
        ]}
        pointerEvents="box-none">
        {bottomToasts.map(toast => (
          <ToastItem
            key={toast.id}
            {...toast}
            onDismiss={() => hide(toast.id)}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

/**
 * Custom hook to use the toast functionality
 *
 * @returns {Object} Toast methods
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside a ToastProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
    paddingHorizontal: 10,
    pointerEvents: 'box-none',
  },
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
    paddingHorizontal: 10,
    pointerEvents: 'box-none',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 998,
  },
});
