import React, {useState, useEffect} from 'react';
import { Text, View,FlatList} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

const AlbumList = ({navigation}) =>{

  const [photoset, setPhotoset] = useState(null);

  useEffect(()=> {
    const fetchPhotoset = async () =>{
      const {data} = await axios
        .get(
          'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
        );
        setPhotoset(data.photosets.photoset)
    }
      fetchPhotoset();
  }, []);

  const renderAlbums = ({album}) => (
      <AlbumDetail
        navigation={navigation}
        key={album.id}
        title={album.title._content}
        albumId={album.id}
      />
    );
  

    if (!photoset) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={{flex: 1}}>
        <FlatList data={photoset}
        renderItem={renderAlbums}/>
      </View>
    );
  
}

export default AlbumList;
