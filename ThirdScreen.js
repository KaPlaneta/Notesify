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

import Midi from "react-native-midi";
import { useEffect } from "react";
// import Test from "./Test";
import Line from "./assets/line.svg";
// import resolveAssetSource from "resolveAssetSource";

// const originalWidth = 210;
// const originalHeight = 297;
// const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// const sec = new Date().getSeconds(); //To get the Current Seconds
// console.log(sec);

function ThirdScreen({ route, navigation, props }) {
  const { image, musicalKey, chosenTimeSignature } = route.params;
  //   const [pitch, setPitch] = React.useState([]); raczej nie potrzebne
  //   const [start, setStart] = React.useState([]);
  const [stop, setStop] = React.useState([]); //potrzebny jeden setter do rerenderowania componentu czyli update stanu
  //   console.log("start: ", start);
  //   console.log("stop: ", stop);

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
      //   console.log("stop ", arrayStopRef.current); //zobacyzc czy stop dziala
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
      {/* <Test></Test> */}
      {/* <Staff></Staff> */}
      {/* <ImageBackground source={require("./assets/staff3.svg")} style={{ width: "50%", height: "60%" }}> */}
      <Staff
        // transform={[
        //   { scale: 0.5 },
        //   { translateX: windowWidth * -0.5 },
        //   { translateY: windowHeight * -0.5 },
        // ]}
        height={800}
        width={windowWidth}
      />
      <Metrum
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

      {/* <Image
        source={require("./assets/eightNote.png")}
        style={{
          width: "4%",
          height: "5%",
          resizeMode: "contain",
          position: "absolute",
          transform: [{ translateX: 60 }, { translateY: 500 }],
        }}
      /> */}
      {/* wywolanie funkcji displayNotes */}
      {displayNotes(
        arrayNotesRef.current,
        arrayStartRef.current,
        arrayStopRef.current
      )}

      {/* <Text>musicalKey: {JSON.stringify(musicalKey)}</Text>
      <Text>timeSignature: {JSON.stringify(selectedValue)}</Text> */}

      {/* </ImageBackground> */}
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
  //   let Picture;
  switch (props.selectedValue) {
    case "1/4":
      Picture = Jednaczwarta;
      return (
        <Jednaczwarta style={{ ...props.style, width: "7%", height: "5%" }} />
      );

    case "2/4":
      Picture = Dwieczwarte;
      return (
        <Dwieczwarte
          style={{
            ...props.style,
            width: "8%",
            height: "9%",
            transform: [{ translateX: 50 }, { translateY: 60 }],
          }}
        />
      );
    case "3/4":
      Picture = Trzyczwarte;
      return (
        <Trzyczwarte style={{ ...props.style, width: "7%", height: "5%" }} />
      );
    case "4/4":
      Picture = Czteryczwarte;
      return (
        <Czteryczwarte
          style={{
            ...props.style,
            width: "7%",
            height: "5%",
            transform: [{ translateX: 50 }, { translateY: 65 }],
          }}
        />
      );
    default:
      throw new Error(
        "You chose the wrong time signature: ",
        props.selectedValue
      );
  }
  //   return <Picture style={props.style} />;
}

const positionXFirstNote = 70;
const positionYFirstNote = 85;
function displayNotes(pitchArray, startArray, stopArray) {
  console.log("pitch: ", pitchArray);
  console.log("start: ", startArray);
  console.log("stop: ", stopArray);

  // tablica z numerami z potencjanlego midi
  //   const myArray = arrayNotesRef.current;
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
