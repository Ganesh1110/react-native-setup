import React from 'react';
import {View, Text, Button} from 'react-native';
import {useToast} from '../components/ToastContainer'; // correct path!

const ToastScreen = () => {
  const {show} = useToast();

  const showToast = () => {
    show({
      message: 'This is a toast!',
      animation: 'slide', // 'slide' | 'fade' | 'scale'
      position: 'top', // 'top' | 'center' | 'bottom'
      type: 'default', // 'success' | 'error' | 'info' | 'default'
      duration: 3000,
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ToastScreen</Text>
      <Button title="Show Toast" onPress={showToast} />
    </View>
  );
};

export default ToastScreen;
