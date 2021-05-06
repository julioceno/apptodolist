import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView, 
  Platform,
  Keyboard,
  Alert,
  AsyncStorage
} from 'react-native';

import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons"

export default function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('')
  const [completedTask, setNewTaskComplet] = useState([])


  async function addTask() {
    if (newTask === "") { return };

    const search = task.filter(task => task === newTask)

    if (search.length !== 0) {
      Alert.alert('Atenção', "Nome da tarefa repetido!")
      return
    }

    setTask([...task, newTask]) // Ele vai usar o operador ... pra adicionar as outras posições do array + a newTask
    setNewTask('')

    Keyboard.dismiss()
  }

  async function completedTaskMarked(item) {
    
  }

  async function removeTask(item) {
    Alert.alert(
      "Deletar anotação",
      "Tem certeza que deseja remover essa anotação?",
      [
        {
          text: "Cancelar",
          onPress: () => { 
            return;
           },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => setTask(task.filter(tasks => tasks !== item))
        }
      ],
      { cancelable: false }
    )
    
   
  }
 

  useEffect(() => {
    async function loadData() {
      const tasks = await AsyncStorage.getItem("tasks")
      if (tasks) {
        console.log(tasks)
        setTask(JSON.parse(task));
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    async function saveData() {
      AsyncStorage.setItem("tasks", JSON.stringify(task));
    }
    saveData()
  }, [task]) 

  return (
    <>
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior="padding"
      style={{ flex: 1 }}
      enabled={ Platform.OS === "ios"}
    >
    <View style={styles.container}>
        <View style={styles.Body}>
          <FlatList 
          style={styles.FlatList} 
          data={task}
          keyExtractor= { item => item.toString() }
          showsVerticalScrollIndicator = {false}
          renderItem={({ item }) => 
          <View style={styles.ContainerView}>
            <Text style={styles.Texto}>{item}</Text>

            <TouchableOpacity onPress={() => removeTask(item)}>
                <MaterialIcons 
                  name="delete-forever"
                  size={25}
                  color="#f64c75"
                />
              </TouchableOpacity>

          
          
          </View> }
          />
        </View>

        <View style={styles.Form}>
          <TextInput 
          style={styles.Input} 
          placeholderTextColor="#999"
          autoCorrect={true}
          placeholder="Adicione uma tarefa"
          maxLength={25}
          onChangeText={text => setNewTask(text)}
          value={newTask}
          />
          <TouchableOpacity style={styles.Button} onPress={ () => addTask() }>
            <Ionicons name="ios-add" size={25} color= "#fff"
            />
          </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({ // Esse aqui é o CSS da aplicação
  container: {
    flex: 1,
    backgroundColor: '#323232',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20    
  },
  
  Body: {
    flex: 1
  },

  Form: {
    padding: 0, 
    height: 60,
    justifyContent: 'center',
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  Input: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },

  Button: {
    height:40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 4, 
    marginLeft: 10,
  },

  FlatList: {
    flex: 1,
    marginTop: 5
  },

  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee"
  },
  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center"
  },



});
