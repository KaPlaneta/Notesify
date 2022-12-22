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
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PickerIOS } from "@react-native-picker/picker";

function SecondScreen({ route, navigation }) {
  const [selectedValue, setSelectedValue] = useState("1/4");
  const [durMol, setDurMol] = React.useState("dur");
  const [musicalKey, setMusicalKey] = React.useState(1);
  const [bpm, setBpm] = React.useState(120);

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

        <Text>Enter BPM</Text>
        <TextInput
          placeholder="120"
          keyboardType="numeric"
          onChangeText={(value) => setBpm(value)}
          // value={this.state.number}
        />

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
              bpm,
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
const musicTheory = {
  dur: {
    name: "DUR",
    models: ["F-dur", "C-dur", "D-dur"],
  },
  mol: {
    name: "MOL",
    models: ["d-mol", "a-mol", "h-mol"],
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
