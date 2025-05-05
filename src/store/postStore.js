import {create} from 'zustand';

const usePostStore = create(set => ({
  selectedPost: null,
  setSelectedPost: post => set({selectedPost: post}),
}));

export default usePostStore;
