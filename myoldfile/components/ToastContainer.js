import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  memo,
} from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import PropTypes from 'prop-types';
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
  swipeEnabled: false, // Disabled by default
  containerStyle: {},
  backdropOpacity: 0, // Set > 0 to show backdrop behind toasts
  defaultPosition: 'top',
  enableQueue: true,
  progressBar: false, // Disabled by default
};

/**
 * Toast Provider Component
 */
export const ToastProvider = memo(({children, config = {}}) => {
  // Merge default config with user config
  const toastConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  // State for active toasts
  const [toasts, setToasts] = useState([]);

  // Queue for pending toasts (only used if enableQueue is true)
  const toastQueue = useRef([]);
  const isProcessingQueue = useRef(false);

  // Process queue when a toast is dismissed or when queue changes
  const processQueue = useCallback(() => {
    if (
      !toastConfig.enableQueue ||
      isProcessingQueue.current ||
      toastQueue.current.length === 0
    ) {
      return;
    }

    isProcessingQueue.current = true;

    // If we can add more toasts, add from queue
    if (toasts.length < toastConfig.maxToasts) {
      const nextToast = toastQueue.current.shift();
      setToasts(prev => [...prev, nextToast]);
    }

    isProcessingQueue.current = false;
  }, [toasts.length, toastConfig.maxToasts, toastConfig.enableQueue]);

  /**
   * Show a toast notification
   */
  const show = useCallback(
    ({
      title,
      message,
      type = 'info',
      timeout = 4000,
      position = toastConfig.defaultPosition,
      animationType = toastConfig.animationType,
      onPress,
      onDismiss: onDismissCallback,
      renderCustomToast,
      style = {},
      swipeEnabled = toastConfig.swipeEnabled,
      swipeDirection,
      progressBar = toastConfig.progressBar,
      icon,
      hideCloseButton = false,
      isLoading = false,
      ...customProps
    }) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 5);

      const newToast = {
        id,
        title,
        message,
        type,
        timeout: isLoading ? null : timeout, // No timeout for loading toasts
        position,
        animationType,
        onPress,
        onDismissCallback,
        renderCustomToast,
        style,
        swipeEnabled,
        swipeDirection,
        progressBar,
        icon,
        hideCloseButton,
        isLoading,
        ...customProps,
      };

      // If we can show immediately
      if (toasts.length < toastConfig.maxToasts) {
        setToasts(prev => [...prev, newToast]);
      } else if (toastConfig.enableQueue) {
        // Otherwise queue it (if queue is enabled)
        toastQueue.current.push(newToast);
      }

      // Auto-dismiss after timeout (if not loading)
      if (timeout && !isLoading) {
        setTimeout(() => hide(id), timeout + 500); // Additional 500ms for exit animation
      }

      return id;
    },
    [toasts.length, toastConfig],
  );

  /**
   * Hide a specific toast by ID
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
        if (newToasts.length < prev.length && toastConfig.enableQueue) {
          setTimeout(processQueue, 300); // Small delay to allow animation to complete
        }

        return newToasts;
      });
    },
    [processQueue, toastConfig.enableQueue],
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

  const loading = useCallback(
    (title, message, options = {}) =>
      show({title, message, type: 'loading', isLoading: true, ...options}),
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
    loading,
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
});

ToastProvider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.shape({
    maxToasts: PropTypes.number,
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    animationType: PropTypes.oneOf(['slide', 'fade', 'bounce', 'zoom']),
    swipeEnabled: PropTypes.bool,
    containerStyle: PropTypes.object,
    backdropOpacity: PropTypes.number,
    defaultPosition: PropTypes.oneOf(['top', 'bottom']),
    enableQueue: PropTypes.bool,
    progressBar: PropTypes.bool,
  }),
};

ToastProvider.defaultProps = {
  config: {},
};

/**
 * Custom hook to use the toast functionality
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
