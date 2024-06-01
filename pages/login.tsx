import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, ToastAndroid, Pressable, Text } from "react-native";

export default function Login({navigation}) {
  const [email, setUsername] = useState("user@user.com");
  const [password, setPassword] = useState("Untest123");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://sql-mp-wpf.azurewebsites.net/Login",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json', mail:email, pwd:password }
        }
      );

      if (response.ok) {
        // Login successful
        ToastAndroid.show("Login successful, Welcome!", ToastAndroid.SHORT);
        navigation.replace('Tabs');
      } else {
        // Login failed
        ToastAndroid.show("Login failed, Invalid mail or password", ToastAndroid.SHORT);
      }
    } catch (error) {
      // Handle network error
      ToastAndroid.show("Error, An error occurred while logging in", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        fontStyle:'italic'
      }}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={{
        backgroundColor: "#181818",
        padding: 10,
        borderRadius: 40,
        margin: 10,
        alignItems: "center",
        width: "60%"
      }} onPress={handleLogin} >
        <Text 
          style={{
            color: "white"
          }}
        >
          Se connecter
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 15
  },
});