import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Toast = ({
  visible,
  message,
  animation = 'slide',
  position = 'bottom',
  type = 'default',
  customRender,
  duration = 3000,
}) => {
  const [dragging, setDragging] = useState(false);
  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  // Handling swipe-to-dismiss
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (!dragging) setDragging(true);
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          animateOut(); // Swipe up to dismiss
        } else {
          resetPosition(); // Reset position if it's not swiped out enough
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (visible) {
      animateIn();
    } else {
      animateOut();
    }
  }, [visible]);

  const animateIn = () => {
    let animations = [];
    if (animation === 'slide') {
      animations.push(
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      );
    } else if (animation === 'fade') {
      animations.push(
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      );
    } else if (animation === 'scale') {
      animations.push(
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      );
    }

    Animated.parallel(animations).start();
  };

  const animateOut = () => {
    let animations = [];
    if (animation === 'slide') {
      animations.push(
        Animated.timing(translateY, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
      );
    } else if (animation === 'fade' || animation === 'scale') {
      animations.push(
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      );
    }

    Animated.parallel(animations).start();
  };

  const resetPosition = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const getPositionStyle = () => {
    if (position === 'top') {
      return {top: 50};
    }
    if (position === 'center') {
      return {top: height / 2 - 40};
    }
    return {bottom: 50};
  };

  const getIcon = () => {
    // If the icon is a URI (starts with http), return it as is
    if (typeof type === 'string' && type.startsWith('http')) {
      return type; // Image URI (URL)
    }

    // Otherwise, return the appropriate static image from assets
    switch (type) {
      case 'success':
        return 'https://icon-library.com/images/success-icon-png/success-icon-png-12.jpg'; // Success icon
      case 'error':
        return 'https://icon-library.com/images/error-icon-png/error-icon-png-5.jpg'; // Error icon
      case 'info':
        return 'https://icon-library.com/images/info-icon-png/info-icon-png-6.jpg'; // Info icon
      default:
        return null; // Return null if no icon type matches
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toastContainer,
        getPositionStyle(),
        {
          opacity: animation === 'fade' || animation === 'scale' ? opacity : 1,
          transform: [
            animation === 'slide'
              ? {translateY}
              : animation === 'scale'
              ? {scale}
              : {translateY: 0},
          ],
        },
      ]}
      {...panResponder.panHandlers}>
      <View style={[styles.toast, getTypeStyle(type)]}>
        {getIcon() && (
          <Image
            source={
              typeof getIcon() === 'string' ? {uri: getIcon()} : getIcon()
            }
            style={styles.icon}
          />
        )}

        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 9999,
    maxWidth: '80%',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    flexShrink: 1,
  },
});

const getTypeStyle = type => {
  switch (type) {
    case 'success':
      return {backgroundColor: 'green'};
    case 'error':
      return {backgroundColor: 'red'};
    case 'info':
      return {backgroundColor: 'blue'};
    default:
      return {backgroundColor: '#333'};
  }
};

export default Toast;
