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

const CompletedTask = () => {
  const [homeWork, setHomeWork] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showTask,setShowTask]=useState(false);
  useEffect(() => {
    const collectionRef = db
      .collection("Task")
      .where("status", "==", "completed");

    collectionRef
      .get()
      .then((querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          documents.push({ ...data });
        });
        setHomeWork((documents).reverse());
      })
      .catch((error) => {
        console.log("Error getting engineers:", error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredHomeWork = homeWork.filter((homeWork) =>
    homeWork.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
      <Modal visible={showTask}  >
        <View style={styles.modalContainer}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text>{item.homework}</Text>
          <TouchableOpacity style={{ padding: 8 }} onPress={()=>setShowTask(false)}>
        <Text style={{ color: "blue", fontSize: 17 }}>Close</Text>
      </TouchableOpacity>
        </View>
      </Modal>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={require("../assets/images/pending.png")}
          style={{ width: 50, height: 50 }}
        ></Image>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
          {item.title}
        </Text>
      </View>
      <TouchableOpacity style={{ padding: 8 }} onPress={()=>setShowTask(true)}>
        <Text style={{ color: "blue", fontSize: 17 }}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 8 }}>
        <Text style={{ color: "green", fontSize: 17 }}>Completed</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ display: "flex", marginVertical: 50 }}>
      <Text style={styles.sectionTitle}>Completed Home Work</Text>

      
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
          placeholder="Search Completed task"
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
modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalButton: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'gray',
    color: 'white',
  },
});
export default CompletedTask;
