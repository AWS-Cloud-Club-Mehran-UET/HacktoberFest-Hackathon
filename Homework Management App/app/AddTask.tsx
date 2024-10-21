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
import Spinner from 'react-native-loading-spinner-overlay';
const AddTask = () => {
  const [homework, setHomeWork] = useState();
  const [title, setTitle] = useState();
  const [loading,setLoading]=useState(false);

  const resetform = () => {
    setTitle("");
    setHomeWork("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (homework == "" || homework == null) {
      Alert.alert("Please fill complete requirments");
      setLoading(false);
      return;
    }
    if (title == "" || title == null) {
      Alert.alert("Please fill complete requirments");
      setLoading(false);
      return;
    } else {
    }
    try {
      const usersCollection = db.collection("Task");

      const documentRef = usersCollection.doc(title);

      const documentSnapshot = await documentRef.get();

      if (documentSnapshot.exists) {
        Alert.alert("Same HomeWork Already Exist");
        setLoading(false);
        return false;
      } else {
        await documentRef.set({
          title: title.toLowerCase(),
          homework: homework,
          status:'pending',
        });
        resetform();
        Alert.alert("HomeWork Sucessfully Added");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
        <Spinner
        visible={loading}
        size={'large'}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
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
