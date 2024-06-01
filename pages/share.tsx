import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ToastAndroid,
  Image,
  Modal,
  Text,
  Platform,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAvoidingView } from "react-native";

async function getAPIaddMusic(
  nomProd: string,
  bpm: number,
  imgLink: string,
  ytbLink: string,
  artistName: string,
  idStyle: number
) {
  try {
    const response = await fetch(
      "https://sql-mp-wpf.azurewebsites.net/DropMusic",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          nomProd: nomProd,
          bpm: bpm.toString(),
          imgLink: imgLink,
          ytbLink: ytbLink,
          artistName: artistName,
          idStyle: idStyle.toString(),
        },
      }
    );
    if (response.status === 200) {
      Alert.alert("Data sent", JSON.stringify(response));
      return true;
    } else {
      throw new Error("Failed to upload data");
    }
  } catch (error) {
    Alert.alert("Error");
  }
}

export default function Share() {
  const [nomProd, setnomProd] = useState("");
  const [bpm, setBpm] = useState(1);
  const [imgLink, setimgLink] = useState("");
  const [ytbLink, setytbLink] = useState("");
  const [artistName, setartistName] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [idStyle, setidStyle] = useState(1);
  const [stylesData, setStylesData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Call handleStyle when component mounts
    handleStyle();
  }, []);

  const handleStyle = () => {
    const stylesData = [
      { idStyle: 0, nomStyle: "- choose a style -" },
      { idStyle: 1, nomStyle: "TRAP" },
      { idStyle: 2, nomStyle: "ROCK" },
      { idStyle: 3, nomStyle: "DNB" },
      { idStyle: 4, nomStyle: "RNB" },
      { idStyle: 5, nomStyle: "REGGEA" },
      { idStyle: 6, nomStyle: "AFRO" },
      { idStyle: 7, nomStyle: "CLASSIC" },
      { idStyle: 8, nomStyle: "ELECTRO" },
      { idStyle: 9, nomStyle: "LOFI" },
      { idStyle: 10, nomStyle: "PHONK" },
      { idStyle: 11, nomStyle: "HOUSE" },
    ];

    const styles = stylesData.map(
      (item) => item.idStyle + "  |  " + item.nomStyle
    );
    setStylesData(styles as never[]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View
        style={[
          styles.container,
          {
            marginTop: 20,
          },
        ]}
      >
        <View style={styles.AnotherContainer}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginBottom: 16,
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            Share your music
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginBottom: 16,
              fontStyle: "italic",
            }}
          >
            Show your universe to the world
          </Text>
          <Image source={{ uri: imgLink }} style={styles.image} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 350,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Song Name"
              value={nomProd}
              onChangeText={setnomProd}
            />

            <TextInput
              style={styles.input}
              placeholder="Artist Name"
              value={artistName}
              onChangeText={setartistName}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 350,
            }}
          >
            <Picker
              style={styles.Picker}
              placeholder="Style"
              selectedValue={selectedStyle}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedStyle(itemValue);
                setidStyle(itemIndex);
                ToastAndroid.show(
                  `Selected Style: ${itemValue}  |  ID: ${itemIndex + 1}`,
                  ToastAndroid.SHORT
                );
              }}
            >
              {stylesData.map((style) => (
                <Picker.Item key={style} label={style} value={style} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="BPM"
              value={bpm.toString()}
              onChangeText={(text) => setBpm(parseInt(text) || 0)}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 350,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Youtube URL"
              value={ytbLink}
              onChangeText={setytbLink}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={imgLink}
              onChangeText={setimgLink}
            />
          </View>

          <Pressable
            onPress={() => {
              if (
                nomProd.trim() === "" ||
                imgLink.trim() === "" ||
                ytbLink.trim() === "" ||
                artistName.trim() === ""
              ) {
                return;
              }
              setShowModal(true);
            }}
            disabled={
              nomProd.trim() === "" ||
              imgLink.trim() === "" ||
              ytbLink.trim() === "" ||
              artistName.trim() === ""
            }
            style={[
              styles.button,
              {
                width: 350,
                borderRadius: 18,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  nomProd.trim() === "" ||
                  imgLink.trim() === "" ||
                  ytbLink.trim() === "" ||
                  artistName.trim() === ""
                    ? "grey"
                    : "black",
              },
            ]}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontStyle: "italic",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Share
            </Text>
          </Pressable>

          <Modal visible={showModal} animationType="slide">
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Are you sure you want to send your music?
              </Text>
              <View style={styles.modalButtonsContainer}>
                <Pressable
                  onPress={() => setShowModal(false)}
                  style={styles.button}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    getAPIaddMusic(
                      nomProd,
                      bpm,
                      imgLink,
                      ytbLink,
                      artistName,
                      idStyle
                    )
                  }
                  style={styles.button}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontStyle: "italic",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    SHARE
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: 170,
    height: 50,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 24,
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
    fontStyle: "italic",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  Picker: {
    width: 170,
    height: 40,
    marginBottom: 16,
    borderRadius: 40,
    backgroundColor: "white",
  },
  button: {
    width: 100,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  AnotherContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181818",
    padding: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
