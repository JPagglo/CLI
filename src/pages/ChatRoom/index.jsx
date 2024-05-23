import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FabButton from '../../components/FabButton';

export default function ChatRoom() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  function handleSignOut(){
  auth()
  .signOut()
  .then(() =>{
    navigation.navigate("SignIn")
  }).catch(()=>{
    console.log("nao tem user")
  })
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerRoomLeft}>
          <TouchableOpacity onPress={handleSignOut}>
            <Icon name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <Icon name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FabButton setVisible ={ () => setModalVisible(true)}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRoom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2E54D4',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerRoomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 17,
  },
});
