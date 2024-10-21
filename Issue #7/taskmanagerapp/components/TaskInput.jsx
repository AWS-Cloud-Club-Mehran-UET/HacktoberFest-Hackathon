import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    onAddTask(task);
    setTask('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    marginRight: 10,
  },
});

export default TaskInput;
