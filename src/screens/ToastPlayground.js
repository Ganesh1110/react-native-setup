import React from 'react';
import {
  View,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Divider,
} from 'react-native';
import {useToast} from '../components/ToastContainer'; // Correct path

const ToastPlayground = () => {
  const {show} = useToast();

  const showToast = options => {
    show({
      animation: options.animation,
      type: options.type,
      message: options.message,
      position: options.position || 'bottom',
      duration: options.duration || 3000,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Toast Playground 🎮</Text>

      {/* --- Slide Toasts --- */}
      <Text style={styles.sectionTitle}>Slide Animations</Text>

      <Button
        title="Slide Success (Bottom)"
        color="green"
        onPress={() =>
          showToast({
            message: 'Slide In Success!',
            animation: 'slide',
            type: 'success',
            position: 'bottom',
          })
        }
      />
      <View style={styles.spacing} />

      <Button
        title="Slide Error (Top)"
        color="red"
        onPress={() =>
          showToast({
            message: 'Slide In Error!',
            animation: 'slide',
            type: 'error',
            position: 'top',
          })
        }
      />
      <View style={styles.spacing} />

      <Button
        title="Slide Info (Center)"
        color="blue"
        onPress={() =>
          showToast({
            message: 'Slide In Info!',
            animation: 'slide',
            type: 'info',
            position: 'center',
          })
        }
      />
      <View style={styles.divider} />

      {/* --- Fade Toasts --- */}
      <Text style={styles.sectionTitle}>Fade Animations</Text>

      <Button
        title="Fade Success (Bottom)"
        color="green"
        onPress={() =>
          showToast({
            message: 'Fade In Success!',
            animation: 'fade',
            type: 'success',
            position: 'bottom',
          })
        }
      />
      <View style={styles.spacing} />

      <Button
        title="Fade Error (Top)"
        color="red"
        onPress={() =>
          showToast({
            message: 'Fade In Error!',
            animation: 'fade',
            type: 'error',
            position: 'top',
          })
        }
      />
      <View style={styles.divider} />

      {/* --- Scale Toasts --- */}
      <Text style={styles.sectionTitle}>Scale Animations</Text>

      <Button
        title="Scale Info (Center)"
        color="blue"
        onPress={() =>
          showToast({
            message: 'Scale In Info!',
            animation: 'scale',
            type: 'info',
            position: 'center',
          })
        }
      />
      <View style={styles.spacing} />

      {/* --- Other Options --- */}
      <Text style={styles.sectionTitle}>Others</Text>

      <Button
        title="Custom Duration (5s)"
        color="orange"
        onPress={() =>
          showToast({
            message: 'This toast stays for 5 seconds!',
            animation: 'slide',
            type: 'default',
            duration: 5000,
          })
        }
      />
      <View style={styles.spacing} />

      <Button
        title="Multiple Toasts Sequence"
        color="#8e44ad"
        onPress={() => {
          showToast({
            message: 'First Toast!',
            animation: 'slide',
            type: 'info',
          });
          setTimeout(() => {
            showToast({
              message: 'Second Toast!',
              animation: 'fade',
              type: 'success',
            });
          }, 1500);
          setTimeout(() => {
            showToast({
              message: 'Third Toast!',
              animation: 'scale',
              type: 'error',
            });
          }, 3000);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    flexGrow: 1,
    backgroundColor: '#F2F2F2',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 15,
    color: '#666',
  },
  spacing: {
    marginVertical: 10,
  },
  divider: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ToastPlayground;
