import React from 'react';
import {Text, useColorScheme} from 'react-native';

// Define your font families
const FONT_FAMILY = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
};

// Define colors for dark and light mode
const COLORS = {
  light: {
    text: '#000000',
  },
  dark: {
    text: '#FFFFFF',
  },
};

const AppText = ({
  children,
  style,
  weight = 'regular',
  color, // optional override
  align, // optional: left, right, center, justify
  numberOfLines,
  isArabic = false, // Pass isArabic prop
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const fontFamily = FONT_FAMILY[weight] || FONT_FAMILY.regular;
  const textColor =
    color || (isDarkMode ? COLORS.dark.text : COLORS.light.text);

  let textAlign;

  if (align) {
    textAlign = align; // If align prop is provided, use it
  } else {
    textAlign = isArabic ? 'right' : 'left'; // Otherwise based on isArabic
  }

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily,
          color: textColor,
          textAlign,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default AppText;
