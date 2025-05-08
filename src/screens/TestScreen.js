import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TestScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Test Screen Visible?</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default TestScreen;
