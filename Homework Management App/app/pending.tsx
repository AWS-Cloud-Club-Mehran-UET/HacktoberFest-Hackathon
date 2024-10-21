import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import { db } from "../components/firebase";
import Spinner from "react-native-loading-spinner-overlay";

const pending = () => {
  const [homeWork, setHomeWork] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [processingQueue, setProcessingQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const collectionRef = db
      .collection("Task")
      .where("status", "==", "pending");

    collectionRef
      .get()
      .then((querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          documents.push({ ...data });
        });
        setHomeWork((documents));

        
      })
      .catch((error) => {
        console.log("Error getting homeWork:", error);
      });
  }, [homeWork]);

  useEffect(() => {
    const collectionRef = db
      .collection("Task")
      .where("status", "==", "pending");

    collectionRef
      .get()
      .then((querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          documents.push({ ...data });
        });
        setHomeWork(documents);

        //Creating State for LIPO
        setProcessingQueue(documents);
      })
      .catch((error) => {
        console.log("Error getting homeWork:", error);
      });
  }, []); // empty array ensures this effect runs only once on mount

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const processNextTask = () => {
    setProcessingQueue((prevQueue) => {
      // Clone the queue and remove the last task (LIFO)
      const newQueue = [...prevQueue];
      const nextTask = newQueue.pop(); // LIFO: Take the last task
      
      if (nextTask) {
        console.log("Processing task:", nextTask);
        // Process the next task here...
        // For example, mark it as "completed" or perform an API call
      }

      // Return the updated queue after processing
      return newQueue;
    });
  };

  const completed = async (item) => {
    let title = item.title;
    console.log("Title", title);
    setLoading(true);
    try {
      db.collection("Task")
        .doc("chem")
        .update({
          status: "completed",
        })
        .then(() => {
          Alert.alert("Task Completed");
        })
        .catch((e) => {
          console.log("Erro", e);
        });
    } catch (error) {
      console.log("Error");
      setLoading(false);
    }
  };
  const filteredHomeWork = homeWork.filter((homeWork) =>
    homeWork.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
      <Spinner
        visible={loading}
        size={"large"}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={require("../assets/images/pending.png")}
          style={{ width: 50, height: 50 }}
        ></Image>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
          {item.title}
        </Text>
      </View>

      <TouchableOpacity style={{ padding: 8 }}>
        <Text style={{ color: "blue", fontSize: 17 }}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 8 }} onPress={() => completed(item)}>
        <Text style={{ color: "blue", fontSize: 17 }}>Complete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ padding: 24,
      display: "flex",
      marginVertical: 100,}}>
      <Text style={styles.sectionTitle}>Home Work</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 8,
          backgroundColor: "#fff",
          borderRadius: 8,
          margin: 16,
        }}
      >
        <TextInput
          style={{ flex: 1, height: 40, padding: 6 }}
          placeholder="Search HomeWork by Title"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <FlatList
        data={filteredHomeWork}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "600",
  },
});
export default pending;
