import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

const Toast = ({message, type = 'info'}) => {
  const backgroundColor = {
    info: '#3498db',
    success: '#2ecc71',
    error: '#e74c3c',
    warning: '#f39c12',
  }[type];

  return (
    <Animated.View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    color: 'white',
    fontSize: 14,
  },
});

export default Toast;
