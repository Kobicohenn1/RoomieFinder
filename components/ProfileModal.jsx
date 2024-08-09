import React from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

const ProfileModal = ({ onClose, isModalVisible, profile }) => {
  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
              source={{
                uri: `http://192.168.10.10:3500${profile.profileImageUrl}`,
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfoContainer}>
              <Text style={styles.profileName}>
                {profile.username}, {profile.age}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.7,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.8,
    height: height * 0.3,
    borderRadius: 17,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ProfileModal;
