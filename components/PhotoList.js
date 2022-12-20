import React, {useState, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';


const PhotoList = ({route}) => 
{

  const [state, setState] = useState({photos: null});
  
  
  console.log(state);

  useEffect( () => 
  {
    const fetchPhotos = async () => {
      const {data} = await axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${route.params.albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`,
      );
      setState(data.photoset.photo)
    }
    fetchPhotos();
    
  }, []);

  const renderPhotos = ({photo}) => (
    <PhotoDetail
       key={photo.title}
       title={photo.title}
       imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
     />
 )
 
  if (!state.photos) 
  {
    return (
      <View style={{flex: 1}}>
        <Text>LOADING...</Text>
      </View>
    );
  }

return (
  <View style={{flex: 1}}>
    <FlatList 
    data={state.photos}
    renderItem={renderPhotos}/>
  </View>
);
}

export default PhotoList;
