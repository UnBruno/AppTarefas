import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from '../../services/firebaseConnection';


import {useNavigation} from '@react-navigation/native'

export default function Cadastro(){

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login(){
    navigation.navigate("Login");
  }

  function cadastrar(){
    const user = firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      navigation.navigate("Home", {user: user.user.uid});
    })
    .catch((error) => {
      alert('Algo deu errado');
    })

    setEmail('');
    setName('');
    setPassword('');
    Keyboard.dismiss();
  }


  return(
    <LinearGradient
      colors={['#ad5389', '#3c1053']}
      style = {styles.container}
      
    >

      <View style = {styles.areaIcon}>
        <FontAwesome 
          name = "user-circle-o" 
          size = {120}
          color = {"#141414"}
            
        />
      </View>

      <TextInput
        style = {styles.input}
        placeholder='Digite o seu nome'
        value = {name}
        onChangeText = {(text) => setName(text)}
      />     

      <TextInput
        style = {styles.input}
        placeholder='Digite o seu e-mail'
        value = {email}
        onChangeText = {(text) => setEmail(text)}
      />

      <TextInput
        style = {styles.input}
        placeholder='Defina a sua senha'
        value = {password}
        onChangeText = {(text) => setPassword(text)}
        secureTextEntry = {true}
      />

      <View style = {styles.areaBotao}>
        
        <TouchableOpacity 
          style = {styles.botao}
          onPress = {cadastrar}
        >
          <Text style = {styles.textoBotao}>Criar Conta</Text>

        </TouchableOpacity>

        <TouchableOpacity 
          onPress={login}
        >
          <Text style={{textAlign: 'center', color: '#FFF'}}>Fazer Login</Text>
        </TouchableOpacity>
      
      </View>
      
    
    </LinearGradient>
      
  )

}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		paddingTop: 40,
    paddingHorizontal: 10
	},
  input:{
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#141414',
    fontSize: 18
  },
  areaBotao:{
    alignItems: 'center'
  },
  botao:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141414',
    height: 45,
    width: '50%',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10
  },
  textoBotao:{
    color:'#FFF',
    fontSize: 17
  },
  areaIcon:{
    alignItems: 'center',
    marginBottom: 10
  }

})