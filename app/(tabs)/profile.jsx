import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) {
          Alert.alert('Error', 'Authentication error');
          return;
        }

        const response = await axios.get(
          `http://192.168.10.10:3500/api/users/${userId}`,
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        Alert.alert('Error', 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User data not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {userData.name || userData.username}
        </Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Settings',
              'Settings functionality will be implemented.'
            )
          }
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: userData.profileImageUrl }}
        style={styles.profileImage}
      />
      <TouchableOpacity style={styles.cameraIconContainer}>
        <Text style={styles.cameraIcon}>📷</Text>
      </TouchableOpacity>
      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileName}>
          {userData.name || userData.username}, {userData.age || 'N/A'}
        </Text>
        <Text style={styles.profileMemberSince}>
          Member since {new Date(userData.memberSince).toLocaleDateString()}
        </Text>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={handleEditProfile}
        >
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.verifyContainer}>
        <Text style={styles.verifyText}>Verify your personal details</Text>
        <Text style={styles.verifySubText}>
          Verified users are more likely to get the property or tenant they
          really want.
        </Text>
        <View style={styles.verifyIconsContainer}>
          <Text style={styles.verifyIcon}>🔍</Text>
          <Text style={styles.verifyIcon}>✉️</Text>
          <Text style={styles.verifyIcon}>❤️</Text>
          <Text style={styles.verifyIcon}>🧑‍🤝‍🧑</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsIcon: {
    fontSize: 25,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginVertical: 20,
  },
  cameraIconContainer: {
    position: 'absolute',
    top: 140,
    left: '50%',
    transform: [{ translateX: -20 }],
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  cameraIcon: {
    fontSize: 30,
  },
  profileInfoContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileMemberSince: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  editProfileButton: {
    marginTop: 20,
    backgroundColor: '#32CD32',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editProfileButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  verifyContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  verifyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#32CD32',
  },
  verifySubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
  },
  verifyIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  verifyIcon: {
    fontSize: 30,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
