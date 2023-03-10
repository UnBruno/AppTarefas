import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'


export default function TaskList({data, deleteItem, editItem}){
  return(

    <View style = {styles.container}>
      
      <TouchableOpacity style = {styles.botaoRemove} onPress = { () => deleteItem(data.key) }>
        <Feather
          name = "trash-2"
          color = "#FFF"
          size = {20} 
        />
      </TouchableOpacity>

      <TouchableOpacity style = {styles.botaoRemove} onPress={() => editItem(data) }>

        <Feather
          name = "edit"
          color = "#FFF"
          size = {20} 
        />

      </TouchableOpacity>

      <View style = {styles.areaItens}>

        <Text style = {styles.itens}>
          {data.nome}
        </Text>

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#121212',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    height: 45
  },
  botaoRemove:{
    marginRight: 10
  },
  areaItens:{
    paddingRight: 10
  },
  itens:{
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight: 10
  }
})