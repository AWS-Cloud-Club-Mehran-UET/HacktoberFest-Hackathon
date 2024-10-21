import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Pressable, ScrollViewBase, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

import { theme } from '../../constants/theme';
import { hp } from '../../helpers/common';
import { MaterialIcons } from '@expo/vector-icons';


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

// TodoApp component to manage tasks
const TodoApp = () => {
    // State to manage task text input
    const [text, setText] = useState('');
    // State to manage task queue
    const [taskQueueState, setTaskQueueState] = useState([]);
    // State to manage completed tasks
    const [completedTasksState, setCompletedTasksState] = useState([]);
    // State to manage timer for tasks
    const [timer, setTimer] = useState(new Date());
    // State to manage time picker visibility
    const [showPicker, setShowPicker] = useState(false);
    // State to manage editing
    const [isEditing, setIsEditing] = useState(null);
    // TaskQueue (FIFO) for pending tasks
    const taskQueue = new TaskQueue();
    // CompletedTasksStack (LIFO) for completed tasks
    const completedTasksStack = new CompletedTasksStack();


    // Fetch tasks from AsyncStorage on component mount
    useEffect(() => {
        fetchTasks();
        Notifications.requestPermissionsAsync();
    }, []);
    // Fetch tasks from AsyncStorage
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


    // Schedule notification for a task
    const scheduleNotification = (task, timerInSeconds) => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: "To-Do Reminder",
                body: `Time's up for: ${task}`,
            },
            trigger: { seconds: timerInSeconds },
        });
    };


    // Add a new task to the queue
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
    // Mark a task as completed
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

    // Delete a task from the queue

    const deleteTask = async (id) => {
        const updatedQueue = taskQueueState.filter(task => task.id !== id);
        setTaskQueueState(updatedQueue);
        try {
            await AsyncStorage.setItem('taskQueue', JSON.stringify(updatedQueue));
        } catch (error) {
            console.error('Failed to delete task from AsyncStorage:', error);
        }
    };


    // Edit a task in the queue
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

    // Delete a task from the completed tasks stack

    const deleteTaskComp = async (id) => {
        const updatedStack = completedTasksState.filter(task => task.id !== id);
        setCompletedTasksState(updatedStack);
        try {
            await AsyncStorage.setItem('completedTasks', JSON.stringify(updatedStack));
        } catch (error) {
            console.error('Failed to delete task from AsyncStorage:', error);
        }
    };


    // Render a task item
    const renderTodo = ({ item }) => {
        if (!item) return null;

        return (
            <View style={{
                padding: 15,
                marginVertical: 10,
                backgroundColor: '#f9f9f9',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{
                    fontSize: 18,
                    color: '#333',
                    fontWeight: 'bold'
                }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 50 }}>


                        <Text style={{
                            width: 80,
                        }}>
                            {item.task}

                        </Text>
                        <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 50 }}>




                        </Text>

                    </View>


                </View>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View>
                        <Text>
                            <MaterialIcons name="timer" size={24} color="#45b3e0"
                                style={{ marginTop: 10 }}
                            />


                        </Text>
                        <Text
                            style={{
                                fontSize: 10,
                            }}
                        >
                            {item.timer}s
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => editTask(item)} style={{
                        marginHorizontal: 10
                    }}>
                        <MaterialIcons name="edit" size={24} color="#45b3e0" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteTask(item.id)} style={{
                        marginHorizontal: 10
                    }}>
                        <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => completeTask(item.id)} style={{
                        marginHorizontal: 10
                    }}>
                        <MaterialIcons name="check" size={24} color="#4CAF50" />

                    </TouchableOpacity>
                </View>
            </View>

        );
    };

    // Render a completed task item
    const renderCompletedTask = ({ item }) => {
        if (!item) return null;

        return (
            <View style={{
                padding: 15,
                marginVertical: 10,
                backgroundColor: '#f9f9f9',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                    <MaterialIcons name="check" size={24} color="#4CAF50" />
                    <Text
                        style={{
                            width: 200
                        }}
                    >{item.task} (Completed)</Text>
                    <Pressable onPress={() => deleteTaskComp(item.id)} style={{
                        marginHorizontal: 10
                    }}>
                        <MaterialIcons name="delete" size={24} color="red" />
                    </Pressable>
                </View>

            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <Image source={require('../../assets/images/homework.png')} style={{ width: 50, height: 50 }} />
                <Text style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: '#333',
                    flexWrap: 'wrap',
                }}>

                    Homework Management App</Text>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>



                <TextInput
                    style={[styles.input, {
                        flex: 1,
                    }]}
                    placeholder="Enter a task"
                    value={text}
                    onChangeText={setText}
                />




                <Pressable onPress={showTimePicker} style={{
                    backgroundColor: theme.colors.primary,

                    borderRadius: 5,
                    marginLeft: 10,
                }}>
                    <MaterialIcons name="timer"

                        size={24} color="#fff" />
                </Pressable>


            </View>
            {showPicker && (
                <DateTimePicker
                    value={timer}
                    mode="time"
                    display="clock"
                    onChange={onTimeChange}
                    is24Hour={true}
                />
            )}



            <Button style={{ backgroundColor: 'yellow' }} title={isEditing ? "Update Task" : "Add Task"} onPress={addTodo} />
            <Text style={styles.subHeading}>Pending Tasks:</Text>

            <FlatList
                data={taskQueueState}
                renderItem={renderTodo}
                style={{ height: hp(25) }}
                scrollEnabled={true}
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
    button: {
        backgroundColor: theme.colors.primary,
        height: hp(6.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: theme.radius.xl
    },
});
