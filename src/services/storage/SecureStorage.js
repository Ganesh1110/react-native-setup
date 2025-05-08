import * as Keychain from 'react-native-keychain';

export const SecureStorage = {
  setItem: async (key, value) => {
    await Keychain.setGenericPassword(key, JSON.stringify(value));
  },
  getItem: async key => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return JSON.parse(credentials.password);
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  removeItem: async () => {
    await Keychain.resetGenericPassword();
  },
};
