import React, {createContext, useContext, useEffect, useState} from 'react';
import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const MetricsContext = createContext(null);

const getDeviceInfo = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = screenWidth * pixelDensity;
  const adjustedHeight = screenHeight * pixelDensity;

  const isTablet =
    (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) ||
    (pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)) ||
    Platform.isPad;

  const isIphoneWithNotch = Platform.OS === 'ios' && DeviceInfo.hasNotch();

  const getStandardLength = () => Math.max(screenWidth, screenHeight);

  const calculateDeviceHeight = () => {
    const standardLength = getStandardLength();
    const offset =
      Platform.OS === 'ios'
        ? screenHeight > screenWidth
          ? 78
          : 0
        : StatusBar.currentHeight || 0;

    return standardLength - offset;
  };

  const responsiveFontSize = (fontSize, standardScreenHeight = 812) => {
    const calculatedFontSize = isTablet ? fontSize + 2 : fontSize;
    const baseScreenWidth = 375;
    const smallerDimension = Math.min(screenWidth, screenHeight);
    const deviceHeight = calculateDeviceHeight();
    const heightPercent =
      (calculatedFontSize * deviceHeight) / standardScreenHeight;

    return isTablet || Platform.isPad || screenWidth > 500
      ? Number(heightPercent.toFixed(2))
      : smallerDimension / (baseScreenWidth / calculatedFontSize);
  };

  const responsiveWidth = (size, baseScreenWidth = 375) => {
    return (screenWidth / baseScreenWidth) * size;
  };

  return {
    screenWidth: Math.min(screenWidth, screenHeight),
    screenHeight: Math.max(screenWidth, screenHeight),
    rfv: responsiveFontSize,
    rfh: responsiveWidth,
    isTablet,
    isIphoneWithNotch,
  };
};

export const MetricsProvider = ({children}) => {
  const [metrics, setMetrics] = useState(getDeviceInfo());

  useEffect(() => {
    const onChange = () => {
      setMetrics(getDeviceInfo());
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => subscription?.remove();
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
