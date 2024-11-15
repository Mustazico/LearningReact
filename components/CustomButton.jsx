import { TouchableOpacity, View, Text } from 'react-native'
import React from 'react'


// A touachable button which can be created with different elements and styles.
// Passes a handle press for handlinck onClick and active opacity which makes it darker when pressing it
const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    // Can hover to read - creates a touchavble are wrapped around the button
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        // If statement for the button, if it is loading opacity is 50 meaning indicating cant click on it again
        className={`bg-secondary rounded-xl min-h-[62px]
        justify-center items-center ${containerStyles} $ 
        {isLoading ? 'opacity-50 : ''}`}
        disabled={isLoading}
        >
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton