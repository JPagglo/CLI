import React from "react";
import {View, Text, StyleSheet} from 'react-native';


export default function Messages(){
  return(
    <View style={styles.container}>
      <Text>tela Menssagens</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    color:"#000"
  }
})