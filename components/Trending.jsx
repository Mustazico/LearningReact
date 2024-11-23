import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import React, { useRef, useState } from 'react'
import {icons} from '../constants'
import { useVideoPlayer, Video, VideoView} from 'expo-video';
import { useEvent } from 'expo';
const zoomIn = {
  0 : {
    scale: 0.9
  },
  1: { 
    scale: 1.1,
  }
}

const zoomOut = {
  0 : {
    scale: 1
  },
  1: { 
    scale: 0.9,
  }
}


const TrendingItem = ({activeItem, item }) => {
  console.log('Video URL:', item.video);  
  const videoSource = {uri: item.video};
  // const videoSource = 'https://player.vimeo.com/video/949579770?h=897cd5e781';
  // const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  // const videoSource =  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const handlePress = async () => {
    try {
      console.log('handlePress called');
      if (isPlaying) {
        console.log('Pausing video');
        player.pause();
      } else {
        console.log('Playing video');
        player.play();
      }
    } catch (error) {
      console.error('Error playing/pausing video:', error);
    }
  };

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
      >
      {isPlaying ? (
        <VideoView
          player={player}
          source={{uri: item.video}}
          style={{ width: 208, height: 257, borderRadius: 35, marginTop: 12, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          videoContentFit="contain"
          allowFullscreen
          allowPictureInPicture
          nativeControls
          shouldPlay
        />
      ) : (
        <TouchableOpacity
          style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={0.7}
          onPress={handlePress}
        >
            <ImageBackground
              source={{uri: item.thumbnail}}
              className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
              resizeMode="cover"
              />
              <Image
                source={icons.play}
                className="w-12 h-12 absolute"
                resizeMode='contain'
              />
          </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({viewableItems}) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
   }

  return (
    <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <TrendingItem activeItem={activeItem} item={item}/>
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{ x: 170 }}
        horizontal
    />
  )
}

export default Trending