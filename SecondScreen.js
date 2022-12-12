import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PickerIOS } from "@react-native-picker/picker";

function SecondScreen({ route, navigation }) {
  const [selectedValue, setSelectedValue] = useState("1/4");
  const [durMol, setDurMol] = React.useState("dur");
  const [musicalKey, setMusicalKey] = React.useState(7);
  const make = musicTheory[durMol];
  const selectionString = make.name + " " + make.models[musicalKey];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <View> */}
        <Text>Please choose time signature:</Text>
        <Picker
          selectedValue={selectedValue}
          style={{ width: 150 }}
          onValueChange={(value) => setSelectedValue(value)}
        >
          <Picker.Item label="1/4" value="1/4" />
          <Picker.Item label="2/4" value="2/4" />
          <Picker.Item label="3/4" value="3/4" />
          <Picker.Item label="4/4" value="4/4" />
        </Picker>

        <Text>Please choose major minor mode:</Text>
        <Picker
          selectedValue={durMol}
          onValueChange={(value) => {
            setDurMol(value);
            setMusicalKey(0);
          }}
        >
          {Object.keys(musicTheory).map((value) => (
            <Picker.Item
              key={value}
              value={value}
              label={musicTheory[value].name}
            />
          ))}
        </Picker>
        <Text>Please choose a key of {make.name}:</Text>
        <Picker
          selectedValue={musicalKey}
          key={durMol}
          onValueChange={(value) => setMusicalKey(value)}
        >
          {musicTheory[durMol].models.map((modelName, value) => (
            <Picker.Item
              key={`${durMol}_${value}`}
              value={value}
              label={modelName}
            />
          ))}
        </Picker>
        <Text>You selected: {selectionString}</Text>
        <Button
          onPress={() =>
            navigation.navigate("ThirdScreen", {
              // image: goSaveImage(),
              musicalKey: make.models[musicalKey],
              chosenTimeSignature: selectedValue,
            })
          }
          title="START"
          color="#a82f7a"
        />
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

// const timeSignature = { metra: ["1/4", "2/4", "3/4", "4/4"] };
const musicTheory = {
  dur: {
    name: "DUR",
    models: [
      "Ces-dur",
      "Ges-dur",
      "Des-dur",
      "As-dur",
      "Es-dur",
      "B-dur",
      "F-dur",
      "C-dur",
      "G-dur",
      "D-dur",
      "A-dur",
      "E-dur",
      "H-dur",
      "Fis-dur",
      "Cis-dur",
    ],
  },
  mol: {
    name: "MOL",
    models: [
      "as-mol",
      "es-mol",
      "b-mol",
      "f-mol",
      "c-mol",
      "g-mol",
      "d-mol",
      "a-mol",
      "e-mol",
      "h-mol",
      "fis-mol",
      "cis-mol",
      "gis-mol",
      "dis-mol",
      "ais-mol",
    ],
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f5f4",
    flexDirection: "column",
  },
  elementContainer: {
    marginTop: 8,
  },
  heading: {
    fontSize: 22,
    color: "black",
  },
});

export default SecondScreen;
