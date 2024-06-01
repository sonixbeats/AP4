import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Pressable,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.stepContainer}>
        <Image
          source={{
            uri: "https://sonixbeats.github.io/gallery/public/assets/images/sonixlogo.png",
          }}
          style={{
            width: 100,
            height: 100,
            marginBottom: 50,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 20,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Bienvenue
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Explorez, découvrez et partagez des sons inédits !
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Faites savoir votre talent au monde entier et rencontrez des gens
          talentueux avec qui vous aurez peut être la chance de collaborer
        </Text>
      </View>
      <Pressable
        onPress={() => {
          navigation.replace("Login");
        }}
        style={{
          backgroundColor: "#181818",
          padding: 10,
          borderRadius: 15,
          margin: 10,
          alignItems: "center",
          width: "30%",
          position: "absolute",
          top: 50,
          right: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    width: 350,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
