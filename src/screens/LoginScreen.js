import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Main')}
        color="blue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: '#000',
  },
});

export default LoginScreen;
