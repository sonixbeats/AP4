import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Alert,
  Linking,
  VirtualizedList,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export default function Musicslist() {
  const [Music, setmusic] = useState([]);

  useEffect(() => {
    fetch("https://sql-mp-wpf.azurewebsites.net/ProdDetails")
      .then((response) => response.json())
      .then((data) => setmusic(data))
      .catch((error) => console.error(error));
  }, []);

  const cards = Music.map((music: any, index: number) => (
    <View style={styles.card} key={index}>
      <Image
        source={{ uri: music.imgLink }}
        style={{
          width: 350,
          height: 350,
          marginBottom: 10,
          borderRadius: 20,
        }}
      />

      <Text style={styles.title}>{music.nomProd}</Text>
      <Text style={styles.description}>{music.bpm} BPM</Text>
      <Text
        style={[
          styles.description,
          { marginTop: 0, fontSize: 16, letterSpacing: 5, fontWeight: "bold" },
        ]}
      >
        {music.nomStyle}
      </Text>
      <Text
        style={[
          styles.description,
          { fontSize: 16, textAlign: "right", marginRight: 10 },
        ]}
      >
        Artiste :
        <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
           {music.artistName}
        </Text>
      </Text>
      <Ionicons
        name="information-circle-outline"
        size={24}
        color="white"
        style={styles.Icon}
        onPress={() =>
          Alert.alert(
            music.artistName +
              "  |  " +
              music.bpm +
              " BPM" +
              "  |  " +
              music.nomStyle +
              "  |  " +
              music.imgLink.slice(0, 25) +
              "..." +
              "  |  " +
              music.ytbLink
          )
        }
      />
      <Pressable
        style={styles.button}
        onPress={() => Linking.openURL(music.ytbLink)}
      >
        <Text style={styles.TextButton}>Écouter</Text>
      </Pressable>
    </View>
  ));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        backgroundColor: "#f2f2f2",
      }}
    >
      <VirtualizedList
        style={{ flexDirection: "column" }}
        data={cards}
        getItemCount={() => cards.length}
        getItem={(data, index) => data[index]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#181818",
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#dedede",
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    color: "#dedede",
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "white",
  },
  Icon: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 30,
    right: 1,
  },
  TextButton: {
    fontSize: 21,
    letterSpacing: 0.25,
    color: "black",
    fontWeight: "bold",
    fontStyle: "italic",
  },

  modalView: {
    position: "absolute",
    left: "12.3%",
    top: "0%",
    width: "90%",
    transform: [{ translateX: -50 }, { translateY: 200 }],
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    backgroundColor: "red",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonClose: {
    backgroundColor: "black",
    width: 200,
    borderRadius: 20,
    margin: 10,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 20,
  },
});
