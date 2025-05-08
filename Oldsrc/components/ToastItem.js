import React, {useEffect, useRef, memo} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
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
  loading: {
    bg: '#F5F5F5',
    color: '#666',
    icon: null, // Will use ActivityIndicator
  },
  close: {
    icon: 'https://fonts.gstatic.com/s/i/materialicons/close/v6/24px.svg',
  },
};

/**
 * Get entering animation based on type and position
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
    default:
      return SlideInRight.springify().damping(15);
  }
};

/**
 * Get exiting animation based on type and position
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
 */
const ToastItem = memo(
  ({
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
    swipeEnabled = false,
    swipeDirection,
    progressBar = false,
    icon: customIcon,
    hideCloseButton = false,
    textStyle = {},
    titleStyle = {},
    messageStyle = {},
    colors: customColors,
    isLoading = false,
    icon,
    ...customProps
  }) => {
    // Merge default colors with custom colors
    const colors = customColors
      ? {...DEFAULT_COLORS[type], ...customColors}
      : DEFAULT_COLORS[type];

    // Animation values
    const progress = useSharedValue(1);
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    // For native Animated swipe
    const pan = useRef(new RNAnimated.ValueXY()).current;
    const panResponderEnabled = useRef(true);

    // Default swipe direction based on position
    const defaultSwipeDirection = position === 'top' ? 'down' : 'up';
    const actualSwipeDirection = swipeDirection || defaultSwipeDirection;

    // Setup pan responder for swipe to dismiss (only if enabled)
    const panResponder = useRef(
      swipeEnabled
        ? PanResponder.create({
            onStartShouldSetPanResponder: () => panResponderEnabled.current,
            onMoveShouldSetPanResponder: (_, gestureState) => {
              const {dx, dy} = gestureState;
              if (!panResponderEnabled.current) return false;

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
              pan.setOffset({
                x: pan.x._value,
                y: pan.y._value,
              });
              pan.setValue({x: 0, y: 0});
            },
            onPanResponderMove: (_, gestureState) => {
              const {dx, dy} = gestureState;

              if (
                actualSwipeDirection === 'horizontal' ||
                actualSwipeDirection === 'right'
              ) {
                pan.x.setValue(Math.max(0, dx));
                pan.y.setValue(0);
              } else if (actualSwipeDirection === 'up') {
                pan.x.setValue(0);
                pan.y.setValue(Math.min(0, dy));
              } else if (actualSwipeDirection === 'down') {
                pan.x.setValue(0);
                pan.y.setValue(Math.max(0, dy));
              }
            },
            onPanResponderRelease: (_, gestureState) => {
              const {dx, dy} = gestureState;
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
                RNAnimated.spring(pan, {
                  toValue: {x: 0, y: 0},
                  friction: 5,
                  useNativeDriver: true,
                }).start();
              }
            },
          })
        : null,
    ).current;

    useEffect(() => {
      if (progressBar && !isLoading && timeout) {
        // Animated progress bar (only if enabled and not loading)
        progress.value = withTiming(
          0,
          {
            duration: timeout,
            easing: Animated.Easing.linear,
          },
          finished => {
            if (finished) {
              runOnJS(startDismissAnimation)();
            }
          },
        );
      }

      // Initial entrance animation
      scale.value = withSequence(
        withTiming(1.03, {duration: 150}),
        withTiming(1, {duration: 150}),
      );
    }, [progressBar, isLoading, timeout]);

    // Function to start dismiss animation
    const startDismissAnimation = () => {
      panResponderEnabled.current = false;
      scale.value = withTiming(0.95, {duration: 100});
      opacity.value = withTiming(
        0,
        {
          duration: 300,
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

    // Set up the native animated transform styles for swipe
    const panStyle = swipeEnabled
      ? {
          transform: [...pan.getTranslateTransform()],
        }
      : {};

    // If custom render function is provided, use it instead of default
    if (renderCustomToast) {
      return (
        <View
          style={[panStyle]}
          {...(swipeEnabled ? panResponder.panHandlers : {})}>
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
              isLoading,
              ...customProps,
            })}

            {progressBar && !isLoading && (
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
        </View>
      );
    }

    // Default toast render
    return (
      <View
        style={[panStyle]}
        {...(swipeEnabled ? panResponder.panHandlers : {})}>
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
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={colors.color}
                style={styles.icon}
              />
            ) : icon ? (
              <Image
                source={{uri: customIcon || colors.icon}}
                style={[styles.icon, {tintColor: colors.color}]}
                resizeMode="contain"
              />
            ) : null}

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

            {!hideCloseButton && !isLoading && (
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

          {progressBar && !isLoading && (
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
      </View>
    );
  },
);

ToastItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning', 'loading']),
  timeout: PropTypes.number,
  position: PropTypes.oneOf(['top', 'bottom']),
  onDismiss: PropTypes.func.isRequired,
  onPress: PropTypes.func,
  renderCustomToast: PropTypes.func,
  style: PropTypes.object,
  animationType: PropTypes.oneOf(['slide', 'fade', 'bounce', 'zoom']),
  swipeEnabled: PropTypes.bool,
  swipeDirection: PropTypes.oneOf(['horizontal', 'up', 'down', 'right']),
  progressBar: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideCloseButton: PropTypes.bool,
  textStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  messageStyle: PropTypes.object,
  colors: PropTypes.object,
  isLoading: PropTypes.bool,
};

ToastItem.defaultProps = {
  type: 'info',
  position: 'top',
  animationType: 'slide',
  swipeEnabled: false,
  progressBar: false,
  hideCloseButton: false,
  isLoading: false,
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

export default ToastItem;
