import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Colors, Text } from 'react-native-paper';

import { Button, Container } from '@/atoms/index';
import { capitalize } from '@/utils/index';

interface Props {
  userData: Objects.User;
  signOut: () => void;
}

export const ScreenProfile: React.FC<Props> = ({ userData, signOut }) => {
  return (
    <Container>
      {userData && (
        <>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.profile}>Profile Settings</Text>

              <View style={styles.userDetails}>
                <Avatar.Image
                  source={require('../../../assets/images/placeholder-user.png')}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.role}>{capitalize(userData.role)}</Text>
                  <Text style={styles.name}>
                    {userData.firstName} {userData.lastName}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <Button mode="contained" onPress={signOut}>
              Sign Out
            </Button>
          </View>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginRight: 20,
  },
  content: {
    margin: 20,
  },
  header: {
    backgroundColor: Colors.green600,
    height: 170,
  },
  headerContent: {
    marginLeft: 20,
    marginTop: 20,
  },
  name: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profile: {
    color: Colors.white,
    fontSize: 28,
    marginBottom: 20,
  },
  role: {
    color: Colors.white,
    fontSize: 16,
  },
  userDetails: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
