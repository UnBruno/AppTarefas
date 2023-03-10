import React, {useState, useEffect, useRef} from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  FlatList,
  Keyboard
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import TaskList from "../TaskList/Index";
import firebase from "../../services/firebaseConnection";
import Feather from 'react-native-vector-icons/Feather';



export default function Home({route}){

  const inputRef = useRef(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState('');

  useEffect( () => {
    function getUser(){
      if(route.params?.user === ''){
        return;
      }

      firebase.database().ref('tarefas').child(route.params?.user).once('value', (snapshot) => {
        setTasks([]);

        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          }

          setTasks(oldTasks => [...oldTasks, data]);

        })

      })
    }

    getUser();

  }, [route.params?.user])
  
  function handleAdd(){
    if(newTask === ''){
      return;
    }

    //Editar tarefa
    if(key !== ''){
      firebase.database().ref('tarefas').child(route.params?.user).child(key).update({
        nome: newTask
      })
      .then( () => {
        const taskIndex = tasks.findIndex(item => item.key === key);
        const tasksClone = tasks;
        tasksClone[taskIndex].nome = newTask;

        setTasks([...tasksClone]);
      })

      Keyboard.dismiss();
      setNewTask('');
      setKey('');

      return;
    }

    let tarefas = firebase.database().ref('tarefas').child(route.params?.user);
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      nome: newTask
    })
    .then( () => {
      const data = {
        key: chave,
        nome: newTask
      };

      setTasks(oldTasks => [...oldTasks, data]);
    })

    setNewTask('');
    Keyboard.dismiss();

  }
  
  function handleDelete(key){
    firebase.database().ref('tarefas').child(route.params?.user).child(key).remove()
    .then(() => {
      const findTasks = tasks.filter( item => item.key !== key)
      setTasks(findTasks)
    })
  }

  function handleEdit(data){
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();

  }

  function cancelEdit(){
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  return(

    <SafeAreaView style = {styles.container}>
      <LinearGradient 
        colors={['#ad5389', '#3c1053']}
        style = {styles.containerGradient}  
      >

        { key.length > 0 && (
          <View style = {styles.areacancelEdit}>
            <TouchableOpacity onPress={cancelEdit}>
              <Feather
                name = "x-circle"
                size = {20}
                color = "#FF0000"
                />
            </TouchableOpacity>
        
            <Text style = {styles.textocancelEdit}>
              Você está editando uma tarefa!
            </Text>
          </View>
        )}
        
        <View style = {styles.areabotaoAdd}>

          <TextInput
            style = {styles.inputAdd}
            placeholder = "Qual sua próxima tarefa?"
            value = {newTask}
            onChangeText = {(text) => setNewTask(text)}
            ref={inputRef}
          />
          <TouchableOpacity style = {styles.botaoAdd} onPress = {handleAdd}>
            <Text style = {styles.textobotaoAdd}>+</Text>
          </TouchableOpacity>

        </View>

        <FlatList
          data={tasks}
          keyExtractor={item => item.key}
          renderItem = {({item}) => (
            <TaskList data={item} deleteItem = {handleDelete} editItem = {handleEdit} />
          )}
        />


      </LinearGradient>
      
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    
  },
  containerGradient:{
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
  },
  areacancelEdit:{
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: '#141414',
    borderRadius: 8
  },
  textocancelEdit:{
    marginLeft: 5,
    color: '#FF0000'
  },
  areabotaoAdd:{
    flexDirection: 'row',

  },
  inputAdd:{
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
    fontSize: 15

  },
  botaoAdd:{
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 16,
    borderRadius: 8,

  },
  textobotaoAdd:{
    fontSize: 20,
    color: '#FFF'
  }

})
