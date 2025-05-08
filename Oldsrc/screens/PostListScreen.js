import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {fetchPosts} from '../api/posts';
import {useToast} from '../components/ToastContainer';

export default function PostListScreen() {
  const {show, hide} = useToast();
  const [toastId, setToastId] = React.useState(null);

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (isLoading) {
      const id = show('Loading posts...', {
        type: 'loading',
        dismissible: false,
        loading: true,
      });
      setToastId(id);
    } else if (toastId) {
      hide(toastId);
      setToastId(null);

      if (error) {
        show('Failed to load posts', {
          type: 'error',
          timeout: 3000,
        });
      } else {
        show('Posts loaded successfully', {
          type: 'success',
          timeout: 2000,
        });
      }
    }
  }, [isLoading, error]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => {}}>
            <View style={{padding: 16}}>
              <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
