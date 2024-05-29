import React, {useMemo} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';


 function ChatMessage({data}) {

    const user = auth().currentUser?.toJSON();
    
    const isMessage = useMemo(() =>{
        return data?.user?._id === user.uid
    }, [data])



 return (
   <View style={styles.container}>
        <View style={[
            styles.messageBox,
            {
                backgroundColor: isMessage ? "#dcf8c5" : "#fff",
                marginLeft: isMessage ? 50 : 0,
                marginRight: isMessage ? 0 : 50,
            }
            ]}>
          {!isMessage &&  <Text style={styles.name}> {data?.user?.displayName}</Text>}      
            <Text style={styles.message}> {data.text}</Text>
         </View>
   </View>
  );
}

export default ChatMessage;


const styles = StyleSheet.create({
    container:{
        padding:10,
    },
    messageBox:{
        borderRadius:5,
        padding:10,
    },
    name:{
        color:"#f53745",
        fontWeight:'bold',
        marginBottom:5,
    },
    message:{

    }
})