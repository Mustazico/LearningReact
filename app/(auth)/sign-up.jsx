import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {Link, router} from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const SignUp = () => {
  // A use state field
  // useSateSnippet for adding loading state
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  //fucntion for submitting a form
  const submit = async () => {
    if (form.username==="" || form.email==="" || form.password==="") {
      Alert.alert('Error', 'Please fill in all fields')
    }
    setIsSubmitting(true)
    try {
      const result = await createUser(form.email, form.password, form.username);
      // set it to global state
      setUser(result);
      setIsLoggedIn(true);
      Alert.alert('Success', 'You have successfully signed up');
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        {/* full width, centering the content, full heigth padding x of 4, margin y of 6
        Can also center height by using h-full */}
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]"/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form,
              username: e})}
              otherStyles="mt-10"
          />
          <FormField
            title="Email"
            // set the value property of this empty string to be form.email created with the state field above
            value={form.email}
            // used to know how to modify
            // a callback function which calls event and calls the setForm setter
            // destrucutres the existing form values, and modify email to be equal to the event that is passed
            handleChangeText={(e) => setForm({...form,
              email: e})}
              otherStyles="mt-7"
              // keyboarType is used for placeholders
              keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form,
              password: e})}
              otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up to Aora"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already?
              </Text>
              <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp