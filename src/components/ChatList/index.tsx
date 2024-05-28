import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";



function ChatList( { data, deleteRoom } ){
    const navigation = useNavigation();

    function openChat(){
        navigation.navigate("Messages", {thread: data})
    }


    return(
        <TouchableOpacity onPress={ openChat} onLongPress={() => deleteRoom && deleteRoom(item.owner,item._id)}>
            <View style={styles.row}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.nameText} numberOfLines={1}> {data.name}</Text>
                    </View>
                    <Text style={styles.contentText} numberOfLines={1}>{data.lastMessage.text}</Text>
                </View>
            </View>
        </TouchableOpacity> 
    )
}

export default ChatList;

const styles = StyleSheet.create({
    row:{
        paddingHorizontal:10,
        paddingVertical:15,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'rgba(241, 240, 245,0.5)'
    },
    content:{
        flexShrink:1,
    },
    header:{
        flexDirection:'row'
    },
    contentText:{
        color:"#c1c1c1",
        fontSize:16,
        marginTop:2,
    },
    nameText:{
        fontSize:18,
        fontWeight:'bold',
        color:"#000"
    }
})