import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppText from '../components/AppText';

const TestShowCase = () => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Bold Title (LTR)</AppText>

      <AppText weight="medium" color="blue" style={styles.subtitle}>
        Medium Subtitle with Blue Color
      </AppText>

      <AppText weight="regular" style={styles.body}>
        Regular body text (LTR)
      </AppText>

      <AppText isArabic={true} weight="bold" style={styles.arabicTitle}>
        مرحبا بك (Arabic Bold)
      </AppText>

      <AppText isArabic={true} style={styles.arabicBody}>
        هذا نص باللغة العربية ويجب أن يكون محاذاة لليمين
      </AppText>

      <AppText weight="medium" align="center" style={styles.centeredText}>
        Center aligned text
      </AppText>

      <AppText weight="bold" align="justify" style={styles.justifiedText}>
        This is a justified paragraph. The text should spread across the width
        evenly when the line wraps to the next.
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 16,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 18,
  },
  body: {
    fontSize: 16,
  },
  arabicTitle: {
    fontSize: 22,
  },
  arabicBody: {
    fontSize: 16,
  },
  centeredText: {
    fontSize: 18,
  },
  justifiedText: {
    fontSize: 16,
  },
});

export default TestShowCase;
