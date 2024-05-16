import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

  return (
    <LinearGradient
      colors={['#B7B8B0', '#9C9791', '#9B8669', '#82663F']}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={images.signin}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Log in to RoomieFinder</Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              keyboardType="email-address"
              placeholder={'Email'}
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              placeholder={'Password'}
            />
            <CustomButton title="Sign In" handlePress={submit} />
            <View style={styles.haveAccountContainer}>
              <Text style={styles.haveAccountText}>Don't have an account?</Text>
              <Link href="/sign-up" style={styles.signUp}>
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  signInContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 200, // Adjust this value as needed based on your design
  },
  signInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  haveAccountContainer: {
    justifyContent: 'center',
    paddingTop: 14,
    flexDirection: 'row',
  },
  haveAccountText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    paddingRight: 8,
    //fontStyle: 'bold',
  },
  signUp: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFA500',
  },
});

export default SignIn;
