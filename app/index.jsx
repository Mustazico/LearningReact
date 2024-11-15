import { ScrollView, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link,Redirect, router} from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from '../constants';
import CustomButton from '../components/CustomButton';


export default function App() {
  return (
    // Safe are is used for the main content of the screen. Ensures content will not overlap
    // tabbar, sidebar, header etc.
    <SafeAreaView className="bg-primary h-full">
      {/* Wraps the content in a scrollview incase users have to scroll to see all content */}
     <ScrollView contentConrainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380p] w-full h-[300px]"
            resizeMode="contain"
          />

          <View classname="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{'      '}Posibilites with {' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-3 -right-8"
              resizeMode="contain"
            />
          </View>
        <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
          Where creativity meets innovation:
          embark on a journey of limitless exploration with Aora
        </Text>
        {/* Creates a custom button which redirects to sign-in */}
        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push('/sign-in')}
          containerStyles="w-full mt-7"
        />
        </View>
     </ScrollView>
     {/* The top bar of the display indicating the time and battery level */}
      <StatusBar backgroundColor='#161622' 
      style='light'/>
    </SafeAreaView>
  );
}