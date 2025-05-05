// import React, {useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Image,
// } from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withSequence,
//   withSpring,
//   Easing,
//   runOnJS,
//   FadeIn,
//   SlideInRight,
//   SlideOutRight,
//   interpolate,
//   Extrapolate,
// } from 'react-native-reanimated';
// import {memo} from 'react';

// const SCREEN_WIDTH = Dimensions.get('window').width;

// const COLORS = {
//   success: {
//     bg: '#E6F4EA',
//     color: '#2E7D32',
//     icon: 'https://fonts.gstatic.com/s/i/materialicons/check_circle/v6/24px.svg',
//   },
//   error: {
//     bg: '#FDECEA',
//     color: '#D32F2F',
//     icon: 'https://fonts.gstatic.com/s/i/materialicons/error/v6/24px.svg',
//   },
//   info: {
//     bg: '#E8F0FE',
//     color: '#1976D2',
//     icon: 'https://fonts.gstatic.com/s/i/materialicons/info/v6/24px.svg',
//   },
//   warning: {
//     bg: '#FFF4E5',
//     color: '#ED6C02',
//     icon: 'https://fonts.gstatic.com/s/i/materialicons/warning/v6/24px.svg',
//   },
//   close: {
//     icon: 'https://fonts.gstatic.com/s/i/materialicons/close/v6/24px.svg',
//   },
// };

// const ToastItem = ({title, message, type, onDismiss, timeout = 4000}) => {
//   const {bg, color, icon} = COLORS[type] || COLORS.info;

//   const progress = useSharedValue(1);
//   const scale = useSharedValue(1);
//   const opacity = useSharedValue(1);

//   useEffect(() => {
//     // Animated progress bar
//     progress.value = withTiming(
//       0,
//       {
//         duration: timeout,
//         easing: Easing.linear,
//       },
//       finished => {
//         if (finished) {
//           // When progress bar finishes, trigger the dismiss animation
//           runOnJS(startDismissAnimation)();
//         }
//       },
//     );

//     // Initial entrance animation
//     scale.value = withSequence(
//       withSpring(1.03, {damping: 12, stiffness: 200}),
//       withSpring(1, {damping: 12, stiffness: 200}),
//     );

//     // Cleanup timeout on unmount
//     return () => {};
//   }, []);

//   const startDismissAnimation = () => {
//     scale.value = withTiming(0.95, {duration: 100});
//     opacity.value = withTiming(
//       0,
//       {
//         duration: 300,
//         easing: Easing.out(Easing.ease),
//       },
//       finished => {
//         if (finished) {
//           runOnJS(onDismiss)();
//         }
//       },
//     );
//   };

//   const handleDismiss = () => {
//     startDismissAnimation();
//   };

//   const progressStyle = useAnimatedStyle(() => ({
//     transform: [{scaleX: progress.value}],
//   }));

//   const toastStyle = useAnimatedStyle(() => ({
//     transform: [{scale: scale.value}],
//     opacity: opacity.value,
//   }));

//   // Pulse animation for the icon
//   const iconScale = useSharedValue(1);

//   useEffect(() => {
//     if (type === 'error' || type === 'warning') {
//       // For error and warning, add attention-grabbing pulse
//       iconScale.value = withSequence(
//         withTiming(1.15, {duration: 200}),
//         withTiming(1, {duration: 200}),
//         withTiming(1.15, {duration: 200}),
//         withTiming(1, {duration: 200}),
//       );
//     }
//   }, [type]);

//   const iconStyle = useAnimatedStyle(() => ({
//     transform: [{scale: iconScale.value}],
//   }));

//   return (
//     <Animated.View
//       entering={SlideInRight.springify().damping(15)} // Enhanced entrance
//       style={[
//         styles.toast,
//         {backgroundColor: bg, borderLeftColor: color},
//         toastStyle,
//       ]}>
//       <Animated.View style={iconStyle}>
//         <Image
//           source={{uri: icon}}
//           style={[styles.icon, {tintColor: color}]}
//           resizeMode="contain"
//         />
//       </Animated.View>

//       <View style={styles.textContainer}>
//         <Text style={[styles.title, {color}]}>{title}</Text>
//         <Text style={styles.message}>{message}</Text>
//       </View>

//       <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
//         <Image
//           source={{uri: COLORS.close.icon}}
//           style={[styles.closeIcon, {tintColor: '#999'}]}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//       <View style={styles.progressBackground}>
//         <Animated.View
//           style={[styles.progressBar, {backgroundColor: color}, progressStyle]}
//         />
//       </View>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   toast: {
//     width: SCREEN_WIDTH * 0.9,
//     minHeight: 70,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     marginVertical: 8,
//     borderLeftWidth: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowOffset: {width: 0, height: 3},
//     shadowRadius: 8,
//     elevation: 5,
//     overflow: 'hidden',
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     marginRight: 12,
//   },
//   closeButton: {
//     padding: 5, // Larger hit area
//   },
//   closeIcon: {
//     width: 20,
//     height: 20,
//   },
//   textContainer: {
//     flex: 1,
//     paddingRight: 8,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   message: {
//     color: '#555',
//     fontSize: 14,
//     marginTop: 2,
//     lineHeight: 18,
//   },
//   progressBackground: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 3,
//     backgroundColor: 'rgba(0,0,0,0.05)',
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#2E7D32',
//     transformOrigin: 'left',
//   },
// });

// export default memo(ToastItem); // Memo for performance

import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Pressable,
  Animated as RNAnimated,
  PanResponder,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  withDelay,
  Easing,
  runOnJS,
  interpolate,
  Extrapolate,
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideInUp,
  SlideInDown,
  SlideOutRight,
  SlideOutUp,
  SlideOutDown,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import {memo} from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

// Default color schemes for different toast types
const DEFAULT_COLORS = {
  success: {
    bg: '#E6F4EA',
    color: '#2E7D32',
    icon: 'https://fonts.gstatic.com/s/i/materialicons/check_circle/v6/24px.svg',
  },
  error: {
    bg: '#FDECEA',
    color: '#D32F2F',
    icon: 'https://fonts.gstatic.com/s/i/materialicons/error/v6/24px.svg',
  },
  info: {
    bg: '#E8F0FE',
    color: '#1976D2',
    icon: 'https://fonts.gstatic.com/s/i/materialicons/info/v6/24px.svg',
  },
  warning: {
    bg: '#FFF4E5',
    color: '#ED6C02',
    icon: 'https://fonts.gstatic.com/s/i/materialicons/warning/v6/24px.svg',
  },
  close: {
    icon: 'https://fonts.gstatic.com/s/i/materialicons/close/v6/24px.svg',
  },
};

/**
 * Get entering animation based on type and position
 * @param {string} animationType - Animation type
 * @param {string} position - Toast position ('top' or 'bottom')
 * @returns {Object} Reanimated entering animation
 */
const getEnteringAnimation = (animationType, position) => {
  switch (animationType) {
    case 'fade':
      return FadeIn.duration(300);
    case 'slide':
      return position === 'bottom'
        ? SlideInUp.springify()
        : SlideInDown.springify();
    case 'zoom':
      return ZoomIn.duration(300);
    // case 'bounce':
    //   return withSequence(
    //     SlideInRight.springify().damping(8).stiffness(100),
    //     withSpring(1, {damping: 8, stiffness: 100}),
    //   );
    default:
      return SlideInRight.springify().damping(15);
  }
};

/**
 * Get exiting animation based on type and position
 * @param {string} animationType - Animation type
 * @param {string} position - Toast position ('top' or 'bottom')
 * @returns {Object} Reanimated exiting animation
 */
const getExitingAnimation = (animationType, position) => {
  switch (animationType) {
    case 'fade':
      return FadeOut.duration(300);
    case 'slide':
      return position === 'bottom'
        ? SlideOutDown.springify()
        : SlideOutUp.springify();
    case 'zoom':
      return ZoomOut.duration(300);
    default:
      return SlideOutRight.duration(300);
  }
};

/**
 * Toast Item Component
 * Renders an individual toast notification with animations and interactions
 */
const ToastItem = ({
  id,
  title,
  message,
  type = 'info',
  timeout = 4000,
  position = 'top',
  onDismiss,
  onPress,
  renderCustomToast,
  style = {},
  animationType = 'slide',
  swipeEnabled = true,
  swipeDirection,
  progressBar = true,
  icon: customIcon,
  hideCloseButton = false,
  textStyle = {},
  titleStyle = {},
  messageStyle = {},
  colors: customColors,
  ...customProps
}) => {
  // Merge default colors with custom colors
  const colors = customColors
    ? {...DEFAULT_COLORS[type], ...customColors}
    : DEFAULT_COLORS[type];

  // Get correct icon
  const icon = customIcon || colors.icon;

  // Animation values
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  // For native Animated swipe
  const pan = useRef(new RNAnimated.ValueXY()).current;
  const panResponderEnabled = useRef(true);

  // Default swipe direction based on position
  const defaultSwipeDirection = position === 'top' ? 'down' : 'up';
  const actualSwipeDirection = swipeDirection || defaultSwipeDirection;

  // Setup pan responder for swipe to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () =>
        swipeEnabled && panResponderEnabled.current,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only handle significant movements
        const {dx, dy} = gestureState;
        if (!swipeEnabled || !panResponderEnabled.current) return false;

        // Determine which direction to check based on swipeDirection
        if (
          actualSwipeDirection === 'horizontal' ||
          actualSwipeDirection === 'right'
        ) {
          return Math.abs(dx) > 10;
        } else if (actualSwipeDirection === 'up') {
          return dy < -10;
        } else if (actualSwipeDirection === 'down') {
          return dy > 10;
        }
        return false;
      },
      onPanResponderGrant: () => {
        // Pause the progress bar when user starts swiping
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (_, gestureState) => {
        // Determine which axis to use based on swipeDirection
        const {dx, dy} = gestureState;

        if (
          actualSwipeDirection === 'horizontal' ||
          actualSwipeDirection === 'right'
        ) {
          // Only allow positive x movement (right swipe)
          pan.x.setValue(Math.max(0, dx));
          pan.y.setValue(0);
        } else if (actualSwipeDirection === 'up') {
          // Only allow negative y movement (up swipe)
          pan.x.setValue(0);
          pan.y.setValue(Math.min(0, dy));
        } else if (actualSwipeDirection === 'down') {
          // Only allow positive y movement (down swipe)
          pan.x.setValue(0);
          pan.y.setValue(Math.max(0, dy));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const {dx, dy} = gestureState;

        // Determine if swipe should dismiss based on direction
        let shouldDismiss = false;

        if (
          actualSwipeDirection === 'horizontal' ||
          actualSwipeDirection === 'right'
        ) {
          shouldDismiss = dx > SWIPE_THRESHOLD;
        } else if (actualSwipeDirection === 'up') {
          shouldDismiss = dy < -SWIPE_THRESHOLD;
        } else if (actualSwipeDirection === 'down') {
          shouldDismiss = dy > SWIPE_THRESHOLD;
        }

        if (shouldDismiss) {
          // Complete the swipe animation
          panResponderEnabled.current = false;

          const animConfig = {
            toValue:
              actualSwipeDirection === 'horizontal' ||
              actualSwipeDirection === 'right'
                ? {x: SCREEN_WIDTH, y: 0}
                : actualSwipeDirection === 'up'
                ? {x: 0, y: -200}
                : {x: 0, y: 200},
            duration: 200,
            useNativeDriver: true,
          };

          RNAnimated.timing(pan, animConfig).start(() => {
            onDismiss();
          });
        } else {
          // Reset position if not dismissed
          RNAnimated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (progressBar) {
      // Animated progress bar
      progress.value = withTiming(
        0,
        {
          duration: timeout,
          easing: Easing.linear,
        },
        finished => {
          if (finished) {
            // When progress bar finishes, trigger the dismiss animation
            runOnJS(startDismissAnimation)();
          }
        },
      );
    }

    // Initial entrance animation
    scale.value = withSequence(
      withTiming(1.03, {duration: 150, easing: Easing.out(Easing.ease)}),
      withTiming(1, {duration: 150, easing: Easing.inOut(Easing.ease)}),
    );
  }, []);

  // Function to start dismiss animation
  const startDismissAnimation = () => {
    panResponderEnabled.current = false;
    scale.value = withTiming(0.95, {duration: 100});
    opacity.value = withTiming(
      0,
      {
        duration: 300,
        easing: Easing.out(Easing.ease),
      },
      finished => {
        if (finished) {
          runOnJS(onDismiss)();
        }
      },
    );
  };

  // Handle manual dismiss
  const handleDismiss = () => {
    startDismissAnimation();
  };

  // Handle press on toast
  const handlePress = () => {
    if (onPress) {
      onPress(id);
    }
  };

  // Animation styles
  const progressStyle = useAnimatedStyle(() => ({
    transform: [{scaleX: progress.value}],
  }));

  const toastStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  // Pulse animation for the icon
  const iconScale = useSharedValue(1);

  useEffect(() => {
    if (type === 'error' || type === 'warning') {
      // For error and warning, add attention-grabbing pulse
      iconScale.value = withSequence(
        withTiming(1.2, {duration: 200}),
        withTiming(1, {duration: 200}),
        withTiming(1.2, {duration: 200}),
        withTiming(1, {duration: 200}),
      );
    }
  }, [type]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{scale: iconScale.value}],
  }));

  // Set up the native animated transform styles for swipe
  const panStyle = {
    transform: [...pan.getTranslateTransform()],
  };

  // If custom render function is provided, use it instead of default
  if (renderCustomToast) {
    return (
      <RNAnimated.View style={[panStyle]} {...panResponder.panHandlers}>
        <Animated.View
          entering={getEnteringAnimation(animationType, position)}
          exiting={getExitingAnimation(animationType, position)}
          style={[toastStyle]}>
          {renderCustomToast({
            id,
            title,
            message,
            type,
            onDismiss: handleDismiss,
            onPress: handlePress,
            ...customProps,
          })}

          {progressBar && (
            <View style={styles.progressBackground}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {backgroundColor: colors.color},
                  progressStyle,
                ]}
              />
            </View>
          )}
        </Animated.View>
      </RNAnimated.View>
    );
  }

  // Default toast render
  return (
    <RNAnimated.View style={[panStyle]} {...panResponder.panHandlers}>
      <Animated.View
        entering={getEnteringAnimation(animationType, position)}
        exiting={getExitingAnimation(animationType, position)}
        style={[
          styles.toast,
          {backgroundColor: colors.bg, borderLeftColor: colors.color},
          toastStyle,
          style,
        ]}>
        <Pressable
          style={styles.contentContainer}
          onPress={handlePress}
          android_ripple={onPress ? {color: 'rgba(0,0,0,0.1)'} : null}>
          {icon && (
            <Animated.View style={iconStyle}>
              <Image
                source={{uri: icon}}
                style={[styles.icon, {tintColor: colors.color}]}
                resizeMode="contain"
              />
            </Animated.View>
          )}

          <View style={styles.textContainer}>
            {title && (
              <Text style={[styles.title, {color: colors.color}, titleStyle]}>
                {title}
              </Text>
            )}
            {message && (
              <Text style={[styles.message, messageStyle]}>{message}</Text>
            )}
          </View>

          {!hideCloseButton && (
            <TouchableOpacity
              onPress={handleDismiss}
              style={styles.closeButton}
              hitSlop={{top: 15, right: 15, bottom: 15, left: 15}}>
              <Image
                source={{uri: DEFAULT_COLORS.close.icon}}
                style={[styles.closeIcon, {tintColor: '#999'}]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </Pressable>

        {progressBar && (
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {backgroundColor: colors.color},
                progressStyle,
              ]}
            />
          </View>
        )}
      </Animated.View>
    </RNAnimated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    width: SCREEN_WIDTH * 0.9,
    minHeight: 70,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginVertical: 8,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  closeButton: {
    padding: 5,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#555',
    fontSize: 14,
    marginTop: 2,
    lineHeight: 18,
  },
  progressBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  progressBar: {
    height: '100%',
    transformOrigin: 'left',
  },
});

export default memo(ToastItem);
