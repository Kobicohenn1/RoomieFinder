import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as dp,
} from 'react-native-responsive-screen';
import { Redirect, router } from 'expo-router';
import { images } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <LinearGradient
      colors={['#B7B8B0', '#9C9791', '#9B8669', '#82663F']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <ImageBackground
              source={images.opening}
              resizeMode="cover"
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 60,
              }}
            >
              <View>
                <Text style={styles.text}>
                  Find Your Perfect Roomie, Find Your Perfect Home!
                </Text>
                <View style={{ alignSelf: 'center' }}>
                  <CustomButton
                    handlePress={() => {
                      router.push('/sign-in');
                    }}
                    title="Continue with Email"
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
});
