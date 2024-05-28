import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';

//Autentificação
import auth from '@react-native-firebase/auth';
import firestore, { onSnapshot } from '@react-native-firebase/firestore';

// Icones
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// Componentes
import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/ModalNewRoom';
import ChatList from '../../components/ChatList';



export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect( ()=>{
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);

  }, [isFocused]);

  useEffect(()=>{
    let isActive = true 

    function getChats(){
      firestore()
      .collection('MESSAGES_THREADS')
      .orderBy('lastMessage.createdAt', 'desc')
      .limit(10)
      .get()
      .then((snapshot) =>{
        const threads = snapshot.docs.map ( (documentSnapshot) => {
          return{
            _id: documentSnapshot.id,
            name:'',
            lastMessage:{ text: ''},
            ...documentSnapshot.data()
          }
        })
        if(isActive){
          setThreads(threads)
          setLoading(false)
        }

      })
    }

    getChats();
    return() =>{
      console.log('AOBA')
    }


  }, [isFocused, updateScreen]);

  function handleSignOut(){
  auth()
  .signOut()
  .then(() =>{
    setUser(null);
    navigation.navigate("SignIn")
  })
  .catch(()=>{
    console.log("nao tem user")
  })
}

function deleteRoom(ownerId, idRoom){
  if(ownerId !== user?.uid) return;

  Alert.alerrt(
    "Atenção",
    "Deseja deleetar a sala?"
    [
      {
        text:"Cancel",
        onPress:() =>{},
        style:"cancel"
      },
      {
        text:"Ok!",
        onPress:() => handleDeleteRoom(idRoom)
      }
    ]
  )
}

async function handleDeleteRoom(idRoom){
  
  await firestore()
  .collection('MESSAGE_THREADS')
  .doc(idRoom)
  .delete();

  setUpdateScreen(!updateScreen);
 }



if(loading){
  return(
    <ActivityIndicator size='large' color='#555' />
  )
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

      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        renderItem={ ({ item }) => (
          <ChatList data={item} deleteRoom={() => deleteRoom()} />
        )}
      />
      <FabButton setVisible ={ () => setModalVisible(true)} userStatus={user}/>

      <Modal visible={modalVisible} animationType='Fade' transparent={true}>
        <ModalNewRoom setVisible ={ () => setModalVisible(false)} setUpdateScreen={() => setUpdateScreen(!updateScreen)}/>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
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
