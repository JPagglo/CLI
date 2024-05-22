import React from "react";
import {View, Text, StyleSheet} from 'react-native';


export default function ChatRoom(){
  return(
    <View style={styles.container}>
      <Text>tela ChatRoom</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})