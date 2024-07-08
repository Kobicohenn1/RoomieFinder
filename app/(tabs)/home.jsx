import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';
import ProfileCard from '../../components/ProfileCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('screen');

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedUserId, setLoggedUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setLoggedUserId(id);
    };
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          'http://192.168.10.10:3500/api/profiles'
        );
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserId();
    fetchProfiles();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const filterdProfiles = profiles.filter(
    (profile) => profile._id !== loggedUserId
  );

  return (
    <View style={styles.container}>
      <Swiper
        cards={filterdProfiles}
        renderCard={(profile) => <ProfileCard profile={profile} />}
        onSwipedAll={() => console.log('No more profiles')}
        cardIndex={0}
        backgroundColor={'#f5f5f5'}
        stackSize={3}
        cardHorizontalMargin={width / 10} // Remove extra margin
        cardVerticalMargin={width / 5}
        containerStyle={styles.swiperContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperContainer: {
    // width: width * 0.8, // Set the width to 80% of the screen width
    flexGrow: 0, // Prevent the Swiper from growing to take up all available space
  },
  swiperStyles: {},
});

export default Home;
