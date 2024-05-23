import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function FabButton({setVisible}){

    function handleNavigateButton(){
        setVisible()
    }


    return(
        <TouchableOpacity 
        onPress={handleNavigateButton}
        activeOpacity={0.9}
        style={styles.container}>
            <View >
                <Text style={styles.buttonText}> + </Text>
            </View>
        </TouchableOpacity>
    )
}

export default FabButton;


const styles = StyleSheet.create({
    container:{
        backgroundColor:"#2e54d4",
        width:60,
        height:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:"5%",
        right:"6%"
    },

    buttonText:{
        fontSize:30,
        color:"#fff",
    }


})