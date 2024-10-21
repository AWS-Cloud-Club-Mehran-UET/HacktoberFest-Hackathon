import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const taskQueue = new TaskQueue();
  const completedTasksStack = new CompletedTasksStack();

  // Fetch all tasks from AsyncStorage when the component mounts
  useEffect(() => {
    fetchTasks();
    // Ask for notification permissions
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

    // Add the new task to the queue
    const updatedQueue = [...taskQueueState, task];
    setTaskQueueState(updatedQueue);
    taskQueue.enqueue(task);
    scheduleNotification(task.task, task.timer);

    try {
      // Save updated task queue to AsyncStorage
      await AsyncStorage.setItem('taskQueue', JSON.stringify(updatedQueue));
      setText('');
      setTimer(new Date());
    } catch (error) {
      console.error('Failed to save task to AsyncStorage:', error);
    }
  };

  const completeTask = async (id) => {
    // Find and remove the completed task from the queue
    const updatedQueue = taskQueueState.filter(task => task.id !== id);
    const completedTask = taskQueueState.find(task => task.id === id);
    
    if (completedTask) {
      // Add the completed task to the completed stack
      const updatedCompletedTasks = [...completedTasksState, completedTask];
      setCompletedTasksState(updatedCompletedTasks);
      completedTasksStack.push(completedTask);
    }

    setTaskQueueState(updatedQueue);

    try {
      // Save the updated queues to AsyncStorage
      await AsyncStorage.setItem('taskQueue', JSON.stringify(updatedQueue));
      await AsyncStorage.setItem('completedTasks', JSON.stringify(completedTasksStack.getStack()));
    } catch (error) {
      console.error('Failed to update AsyncStorage:', error);
    }
  };

  const deleteTask = async (id) => {
    const updatedQueue = taskQueueState.filter(task => task && task.id !== id);
    setTaskQueueState(updatedQueue);
    try {
      await AsyncStorage.setItem('taskQueue', JSON.stringify(updatedQueue));
    } catch (error) {
      console.error('Failed to delete task from AsyncStorage:', error);
    }
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
    if (!item) return null; // Ensure the task item exists

    return (
      <View style={styles.todoItem}>
        <Text>{item.task} (Timer: {item.timer}s)</Text>
        <View style={styles.buttons}>
          <Button title="Complete" onPress={() => completeTask(item.id)} />
          <Button title="Delete" onPress={() => deleteTask(item.id)} />
        </View>
      </View>
    );
  };

  const renderCompletedTask = ({ item }) => {
    if (!item) return null; // Ensure the completed task item exists

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
      <Button title="Add Task" onPress={addTodo} />
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
