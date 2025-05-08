import {create} from 'zustand';
import {MMKVStorage} from '../services/storage/MMKVStorage';

const useAuthStore = create(set => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initializeAuth: async () => {
    const token = await MMKVStorage.getItem('authToken');
    if (token) {
      set({isAuthenticated: true});
      // Optionally fetch user profile here
    }
  },

  login: async credentials => {
    set({isLoading: true, error: null});
    try {
      // Your login API call
      const user = {id: 1, name: 'John Doe'}; // Mock response
      await MMKVStorage.setItem('authToken', 'sample-token');
      set({user, isAuthenticated: true});
      return user;
    } catch (error) {
      set({error: error.message});
      throw error;
    } finally {
      set({isLoading: false});
    }
  },

  logout: async () => {
    await MMKVStorage.removeItem('authToken');
    set({user: null, isAuthenticated: false});
  },
}));

export default useAuthStore;
