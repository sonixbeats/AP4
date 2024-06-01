import { Ionicons } from "@expo/vector-icons";
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
  VirtualizedList,
  Pressable,
} from "react-native";
import moment from "moment";

async function getAPIaddEvent(
  nom: string,
  date: Date,
  desc: string,
  imglink: string,
  lieu: string
) {
  try {
    const response = await fetch(
      "https://sql-mp-wpf.azurewebsites.net/DropEvent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          nom: nom,
          dateEvent: date.toISOString(),
          desc: desc,
          img: imglink,
          lieu: lieu,
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

export default function Events() {
  const [Events, setEvents] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [nomEvent, setNomEvent] = useState("");
  const [dateEvent, setDateEvent] = useState("");
  const [descEvent, setDescEvent] = useState("");
  const [eventImg, setEventImg] = useState("");
  const [eventLieu, setEventLieu] = useState("");

  useEffect(() => {
    fetch("https://sql-mp-wpf.azurewebsites.net/Events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error(error));
  }, []);

  const cards = Events.map((event: any, index: number) => (
    <View style={styles.card} key={index}>
      <Image source={{ uri: event.eventImg }} style={styles.image} />
      <Text style={styles.title}>{event.nomEvent}</Text>
      <Text style={styles.description}>{event.dateEvent.slice(0, 10)}</Text>
      <Text
        style={[
          styles.description,
          { marginTop: 0, fontSize: 16, letterSpacing: 5, fontWeight: "bold" },
        ]}
      >
        {event.eventLieu}
      </Text>
      <Text
        style={[
          styles.description,
          { fontSize: 16, textAlign: "right", marginRight: 10 },
        ]}
      >
        Organisateur :
        <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
           {event.prenom}
        </Text>
      </Text>
      <Pressable
        onPress={() => Alert.alert(event.eventLieu + "  |  " + event.descEvent)}
        style={styles.btn}
      >
        <Text style={styles.txtBtn}>En savoir plus</Text>
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

      <Pressable
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: "#181818",
          borderRadius: 40,
          padding: 10,
          width: 60,
          alignSelf: "center",
          position: "absolute",
          bottom: 20,
          right: 20,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text style={styles.txtBtn}>
          <Ionicons
            name="add-circle"
            size={40}
            color="white"
            style={styles.Icon}
          />
        </Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <View>
          <Text
            style={{
              color: "black",
              fontSize: 24,
              marginTop: 30,
              fontStyle: "italic",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Entrer les détails de l'évènement :
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width:450
            }}
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
              Nom :
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontStyle: "italic",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Date :
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={[styles.input, {
                width: 250,
              }]}
              placeholder="Nom Event"
              value={nomEvent}
              onChangeText={setNomEvent}
            />

            <TextInput
                            style={[styles.input, {
                              width: 120,
                            }]}
              placeholder="YYYY-MM-DD"
              value={dateEvent}
              onChangeText={setDateEvent}
              keyboardType="numeric"
            />
          </View>

          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Description de l'évènement :
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                height: 100,
                textAlignVertical: "top",
              },
            ]}
            placeholder="Description Event"
            value={descEvent}
            onChangeText={setDescEvent}
          />

          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Lien d'image de l'évènement :
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Event Image"
            value={eventImg}
            onChangeText={setEventImg}
          />

          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Lieu de l'évènement :
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Event Lieu"
            value={eventLieu}
            onChangeText={setEventLieu}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: 10,
          }}
        >
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: "#181818",
                width: 175,
                margin: 10,
              },
            ]}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text
              style={[
                styles.txtBtn,
                {
                  color: "white",
                },
              ]}
            >
              Fermer
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: "#181818",
                width: 175,
                margin: 10,
              },
            ]}
            onPress={() => {
              if (moment(dateEvent, "YYYY-MM-DD", true).isValid()) {
                getAPIaddEvent(
                  nomEvent,
                  new Date(dateEvent),
                  descEvent,
                  eventImg,
                  eventLieu
                );
                setModalVisible(false);
                ToastAndroid.show(
                  "Evenement ajouté avec succés",
                  ToastAndroid.SHORT
                );
              } else {
                // Display an error message or handle the invalid date format
                ToastAndroid.show(
                  "Format de date invalide",
                  ToastAndroid.SHORT
                );
              }
            }}
          >
            <Text
              style={[
                styles.txtBtn,
                {
                  color: "white",
                },
              ]}
            >
              Ajouter Évènement
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#181818",
    width: 300,
    height: 300,
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 45,
  },
  image: {
    width: 260,
    height: 150,
    borderRadius: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  description: {
    color: "#dedede",
    fontSize: 16,
    marginTop: 5,
  },
  btn: {
    backgroundColor: "tomato",
    borderRadius: 40,
    padding: 10,
    marginTop: 5,
    width: 260,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txtBtn: {
    color: "black",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
  },
  Icon: {
    width: 50,
    height: 50,
  },
  input: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
});
