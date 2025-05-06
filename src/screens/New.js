import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import React from 'react';
import {useMetrics} from '../utilities/MetricsContext'; // Adjust the path if needed

const MetricsShowcase = () => {
  const {screenWidth, screenHeight, rfv, rfh, isTablet, isIphoneWithNotch} =
    useMetrics();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📱 Device Metrics Showcase</Text>

      {/* Device Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.metricBox}>
          <Text style={styles.label}>Screen Width:</Text>
          <Text style={styles.value}>{screenWidth.toFixed(2)} px</Text>
        </View>

        <View style={styles.metricBox}>
          <Text style={styles.label}>Screen Height:</Text>
          <Text style={styles.value}>{screenHeight.toFixed(2)} px</Text>
        </View>

        <View style={styles.metricBox}>
          <Text style={styles.label}>Is Tablet:</Text>
          <Text style={styles.value}>{isTablet ? '✅ Yes' : '❌ No'}</Text>
        </View>

        <View style={styles.metricBox}>
          <Text style={styles.label}>Has Notch:</Text>
          <Text style={styles.value}>
            {isIphoneWithNotch ? '✅ Yes' : '❌ No'}
          </Text>
        </View>

        <View style={styles.metricBox}>
          <Text style={styles.label}>Responsive Font Size (24):</Text>
          <Text style={[styles.value, {fontSize: rfv(24)}]}>
            {rfv(24).toFixed(2)} px
          </Text>
        </View>

        <View style={styles.metricBox}>
          <Text style={styles.label}>Responsive Width (100):</Text>
          <Text style={styles.value}>{rfh(100).toFixed(2)} px</Text>
        </View>
      </View>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg',
          }}
          style={[
            styles.image,
            {
              width: isTablet ? rfh(200) : rfh(150),
              height: isTablet ? rfh(200) : rfh(150),
              borderRadius: rfh(16),
            },
          ]}
          resizeMode="cover"
        />
        <Text style={[styles.previewText, {fontSize: rfv(18)}]}>
          Cute Kitten 🐱 (responsive image)
        </Text>
      </View>

      {/* Bottom Text */}
      <View style={styles.bottomTextContainer}>
        <Text style={[styles.previewText, {fontSize: rfv(20)}]}>
          This text uses rfv(20) 📏
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricBox: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 16,
  },
  bottomTextContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  previewText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
});

export default MetricsShowcase;
