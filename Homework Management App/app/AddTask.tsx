import { db } from "@/components/firebase";
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
  const [title, setTitle] = useState();

  const resetform = () => {
    setTitle("");
    setHomeWork("");
  };

  const handleSubmit = async () => {
    if (homework == "" || homework == null) {
      Alert.alert("Please fill complete requirments");
      return;
    }
    if (title == "" || title == null) {
      Alert.alert("Please fill complete requirments");
      return;
    } else {
    }
    try {
      const usersCollection = db.collection("Task");

      const documentRef = usersCollection.doc(title);

      const documentSnapshot = await documentRef.get();

      if (documentSnapshot.exists) {
        Alert.alert("Same HomeWork Already Exist");
        return false;
      } else {
        await documentRef.set({
          title: title,
          homework: homework,
          status:'pending',
        });
        resetform();
        Alert.alert("HomeWork Sucessfully Added");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Home Work</Text>
        <TextInput
          style={styles.title}
          placeholder="Title Of HomeWork"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
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
  title: {
    height: 50,
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
