// import {Text, SafeAreaView, Button, StyleSheet, View} from 'react-native';
// import React from 'react';
// import {ToastProvider, useToast} from '../components/ToastContainer';

// const ToastDemoContent = () => {
//   const {show} = useToast(); // Use the toast hook

//   // Demo functions to show different types of toasts
//   const showSuccessToast = () => {
//     show({
//       title: 'Success',
//       message: 'Your action was completed successfully!',
//       type: 'success',
//       timeout: 4000,
//     });
//   };

//   const showErrorToast = () => {
//     show({
//       title: 'Error',
//       message: 'Something went wrong. Please try again.',
//       type: 'error',
//       timeout: 5000,
//     });
//   };

//   const showInfoToast = () => {
//     show({
//       title: 'Information',
//       message: 'This is an informational message for you.',
//       type: 'info',
//       timeout: 3000,
//     });
//   };

//   const showWarningToast = () => {
//     show({
//       title: 'Warning',
//       message: 'Please be careful with this action.',
//       type: 'warning',
//       timeout: 4500,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.headerText}>Toast Notification Demo</Text>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Show Success Toast"
//           onPress={showSuccessToast}
//           color="#2E7D32"
//         />
//         <View style={styles.buttonSpacer} />
//         <Button
//           title="Show Error Toast"
//           onPress={showErrorToast}
//           color="#D32F2F"
//         />
//         <View style={styles.buttonSpacer} />
//         <Button
//           title="Show Info Toast"
//           onPress={showInfoToast}
//           color="#1976D2"
//         />
//         <View style={styles.buttonSpacer} />
//         <Button
//           title="Show Warning Toast"
//           onPress={showWarningToast}
//           color="#ED6C02"
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const ToastScreen = () => {
//   return (
//     <ToastProvider>
//       <ToastDemoContent />
//     </ToastProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 30,
//   },
//   buttonContainer: {
//     width: '100%',
//   },
//   buttonSpacer: {
//     height: 12,
//   },
// });

// export default ToastScreen;

import {
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {ToastProvider, useToast} from '../components/ToastContainer'; // Import the ToastProvider

// Sample custom toast component
const CustomSuccessToast = ({title, message, onDismiss}) => (
  <View style={styles.customToast}>
    <View style={styles.customToastContent}>
      <Text style={styles.customToastTitle}>{title}</Text>
      <Text style={styles.customToastMessage}>{message}</Text>
    </View>
    <TouchableOpacity onPress={onDismiss} style={styles.customCloseButton}>
      <Text style={styles.customCloseText}>×</Text>
    </TouchableOpacity>
  </View>
);

const ToastDemoContent = () => {
  const {show, success, error, info, warning, hideAll} = useToast();
  const [position, setPosition] = useState('top');
  const [animation, setAnimation] = useState('slide');
  const [customUI, setCustomUI] = useState(false);

  // Toggle position between top and bottom
  const togglePosition = () => {
    setPosition(prev => (prev === 'top' ? 'bottom' : 'top'));
  };

  // Cycle through animation styles
  const cycleAnimation = () => {
    const animations = ['slide', 'fade', 'zoom'];
    const currentIndex = animations.indexOf(animation);
    const nextIndex = (currentIndex + 1) % animations.length;
    setAnimation(animations[nextIndex]);
  };

  // Toggle custom UI
  const toggleCustomUI = () => {
    setCustomUI(prev => !prev);
  };

  // Demo functions to show different types of toasts
  const showSuccessToast = () => {
    if (customUI) {
      show({
        title: 'Success',
        message: 'Your action was completed successfully!',
        type: 'success',
        timeout: 4000,
        position,
        animationType: animation,
        renderCustomToast: ({title, message, onDismiss}) => (
          <CustomSuccessToast
            title={title}
            message={message}
            onDismiss={onDismiss}
          />
        ),
      });
    } else {
      success('Success', 'Your action was completed successfully!', {
        position,
        animationType: animation,
        onPress: () => console.log('Toast pressed!'),
      });
    }
  };

  const showErrorToast = () => {
    error('Error', 'Something went wrong. Please try again.', {
      position,
      animationType: animation,
      timeout: 5000,
      swipeDirection: 'horizontal',
    });
  };

  const showInfoToast = () => {
    info('Information', 'This is an informational message for you.', {
      position,
      animationType: animation,
      timeout: 3000,
      hideCloseButton: true,
    });
  };

  const showWarningToast = () => {
    warning('Warning', 'Please be careful with this action.', {
      position,
      animationType: animation,
      timeout: 4500,
      progressBar: false,
    });
  };

  const showCustomStyledToast = () => {
    show({
      title: 'Custom Style',
      message: 'This toast has a custom style applied to it!',
      type: 'info',
      position,
      animationType: animation,
      style: {
        backgroundColor: '#333',
        borderLeftWidth: 5,
        borderLeftColor: '#FF5722',
        borderRadius: 8,
        padding: 10,
      },
      titleStyle: {
        color: '#FF5722',
        fontSize: 18,
        fontWeight: 'bold',
      },
      messageStyle: {
        color: '#fff',
        marginTop: 4,
      },
    });
  };

  const showCustomIconToast = () => {
    show({
      title: 'Custom Icon',
      message: 'This toast has a custom icon!',
      type: 'success',
      position,
      animationType: animation,
      icon: 'https://fonts.gstatic.com/s/i/materialicons/favorite/v6/24px.svg',
      colors: {
        bg: '#FCE4EC',
        color: '#E91E63',
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Serious Toast System Demo</Text>

      <View style={styles.configContainer}>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Position:</Text>
          <TouchableOpacity
            onPress={togglePosition}
            style={styles.configButton}>
            <Text style={styles.configButtonText}>{position}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Animation:</Text>
          <TouchableOpacity
            onPress={cycleAnimation}
            style={styles.configButton}>
            <Text style={styles.configButtonText}>{animation}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Custom UI:</Text>
          <Switch value={customUI} onValueChange={toggleCustomUI} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Show Success Toast" onPress={showSuccessToast} />
        <Button title="Show Error Toast" onPress={showErrorToast} />
        <Button title="Show Info Toast" onPress={showInfoToast} />
        <Button title="Show Warning Toast" onPress={showWarningToast} />
        <Button
          title="Show Custom Styled Toast"
          onPress={showCustomStyledToast}
        />
        <Button title="Show Custom Icon Toast" onPress={showCustomIconToast} />
        <Button title="Hide All Toasts" onPress={hideAll} />
      </View>
    </SafeAreaView>
  );
};

// Final Export wrapped with ToastProvider
export default function ToastDemo() {
  return (
    <ToastProvider>
      <ToastDemoContent />
    </ToastProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  configContainer: {
    marginBottom: 24,
  },
  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  configLabel: {
    fontSize: 16,
    flex: 1,
  },
  configButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  configButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  customToast: {
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#DFF0D8',
    padding: 10,
    borderRadius: 8,
  },
  customToastContent: {
    flex: 1,
  },
  customToastTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C763D',
  },
  customToastMessage: {
    fontSize: 14,
    color: '#3C763D',
  },
  customCloseButton: {
    marginLeft: 10,
    padding: 4,
  },
  customCloseText: {
    fontSize: 20,
    color: '#3C763D',
  },
});
