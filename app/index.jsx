import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Crumz er gay</Text>
      <StatusBar style="auto"></StatusBar>
      <Link href="/home" style={{color: 'blue'}}>Home</Link>
      <Link href="/items" style={{color: 'blue'}}>Go to Items</Link>
    </View>
  );
}

