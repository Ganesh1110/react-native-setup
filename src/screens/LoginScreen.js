// import React, {useState} from 'react';
// import {View, TextInput, Button, StyleSheet} from 'react-native';
// import {useMutation, useQueryClient} from '@tanstack/react-query';
// import useAuthStore from '../store/authStore';
// import useToast from '../utils/toast/useToast';
// import AppLoader from '../components/feedback/AppLoader';
// import AppError from '../components/feedback/AppError';
// import {loginUser} from '../api/endpoints/auth';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const {showToast} = useToast();
//   const login = useAuthStore(state => state.login);
//   const queryClient = useQueryClient();

//   const {mutate, isLoading, error} = useMutation(
//     () => loginUser({email, password}),
//     {
//       onSuccess: data => {
//         login(data);
//         queryClient.invalidateQueries([QUERY_KEYS.USER_PROFILE]);
//         showToast('Login successful!', 'success');
//       },
//       onError: error => {
//         showToast(error.message, 'error');
//       },
//     },
//   );

//   const handleSubmit = () => {
//     mutate();
//   };

//   if (isLoading) return <AppLoader />;
//   if (error) return <AppError error={error.message} onRetry={handleSubmit} />;

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//       />
//       <Button title="Login" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     padding: 10,
//   },
// });

// export default LoginScreen;

import React from 'react';
import {View, Text} from 'react-native';

const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;
