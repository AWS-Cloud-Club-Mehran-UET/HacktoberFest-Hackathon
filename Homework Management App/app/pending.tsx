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
} from "react-native";
import { db } from "../components/firebase";

const pending = () => {
  const [homeWork, setHomeWork] = useState([]);
  const [searchText, setSearchText] = useState("");
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
      })
      .catch((error) => {
        console.log("Error getting engineers:", error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const completed=async(item)=>{
    db.collection('RequestService').doc(item.title).update({
      status: "completed"
    })
  }
    const filteredHomeWork = homeWork.filter(
      (homeWork) =>
        homeWork.title.toLowerCase().includes(searchText.toLowerCase())
    );


  const renderItem = ({ item }) => (
    <View   style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={require("../assets/images/pending.png")}
          style={{ width: 50, height: 50 }}
        ></Image>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop:10 }}>{item.title}</Text>
      </View>

      <TouchableOpacity style={{ padding: 8 }}>
        <Text style={{ color: "blue", fontSize: 17 }}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 8 }} onPress={()=>completed(item)}>
        <Text style={{ color: "blue", fontSize: 17 }}>Complete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{display:'flex',marginVertical:50}}>
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
          placeholder="Search Engineer by name"
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

const styles=StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "600",
  },
})
export default pending;
