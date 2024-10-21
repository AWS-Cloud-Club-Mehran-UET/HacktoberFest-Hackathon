import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { db } from "../components/firebase";

const pending = () => {
  const [homeWorkd, setHomeWork] = useState([]);
  const [searchText, setSearchText] = useState("");
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
        setHomeWork(documents);
      })
      .catch((error) => {
        console.log("Error getting engineers:", error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  //   const filteredEngineers = engineers.filter(
  //     (engineer) =>
  //       engineer.Username.toLowerCase().includes(searchText.toLowerCase())
  //   );

  const handleViewEngineer = () => {};

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={require("../assets/images/complete.png")}
          style={{ width: 50, height: 50 }}
        ></Image>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 20 }}>
          {" "}
          {item.Username}
        </Text>
      </View>

      <TouchableOpacity style={{ padding: 8 }}>
        <Text style={{ color: "blue", fontSize: 17 }}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 8 }}>
        <Text style={{ color: "blue", fontSize: 17 }}>Assign</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Text>Pending Home Work</Text>
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
          //   onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      {/* <FlatList
        // data={filteredEngineers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
    </View>
  );
};

export default pending;
