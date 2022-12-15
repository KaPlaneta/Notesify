import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import Staff from "./assets/stafff.svg";
import Jednaczwarta from "./assets/1-4.svg";
import Dwieczwarte from "./assets/2-4.svg";
import Trzyczwarte from "./assets/3-4.svg";
import Czteryczwarte from "./assets/4-4.svg";

import Cross from "./assets/cross.svg";
import Flat from "./assets/flat.svg";

import Midi from "react-native-midi";
import { useEffect } from "react";
import Line from "./assets/line.svg";

// const originalWidth = 210;
// const originalHeight = 297;
// const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// const sec = new Date().getSeconds(); //To get the Current Seconds
// console.log(sec);

function ThirdScreen({ route, navigation, props }) {
  const { image, musicalKey, chosenTimeSignature } = route.params;

  const [stop, setStop] = React.useState([]); //potrzebny jeden setter do rerenderowania componentu czyli update stanu

  console.log("musicalKey", musicalKey);
  console.log("timeSignature", chosenTimeSignature);

  const arrayNotesRef = React.useRef([]);
  const arrayStartRef = React.useRef([]);
  const arrayStopRef = React.useRef([]);

  //   console.log("pitch: ", arrayNotesRef.current); //zobaczyc czy rerenderuje sie komponent

  useEffect(() => {
    Midi.on(Midi.NOTE_ON, (event) => {
      const time = new Date().getTime();
      // event.note - pojedynczy number ktory przychodzi
      // pitch - tablica numerow wysokosci
      // start -number kiedy sie zaczslo
      arrayNotesRef.current.push(event.note);
      arrayStartRef.current.push(time);

      //   console.log("note ", arrayNotesRef.current); //zobacyzc czy naciskanie dziala
      //   console.log("start ", arrayStartRef.current);

      //   arrayStart.push(time);
      //   setStart(arrayStart);

      //   console.log(`Device "${event.device}" started note: ${event.note}`);
    });

    Midi.on(Midi.NOTE_OFF, (event) => {
      const time = new Date().getTime();

      arrayStopRef.current.push(time);
      setStop([50]);
    });
    return () => {
      Midi.off(Midi.NOTE_ON);
      Midi.off(Midi.NOTE_OFF);
    };
  }, []);

  //   const [width, setWidth] = useState(0);
  //   const [height, setHeight] = useState(0);

  //   const onLayout = useCallback(
  //     (event) => {
  //       const containerWidth = event.nativeEvent.layout.width;

  //       if (props.ratio) {
  //         setWidth(containerWidth);
  //         setHeight(containerWidth * props.ratio);
  //       } else if (typeof props.source === "number") {
  //         const source = resolveAssetSource(props.source);

  //         setWidth(containerWidth);
  //         setHeight((containerWidth * source.height) / source.width);
  //       } else if (typeof props.source === "object") {
  //         Image.getSize(props.source.uri, (w, h) => {
  //           setWidth(containerWidth);
  //           setHeight((containerWidth * h) / w);
  //         });
  //       }
  //     },
  //     [props.ratio, props.source]
  //   );
  //   const originalWidth = 210;
  //   const originalHeight = 297;
  //   //   const aspectRatio = originalWidth / originalHeight;
  //   const windowWidth = Dimensions.get("window").width;
  //   const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView>
      <Staff
        // transform={[
        //   { scale: 0.5 },
        //   { translateX: windowWidth * -0.5 },
        //   { translateY: windowHeight * -0.5 },
        // ]}
        height={800}
        width={windowWidth}
      />
      <MusicalKey
        valueOfKey={musicalKey}
        style={{
          resizeMode: "contain",
          position: "absolute",
          transform: [{ translateX: 100 }, { translateY: 70 }],
        }}
      />
      <Metrum
        musicalKey={musicalKey}
        selectedValue={chosenTimeSignature}
        style={{
          resizeMode: "contain",
          position: "absolute",
          transform: [{ translateX: 50 }, { translateY: 75 }],
        }}
      />

      {/* <Line
        position="absolute"
        transform={[
          { translateX: windowWidth * -0.0053 },
          { translateY: windowHeight * -0.814 },
          { scale: 0.11 },
        ]}
        height={windowHeight * 2}
        width={windowWidth * 2}
      /> */}

      {/* wywolanie funkcji displayNotes */}
      {displayNotes(
        arrayNotesRef.current,
        arrayStartRef.current,
        arrayStopRef.current
      )}
    </SafeAreaView>
  );
}

const midiNumber = {
  24: "C",
  25: "Db",
  26: "D",
  27: "Eb",
  28: "E",
  29: "F",
  30: "Gb",
  31: "G",
  32: "Ab",
  33: "A",
  34: "B",
  35: "H",
};
const positionsY = {
  C: 0,
  //   Db: ,
  D: -6,
  //   Eb: ,
  E: -12,
  //   F: ,
  //   Gb: ,
  //   G: ,
  //   Ab: ,
  //   A: ,
  //   Bb: ,
  //   B: ,
};

function Metrum(props) {
  let changePosition = 0;
  if (props.musicalKey === "C-dur" || props.musicalKey === "a-mol") {
    changePosition = 0;
  } else if (props.musicalKey === "F-dur" || props.musicalKey === "d-mol") {
    changePosition = 10;
  } else if (props.musicalKey === "D-dur" || props.musicalKey === "h-mol") {
    changePosition = 20;
  }
  switch (props.selectedValue) {
    case "1/4":
      return (
        <Jednaczwarta
          style={{
            ...props.style,
            width: "7%",
            height: "5%",
            transform: [
              { translateX: 55 + changePosition },
              { translateY: 75 },
            ],
          }}
        />
      );

    case "2/4":
      return (
        <Dwieczwarte
          style={{
            ...props.style,
            width: "8%",
            height: "9%",
            transform: [
              { translateX: 55 + changePosition },
              { translateY: 60 },
            ],
          }}
        />
      );
    case "3/4":
      return (
        <Trzyczwarte
          style={{
            ...props.style,
            width: "7%",
            height: "5%",
            transform: [
              { translateX: 55 + changePosition },
              { translateY: 75 },
            ],
          }}
        />
      );
    case "4/4":
      return (
        <Czteryczwarte
          style={{
            ...props.style,
            width: "7%",
            height: "5%",
            transform: [
              { translateX: 57 + changePosition },
              { translateY: 65 },
            ],
          }}
        />
      );
    default:
      throw new Error(
        "You choose the wrong time signature: ",
        props.selectedValue
      );
  }
}

function MusicalKey(props) {
  switch (props.valueOfKey) {
    case "F-dur":
    case "d-mol":
      return (
        <Flat
          style={{
            ...props.style,
            position: "absolute",
            width: "4%",
            height: "3.5%",
            transform: [{ translateX: 50 }, { translateY: 75 }],
          }}
        />
      );
    case "D-dur":
    case "h-mol":
      return (
        <>
          <Cross
            style={{
              ...props.style,
              width: "4%",
              height: "3.5%",
              transform: [{ translateX: 50 }, { translateY: 60 }],
            }}
          />
          <Cross
            style={{
              ...props.style,
              position: "absolute",
              width: "4%",
              height: "3.5%",
              transform: [{ translateX: 60 }, { translateY: 75 }],
            }}
          />
        </>
      );
    case "C-dur":
    case "a-mol":
      return;
    default:
      throw new Error("You choose the wrong musical key: ", props.valueOfKey);
  }
}

const positionXFirstNote = 70;
const positionYFirstNote = 85;
function displayNotes(pitchArray, startArray, stopArray) {
  console.log("pitch: ", pitchArray);
  console.log("start: ", startArray);
  console.log("stop: ", stopArray);

  const notesArray = [];

  for (let i = 0; i < pitchArray.length; i++) {
    const firstNote = pitchArray[i];
    const durationInMs = stopArray[i] - startArray[i];

    console.log("firstnote ", firstNote);

    console.log("midinumber ", midiNumber[firstNote]);
    console.log("position ", positionsY[midiNumber[firstNote]]);
    console.log("duration", durationInMs);

    const translateX = 20 * i + positionXFirstNote;
    const translateY = positionsY[midiNumber[firstNote]] + positionYFirstNote;

    console.log(translateY, translateX);

    //tutaj do zmiennej przypisany komponent
    const note = (
      <Image
        source={require("./assets/eightNote.png")}
        key={i}
        style={{
          width: "6%",
          height: "7%",
          resizeMode: "contain",
          position: "absolute",
          transform: [{ translateX }, { translateY }],
        }}
      />
    );

    notesArray.push(note); //dodawanie do tablicy
  }

  return notesArray; //odnosi sie do funkcji
}
export default ThirdScreen;
//  export{DetailsScreen};
export { displayNotes };
