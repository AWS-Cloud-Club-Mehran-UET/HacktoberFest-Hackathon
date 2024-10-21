import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

// TaskQueue (FIFO) for pending tasks
class TaskQueue {
  constructor() {
    this.queue = [];
  }

  // Add task to the queue
  enqueue(task) {
    this.queue.push(task);
  }

  // Remove task from the queue (FIFO)
  dequeue() {
    return this.queue.shift();
  }

  // Get the next task in the queue
  peek() {
    return this.queue[0];
  }

  // Get the current queue length
  length() {
    return this.queue.length;
  }
}

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Task queue to manage pending tasks
  const taskQueue = new TaskQueue();

  // Add task to queue and storage
  const addTask = async () => {
    if (task.length === 0) {
      Alert.alert('Error', 'Task cannot be empty!');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      taskName: task,
      date: selectedDate,
    };

    taskQueue.enqueue(newTask);
    setTaskList([...taskList, newTask]);
    setTask('');
    storeTaskList([...taskList, newTask]);
    scheduleNotification(newTask);
  };

  // Store task list in AsyncStorage
  const storeTaskList = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error storing tasks: ', error);
    }
  };

  // Load tasks from AsyncStorage
  const loadTaskList = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTaskList(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks: ', error);
    }
  };

  // Schedule notifications for tasks
  const scheduleNotification = async (task) => {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: `${task.taskName} is scheduled for ${task.date.toLocaleDateString()}`,
      },
      trigger: {
        date: task.date,
      },
    });
    console.log('Notification scheduled with ID: ', notificationId);
  };

  // Handle date picker
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  useEffect(() => {
    loadTaskList();

    // Handle notification permissions
    const askNotificationPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissions required', 'You need to grant notification permissions.');
      }
    };

    askNotificationPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />

      <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.taskName} - {item.date.toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
