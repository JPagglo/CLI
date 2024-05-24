import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';

//Autentificação
import auth from '@react-native-firebase/auth';

// Icones
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// Componentes
import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/ModalNewRoom';



export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect( ()=>{
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);

  }, [isFocused]);

  function handleSignOut(){
  auth()
  .signOut()
  .then(() =>{
    setUser(null);
    navigation.navigate("SignIn")
  }).catch(()=>{
    console.log("nao tem user")
  })
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerRoomLeft}>
          {user && (
            <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          )}
          <Text style={styles.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <MaterialIcons name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FabButton setVisible ={ () => setModalVisible(true)} userStatus={user}/>

      <Modal visible={modalVisible} animationType='Fade' transparent={true}>
        <ModalNewRoom setVisible ={ () => setModalVisible(false)}/>
      </Modal>
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
