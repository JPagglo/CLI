import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


function ModalNewRoom( {setVisible , setUpdateScreen} ){
    const [roomName, setRoomName] = useState ('');
    const user = auth().currentUser.toJSON();

    function handleButtonCreate(){
       if(roomName === '') return;

        firestore()
        .collection('MESSAGE_THREADS')
        .get()
        .then((snapshot) =>{
            let myThreads = 0;
            snapshot.docs.map(docItem =>{
                if(docItem.data().owner === user.uid){
                    myThreads +=1;
                }
            })
                if(myThreads >=4){
                    alert('Limite de grupos atingido.');
                }else{
                    createRoom();
                }
        })
    }
   
    function createRoom(){
        firestore()
        .collection('MESSAGE_THREADS')
        .add({
            name:roomName,
            owner:user.uid,
            lastMessage:{
                text:`Grupo ${roomName} criado. Bem Vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(),
            }
        })
        .then((docRef) =>{
            docRef.collection("MESSAGES").add({
                text:`Grupo ${roomName} criado. Bem Vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(),
                system: true
            })
            .then(()=>{
                setVisible();
                setUpdateScreen();
            })

        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={styles.modal}></View>
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>
                <Text style={styles.title}>NOVO GRUPO</Text>
                <TextInput
                    value={roomName}
                    onChangeText={(text) => setRoomName(text)}
                    placeholder="Nome do grupo"       
                    style={styles.input}         
                />

                <TouchableOpacity style={styles.buttonCreate} onPress={handleButtonCreate}>
                    <Text style={styles.buttonText}> Criar grupo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonBack} onPress={setVisible}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default ModalNewRoom;



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'rgba(34, 34, 34, 0.4)',
    },
    modal:{
        flex:1,
    },
    modalContent:{
        backgroundColor:"#fff",
        padding:20,
        margin:20,
        borderRadius:10,
    },
    title:{
        marginTop:10,
        textAlign:"center",
        fontWeight:'bold',
        fontSize:19,
    },
    input:{
        borderRadius:4,
        backgroundColor:"#ddd",
        marginVertical:10,
        fontSize:16,
        paddingHorizontal:10,
        height:45,
        width: '100%',
    },
    buttonCreate: {
        borderRadius: 4,
        backgroundColor: "#2e54d4",
        height: 45,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 10,
      },

      buttonBack: {
        marginTop: 10,
        borderRadius: 4,
        backgroundColor: "#96a9e9",
        alignItems: 'center',
        justifyContent: "center",
        height: 35,
      },
        buttonText:{
         fontSize:19,
         fontWeight:'bold',
         color:"#fff",
    }
})