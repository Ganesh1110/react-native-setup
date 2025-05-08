import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import {useMetrics} from '../utilities/MetricsContext';
import {IMAGES} from '../utilities/Constants';

const MetricsShowcase = () => {
  const {
    deviceWidth,
    deviceHeight,
    scaleFont,
    scaleSize,
    deviceIsTablet,
    deviceHasNotch,
  } = useMetrics();

  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📱 Device Metrics Overview</Text>

      {/* Device Metrics */}
      <View style={styles.metricsWrapper}>
        <MetricItem
          label="Device Width"
          value={`${deviceWidth.toFixed(2)} px`}
        />
        <MetricItem
          label="Device Height"
          value={`${deviceHeight.toFixed(2)} px`}
        />
        <MetricItem
          label="Is Tablet"
          value={deviceIsTablet ? '✅ Yes' : '❌ No'}
        />
        <MetricItem
          label="Has Notch"
          value={deviceHasNotch ? '✅ Yes' : '❌ No'}
        />
        <MetricItem
          label="scaleFont(24)"
          value={`${scaleFont(24).toFixed(2)} px`}
        />
        <MetricItem
          label="scaleSize(100)"
          value={`${scaleSize(100).toFixed(2)} px`}
        />
      </View>

      {/* Image Preview */}
      <View style={styles.imageSection}>
        <Image
          source={
            imageLoadFailed
              ? IMAGES.defaultImage
              : {
                  uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg',
                }
          }
          style={[
            styles.image,
            {
              width: deviceIsTablet ? scaleSize(200) : scaleSize(150),
              height: deviceIsTablet ? scaleSize(200) : scaleSize(150),
              borderRadius: scaleSize(16),
            },
          ]}
          onError={() => setImageLoadFailed(true)}
          resizeMode="cover"
        />
        <Text style={[styles.previewText, {fontSize: scaleFont(18)}]}>
          Beautiful Scenery 🌄
        </Text>
      </View>

      {/* Bottom Text */}
      <View style={styles.footer}>
        <Text style={[styles.previewText, {fontSize: scaleFont(20)}]}>
          This text uses scaleFont(20) ✨
        </Text>
      </View>
    </ScrollView>
  );
};

const MetricItem = ({label, value}) => (
  <View style={styles.metricBox}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f7f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
  },
  metricsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricBox: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6,
    color: '#111',
  },
  imageSection: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 16,
  },
  previewText: {
    fontWeight: '600',
    color: '#4A90E2',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
});

export default MetricsShowcase;
