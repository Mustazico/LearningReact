import { View, Text } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'

// The default layout for sign-in and sign-up screens
const authLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar backgrounColor="#161622" style="light"/>
    </>

  )
}

export default authLayout