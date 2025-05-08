import React, {createContext, useContext, useEffect, useState} from 'react';
import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const MetricsContext = createContext(null);

const calculateMetrics = () => {
  const {width, height} = Dimensions.get('window');
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;

  const deviceIsTablet =
    Platform.isPad ||
    (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) ||
    (pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920));

  const deviceHasNotch = Platform.OS === 'ios' && DeviceInfo.hasNotch();

  const getMaxDimension = () => Math.max(width, height);

  const getAvailableHeight = () => {
    const maxDimension = getMaxDimension();
    const statusBarHeight =
      Platform.OS === 'ios'
        ? height > width
          ? 78
          : 0
        : StatusBar.currentHeight || 0;
    return maxDimension - statusBarHeight;
  };

  const scaleFont = (fontSize, baseScreenHeight = 812) => {
    const scaledFontSize = deviceIsTablet ? fontSize + 2 : fontSize;
    const smallerSide = Math.min(width, height);
    const availableHeight = getAvailableHeight();
    const heightRatio = (scaledFontSize * availableHeight) / baseScreenHeight;

    return deviceIsTablet || width > 500
      ? Number(heightRatio.toFixed(2))
      : smallerSide / (375 / scaledFontSize); // 375 is iPhone base width
  };

  const scaleSize = (size, baseScreenWidth = 375) => {
    return (width / baseScreenWidth) * size;
  };

  return {
    deviceWidth: Math.min(width, height),
    deviceHeight: Math.max(width, height),
    scaleFont,
    scaleSize,
    deviceIsTablet,
    deviceHasNotch,
  };
};

export const MetricsProvider = ({children}) => {
  const [metrics, setMetrics] = useState(calculateMetrics());

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(calculateMetrics());
    };
    const subscription = Dimensions.addEventListener('change', updateMetrics);

    return () => subscription?.remove?.();
  }, []);

  return (
    <MetricsContext.Provider value={metrics}>
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (!context) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
};
