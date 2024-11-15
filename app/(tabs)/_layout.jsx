import { View, Text, Image } from 'react-native'
import {Tabs, Redirect} from 'expo-router'
import {icons} from '../../constants'

// The icons in the tabbar, will be passed an icon, color, name, and if it is focused
const TabIcon = ({icon, color, name, focused}) => {
  return (
    // View is basically a div element
    <View className="items-center justify-center gap-2 mt-5">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      {/* If it is focused, then */}
     <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color, minWidth: 60, textAlign: 'center'}}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View> 
  )
}
// The entire tab bar itself
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel : false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 2,
            borderTopColor: '#232533',
            height: 84,
          },

        }}
      >
        {/* Handling each tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout