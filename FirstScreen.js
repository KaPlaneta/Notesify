import React from "react";
import {
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
  Button,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  Stack,
  ScreenComponent,
} from "react-native";
import Logo from "./assets/logo.svg";
import { StatusBar } from "expo-status-bar";
import { ThemedButton } from "react-native-really-awesome-button";

function FirstScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <StatusBar style="auto" />

      <ThemedButton
        name="bruce"
        activityColor="#fffffff"
        style={styles.button}
        onPress={() => navigation.navigate("SecondScreen")}
      >
        CREATE SONG
      </ThemedButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f5f4",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#a82f7a",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fcf7fb",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  button: {
    marginBottom: 16,
    color: "#a82f7a",
  },
});

export default FirstScreen;
