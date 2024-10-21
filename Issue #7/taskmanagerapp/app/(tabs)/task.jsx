import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

// TaskQueue (FIFO) for pending tasks
class TaskQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(task) {
    this.queue.push(task);
  }

  dequeue() {
    return this.queue.shift();
  }

  getQueue() {
    return this.queue;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

// CompletedTasksStack (LIFO) for completed tasks
class CompletedTasksStack {
  constructor() {
    this.stack = [];
  }

  push(task) {
    this.stack.push(task);
  }

  pop() {
    return this.stack.pop();
  }

  getStack() {
    return this.stack;
  }

  isEmpty() {
    return this.stack.length === 0;
  }
}

const TodoApp = () => {
  const [text, setText] = useState('');
  const [taskQueueState, setTaskQueueState] = useState([]);
  const [completedTasksState, setCompletedTasksState] = useState([]);
  const [timer, setTimer] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(null); // State to track editing

  const taskQueue = new TaskQueue();
  const completedTasksStack = new CompletedTasksStack();

  useEffect(() => {
    fetchTasks();
    Notifications.requestPermissionsAsync();
  }, []);

  const fetchTasks = async () => {
    try {
      const storedQueue = await AsyncStorage.getItem('taskQueue');
      const storedStack = await AsyncStorage.getItem('completedTasks');
      const queue = storedQueue ? JSON.parse(storedQueue) : [];
      const stack = storedStack ? JSON.parse(storedStack) : [];

      setTaskQueueState(queue.filter(task => task !== null));
      setCompletedTasksState(stack.filter(task => task !== null));
    } catch (error) {
      console.error('Failed to fetch tasks from AsyncStorage:', error);
    }
  };

  const scheduleNotification = (task, timerInSeconds) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "To-Do Reminder",
        body: `Time's up for: ${task}`,
      },
      trigger: { seconds: timerInSeconds },
    });
  };

  const addTodo = async () => {
    if (text === '' || !timer) return;

    const task = { id: Date.now(), task: text, timer: Math.floor((timer.getTime() - new Date().getTime()) / 1000) };

    // Add or update task in queue
    let updatedQueue;
    if (isEditing !== null) {
      updatedQueue = taskQueueState.map(item => (item.id === isEditing ? { ...item, task: text } : item));
      setIsEditing(null); // Reset editing state
    } else {
      updatedQueue = [...taskQueueState, task];
      scheduleNotification(task.task, task.timer);
    }

    setTaskQueueState(updatedQueue);
    taskQueue.enqueue(task);

    try {
      await AsyncStorage.setItem('taskQueue', JSON.stringify(updatedQueue));
      setText('');
      setTimer(new Date());
    } catch (error) {
      console.error('Failed to save task to AsyncStorage:', error);
    }
  };

  const completeTask = async (id) => {
    const updatedQueue = taskQueueState.filter(task => task.id !== id);
    const completedTask = taskQueueState.find(task => task.id === id);

    if (completedTask) {
      const updatedCompletedTasks = [...completedTasksState, completedTask];
      setCompletedTasksState(updatedCompletedTasks);
      completedTasksStack.push(completedTask);
    }

    setTaskQueueState(updatedQueue);

    try {
      await AsyncStorage.setItem('taskQueue', JSON.stringify(updatedQueue));
      await AsyncStorage.setItem('completedTasks', JSON.stringify(completedTasksStack.getStack()));
    } catch (error) {
      console.error('Failed to update AsyncStorage:', error);
    }
  };

  const deleteTask = async (id) => {
    const updatedQueue = taskQueueState.filter(task => task.id !== id);
    setTaskQueueState(updatedQueue);
    try {
      await AsyncStorage.setItem('taskQueue', JSON.stringify(updatedQueue));
    } catch (error) {
      console.error('Failed to delete task from AsyncStorage:', error);
    }
  };

  const editTask = (task) => {
    setText(task.task); // Set the task text to the input field for editing
    setIsEditing(task.id); // Mark the task as being edited
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      setTimer(selectedTime);
    }
  };

  const renderTodo = ({ item }) => {
    if (!item) return null;

    return (
      <View style={styles.todoItem}>
        <Text>{item.task} (Timer: {item.timer}s)</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => completeTask(item.id)}>
            <Icon name="checkmark-circle-outline" size={25} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => editTask(item)}>
            <Icon name="create-outline" size={25} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Icon name="trash-outline" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCompletedTask = ({ item }) => {
    if (!item) return null;

    return (
      <View style={styles.todoItem}>
        <Text>{item.task} (Completed)</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Homework Management App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={text}
        onChangeText={setText}
      />
      <Button title="Set Timer" onPress={showTimePicker} />
      {showPicker && (
        <DateTimePicker
          value={timer}
          mode="time"
          display="clock"
          onChange={onTimeChange}
          is24Hour={true}
        />
      )}
      <Button title={isEditing ? "Update Task" : "Add Task"} onPress={addTodo} />
      <Text style={styles.subHeading}>Pending Tasks:</Text>
      <FlatList
        data={taskQueueState}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.subHeading}>Completed Tasks:</Text>
      <FlatList
        data={completedTasksState}
        renderItem={renderCompletedTask}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TodoApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  todoItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
});
