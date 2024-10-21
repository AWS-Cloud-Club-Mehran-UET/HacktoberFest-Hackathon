import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const AddTask = () => {
  const [homework, setHomeWork] = useState();

    const resetform =()=>{
      setHomeWork('');
      }

  const handleSubmit = () => {
    if (homework == "" || homework == null) {
      Alert.alert("Please enter student name");
      return;
    }

    else{
        
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Home Work</Text>
        <TextInput
          style={styles.input}
          placeholder="Please Insert your work"
          value={homework}
          onChangeText={(text) => setHomeWork(text)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    display: "flex",
    marginVertical: 100,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "600",
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  checkboxText: {
    fontSize: 18,
  },
  consentContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: "#333",
    padding: 16,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default AddTask;
