import {COLORS} from './constants';

export const theme = {
  colors: COLORS,
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  text: {
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.dark,
    },
    subheading: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.dark,
    },
    body: {
      fontSize: 14,
      color: COLORS.dark,
    },
  },
  roundness: 8,
};
