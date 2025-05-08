// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import React, {useState} from 'react';
// import {useToast} from '../components/ToastContainer'; // Adjust the import path

// const ToastScreen = () => {
//   const {show, hide} = useToast();
//   const [toastIds, setToastIds] = useState({
//     persistent: null,
//     loading: null,
//   });

//   const showBasicToast = () => {
//     show('This is a basic toast message', {
//       type: 'info',
//       timeout: 3000,
//     });
//   };

//   const showSuccessToast = () => {
//     show('Operation completed successfully!', {
//       type: 'success',
//       timeout: 2000,
//     });
//   };

//   const showErrorToast = () => {
//     show('Something went wrong!', {
//       type: 'error',
//       timeout: 3000,
//     });
//   };

//   const showPersistentToast = () => {
//     const id = show('This toast stays until manually dismissed', {
//       type: 'info',
//       dismissible: true,
//     });
//     setToastIds(prev => ({...prev, persistent: id}));
//   };

//   const hidePersistentToast = () => {
//     if (toastIds.persistent) {
//       hide(toastIds.persistent);
//       setToastIds(prev => ({...prev, persistent: null}));
//     }
//   };

//   const showLoadingToast = () => {
//     const id = show('Processing your request...', {
//       type: 'loading',
//       loading: true,
//       dismissible: false,
//     });
//     setToastIds(prev => ({...prev, loading: id}));
//   };

//   const hideLoadingToast = () => {
//     if (toastIds.loading) {
//       hide(toastIds.loading);
//       setToastIds(prev => ({...prev, loading: null}));
//     }
//   };

//   const showAutoDismissToast = () => {
//     show('This will disappear in 5 seconds', {
//       type: 'info',
//       timeout: 5000,
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Toast Demonstration</Text>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Basic Toasts</Text>

//         <TouchableOpacity style={styles.button} onPress={showBasicToast}>
//           <Text style={styles.buttonText}>Show Basic Toast</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.successButton]}
//           onPress={showSuccessToast}>
//           <Text style={styles.buttonText}>Show Success Toast</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.errorButton]}
//           onPress={showErrorToast}>
//           <Text style={styles.buttonText}>Show Error Toast</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button} onPress={showAutoDismissToast}>
//           <Text style={styles.buttonText}>Show Auto-Dismiss Toast (5s)</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Persistent Toast</Text>

//         <TouchableOpacity style={styles.button} onPress={showPersistentToast}>
//           <Text style={styles.buttonText}>Show Persistent Toast</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.secondaryButton]}
//           onPress={hidePersistentToast}
//           disabled={!toastIds.persistent}>
//           <Text style={styles.buttonText}>Dismiss Persistent Toast</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Loading Toast</Text>

//         <TouchableOpacity style={styles.button} onPress={showLoadingToast}>
//           <Text style={styles.buttonText}>Show Loading Toast</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.secondaryButton]}
//           onPress={hideLoadingToast}
//           disabled={!toastIds.loading}>
//           <Text style={styles.buttonText}>Hide Loading Toast</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Toast Status</Text>
//         <Text>
//           Persistent Toast: {toastIds.persistent ? 'Visible' : 'Not visible'}
//         </Text>
//         <Text>
//           Loading Toast: {toastIds.loading ? 'Visible' : 'Not visible'}
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   section: {
//     marginBottom: 30,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 15,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#2196F3',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '500',
//   },
//   successButton: {
//     backgroundColor: '#4CAF50',
//   },
//   errorButton: {
//     backgroundColor: '#f44336',
//   },
//   secondaryButton: {
//     backgroundColor: '#607D8B',
//   },
// });

// export default ToastScreen;

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useToast} from '../components/ToastContainer';

const ToastScreen = () => {
  const {show, hide, update} = useToast();
  const [toastIds, setToastIds] = useState({
    persistent: null,
    loading: null,
    updatable: null,
    swipeable: null,
  });
  const [animationType, setAnimationType] = useState('slide');
  const [position, setPosition] = useState('top');

  const showBasicToast = () => {
    show('This is a basic toast message', {
      type: 'info',
      timeout: 3000,
      animationType,
      position,
    });
  };

  const showSuccessToast = () => {
    show('Operation completed successfully!', {
      type: 'success',
      timeout: 2000,
      animationType,
      position,
    });
  };

  const showErrorToast = () => {
    show('Something went wrong!', {
      type: 'error',
      timeout: 3000,
      animationType,
      position,
    });
  };

  const showPersistentToast = () => {
    const id = show('This toast stays until manually dismissed', {
      type: 'info',
      dismissible: true,
      animationType,
      position,
    });
    setToastIds(prev => ({...prev, persistent: id}));
  };

  const hidePersistentToast = () => {
    if (toastIds.persistent) {
      hide(toastIds.persistent);
      setToastIds(prev => ({...prev, persistent: null}));
    }
  };

  const showLoadingToast = () => {
    const id = show('Processing your request...', {
      type: 'loading',
      loading: true,
      dismissible: false,
      animationType,
      position,
    });
    setToastIds(prev => ({...prev, loading: id}));
  };

  const hideLoadingToast = () => {
    if (toastIds.loading) {
      hide(toastIds.loading);
      setToastIds(prev => ({...prev, loading: null}));
    }
  };

  const showUpdatableToast = () => {
    const id = show('Initial message - will update in 2s', {
      type: 'info',
      timeout: 4000,
      animationType,
      position,
    });
    setToastIds(prev => ({...prev, updatable: id}));

    setTimeout(() => {
      update(id, {
        text: 'Message updated!',
        type: 'success',
      });
    }, 2000);
  };

  const showSwipeableToast = () => {
    const id = show('Swipe me left or right to dismiss', {
      type: 'info',
      dismissible: true,
      animationType,
      position,
      swipeDirection: ['left', 'right'], // Enable both directions
    });
    setToastIds(prev => ({...prev, swipeable: id}));
  };

  const showStackedToasts = () => {
    show('First toast', {
      type: 'info',
      timeout: 4000,
      position,
      animationType,
    });
    setTimeout(() => {
      show('Second toast', {
        type: 'success',
        timeout: 3000,
        position,
        animationType,
      });
    }, 500);
    setTimeout(() => {
      show('Third toast', {
        type: 'error',
        timeout: 2000,
        position,
        animationType,
      });
    }, 1000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Advanced Toast Features</Text>

      <View style={styles.controls}>
        <Text style={styles.controlLabel}>Animation:</Text>
        <View style={styles.controlRow}>
          {['slide', 'fade'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.controlButton,
                animationType === type && styles.activeControl,
              ]}
              onPress={() => setAnimationType(type)}>
              <Text style={styles.controlButtonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.controlLabel}>Position:</Text>
        <View style={styles.controlRow}>
          {['top', 'bottom'].map(pos => (
            <TouchableOpacity
              key={pos}
              style={[
                styles.controlButton,
                position === pos && styles.activeControl,
              ]}
              onPress={() => setPosition(pos)}>
              <Text style={styles.controlButtonText}>{pos}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Toasts</Text>

        <TouchableOpacity style={styles.button} onPress={showBasicToast}>
          <Text style={styles.buttonText}>Show Basic Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.successButton]}
          onPress={showSuccessToast}>
          <Text style={styles.buttonText}>Show Success Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.errorButton]}
          onPress={showErrorToast}>
          <Text style={styles.buttonText}>Show Error Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showStackedToasts}>
          <Text style={styles.buttonText}>Show Stacked Toasts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Features</Text>

        <TouchableOpacity style={styles.button} onPress={showPersistentToast}>
          <Text style={styles.buttonText}>Show Persistent Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={hidePersistentToast}
          disabled={!toastIds.persistent}>
          <Text style={styles.buttonText}>Dismiss Persistent Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showUpdatableToast}>
          <Text style={styles.buttonText}>Show Updatable Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showSwipeableToast}>
          <Text style={styles.buttonText}>Show Swipeable Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showLoadingToast}>
          <Text style={styles.buttonText}>Show Loading Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={hideLoadingToast}
          disabled={!toastIds.loading}>
          <Text style={styles.buttonText}>Hide Loading Toast</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toast Status</Text>
        <Text>
          Persistent Toast: {toastIds.persistent ? 'Visible' : 'Not visible'}
        </Text>
        <Text>
          Loading Toast: {toastIds.loading ? 'Visible' : 'Not visible'}
        </Text>
        <Text>
          Updatable Toast: {toastIds.updatable ? 'Visible' : 'Not visible'}
        </Text>
        <Text>
          Swipeable Toast: {toastIds.swipeable ? 'Visible' : 'Not visible'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  controls: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  controlLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  controlRow: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 8,
  },
  controlButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
    alignItems: 'center',
  },
  activeControl: {
    backgroundColor: '#2196F3',
  },
  controlButtonText: {
    color: '#333',
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  successButton: {
    backgroundColor: '#4CAF50',
  },
  errorButton: {
    backgroundColor: '#f44336',
  },
  secondaryButton: {
    backgroundColor: '#607D8B',
  },
});

export default ToastScreen;
