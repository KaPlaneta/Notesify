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
  const [selectedValue, setSelectedValue] = useState("Metrum");
  const [durMol, setdurMol] = React.useState("dur");
  const [tonacja, settonacja] = React.useState(7);
  const make = musicTheory[durMol];
  const selectionString = make.name + " " + make.models[tonacja];
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <View style={styles.container}>
          <Text>Please choose metrum:</Text>
          <Picker
            selectedValue={selectedValue}
            style={{ width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="1/4" value="1/4" />
            <Picker.Item label="2/4" value="2/4" />
            <Picker.Item label="3/4" value="3/4" />
            <Picker.Item label="4/4" value="4/4" />
          </Picker>

          <View>
            <Text>Please choose major minor mode:</Text>
            <Picker
              selectedValue={durMol}
              onValueChange={(value) => {
                setdurMol(value);
                settonacja(0);
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
              selectedValue={tonacja}
              key={durMol}
              onValueChange={(value) => settonacja(value)}
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
          </View>
          <Button
            onPress={() =>
              navigation.navigate("ThirdScreen", {
                tonacja: make.models[tonacja],
              })
            }
            title="START"
            color="#a82f7a"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
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
