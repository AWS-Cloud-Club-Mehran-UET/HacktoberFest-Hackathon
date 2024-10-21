import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  View,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

const index = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ display: "flex", alignItems: "center" }}
        source={require("../assets/images/Logo.png")}
      ></Image>
      <View style={styles.rowContainer}>
        <View style={styles.cardContainer}>
          <Image
            source={require("../assets/images/AddTask.png")}
            style={styles.cardImage}
          />
          <TouchableOpacity
            style={[styles.touchContainer]}
            onPress={() => {
              router.push("./AddTask");
            }}
          >
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <Image
            source={require("../assets/images/pending.png")}
            style={styles.cardImage}
          />
          <TouchableOpacity
            style={[styles.touchContainer]}
            onPress={() => router.push("/pending")}
          >
            <Text style={styles.buttonText}>Show Pending Task</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.cardContainer}>
          <Image
            source={require("../assets/images/complete.png")}
            style={styles.cardImage}
          />
          <TouchableOpacity
            style={[styles.touchContainer]}
            onPress={() => router.push("/CompletedTask")}
          >
            <Text style={styles.buttonText}>Show Completed Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between", // Adjust spacing between cards horizontally
    marginBottom: 50,
    marginHorizontal: 10, // Add gap between individual cards of each row
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 10, // Add space between cards within a row
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  touchContainer: {
    alignItems: "center",
    backgroundColor: "#3A0A6A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "300",
    fontSize: 13,
    color: "white",
    textAlign: "center",
  },
});
export default index;
