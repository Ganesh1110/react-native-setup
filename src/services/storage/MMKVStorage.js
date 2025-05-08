import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const MMKVStorage = {
  setItem: (key, value) => {
    storage.set(key, JSON.stringify(value));
  },
  getItem: key => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  removeItem: key => {
    storage.delete(key);
  },
  clearAll: () => {
    storage.clearAll();
  },
};
