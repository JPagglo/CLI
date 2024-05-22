import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform
} from 'react-native';

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [type, setType] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Hey Grupos</Text>
      <Text style={{marginBottom: 20}}>Faça Networking</Text>

      {type && (
        <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Digite seu nome?"
        placeholderTextColor="#9999b"
      />
      )}

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Digite seu email?"
        placeholderTextColor="#9999b"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Digite sua senha?"
        placeholderTextColor="#9999b"
      />

      <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: type ? "#F53745" : "#57DD86"}]}>
        <Text style={styles.buttonText}>
          {type ? "Cadastrar" : "Acessar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={ () => setType(!type)}>
        <Text >{type ?  "Já tenho uma conta" : "Criar uma nova conta"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    alignItems: 'center',
  },

  logo:{
    marginTop: Platform.OS === 'android' ? 55 : 80,
    fontSize:28,
    fontWeight:'bold'
  },
  input:{
    color:"#121212",
    backgroundColor:"#E8E8E5",
    width:'90%',
    borderRadius:8,
    marginBottom:10,
    paddingHorizontal:8,
    height:48,
  },
  buttonLogin:{
    width:'90%',
    
    height:50,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
    borderRadius:6
  },
  buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:'bold',
  }
});
