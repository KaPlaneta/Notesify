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

const cwiercnuta = 1;
const osemka = 0.5;
const szesnastka = 0.25;
const polnuta = 2;
const calanuta = 4;

const nutki = {
  1: require("./assets/quarterNote.png"),
  0.5: require("./assets/eightNote.png"),
  0.25: require("./assets/sixteenNote.png"),
  2: require("./assets/halfNote.png"),
  4: require("./assets/note.png"),
};

const positionXFirstNote = 75;
const positionYFirstNote = 63;
const miliSecondInMinute = 60000;
const valueXBetweenNotes = 35; //

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ThirdScreen({ route, navigation, props }) {
  const { bpm, musicalKey, chosenTimeSignature } = route.params;

  const [fakeStop, setFakeStop] = React.useState([]);
  const [show_Hide, setShowHide] = useState("none");
  console.log("musicalKey", musicalKey);
  console.log("timeSignature", chosenTimeSignature);

  const arrayNotesRef = React.useRef([]);
  const arrayStartRef = React.useRef([]);
  const arrayStopRef = React.useRef([]);

  useEffect(() => {
    Midi.on(Midi.NOTE_ON, (event) => {
      const time = new Date().getTime();

      arrayNotesRef.current.push(event.note);
      arrayStartRef.current.push(time);
    });

    Midi.on(Midi.NOTE_OFF, (event) => {
      const time = new Date().getTime();

      arrayStopRef.current.push(time);
      setFakeStop([50]);
    });
    return () => {
      Midi.off(Midi.NOTE_ON);
      Midi.off(Midi.NOTE_OFF);
    };
  }, []);

  const letToggle = () => {
    if (show_Hide === "flex") {
      setShowHide("none");
    } else {
      setShowHide("flex");
    }
  };

  return (
    <SafeAreaView>
      <Staff height={800} width={windowWidth} />

      <View
        style={{
          position: "absolute",
          width: "20%",
          height: "10%",
          transform: [{ translateX: 80 }, { translateY: 46 }],
        }}
      >
        <Text>= {bpm}</Text>
      </View>
      <Image
        source={require("./assets/quarterNote.png")}
        style={{
          width: "9%",
          height: "9%",
          resizeMode: "contain",
          position: "absolute",
          transform: [{ translateX: 55 }, { translateY: 10 }],
        }}
      />
      <View
        style={{
          position: "absolute",
          width: "20%",
          height: "10%",
          transform: [{ translateX: 250 }, { translateY: 530 }],
        }}
      >
        <Image
          source={require("./assets/endSong.png")}
          style={{
            width: "1020%",
            height: "240%",
            resizeMode: "contain",
            position: "absolute",
            display: show_Hide,
            transform: [{ translateX: -330 }, { translateY: -377 }],
          }}
        />

        <Button
          onPress={letToggle}
          style={{
            position: "absolute",
            resizeMode: "contain",
          }}
          title="END SONG"
          color="#a82f7a"
        />
      </View>

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

      {displayNotes(
        musicalKey,
        arrayNotesRef.current,
        arrayStopRef.current,
        bpm,
        chosenTimeSignature,
        show_Hide
      )}
    </SafeAreaView>
  );
}

const midiNumber = {
  24: "C1",
  25: "Cis1",
  26: "D1",
  27: "Dis1",
  28: "E1",
  29: "F1",
  30: "Fis1",
  31: "G1",
  32: "Gis1",
  33: "A1",
  34: "B1",
  35: "H1",
  36: "C2",
  37: "Cis2",
  38: "D2",
  39: "Dis2",
  40: "E2",
  41: "F2",
  42: "Fis2",
  43: "G2",
  44: "Gis2",
  45: "A2",
  46: "B2",
  47: "H2",
  48: "C3",
  49: "Cis3",
  50: "D3",
  51: "Dis3",
  52: "E3",
  53: "F3",
  54: "Fis3",
  55: "G3",
  56: "Gis3",
  57: "A3",
  58: "B3",
  59: "H3",
};
const positionsY = {
  C1: 0,
  Cis1: 0,
  D1: -5,
  Dis1: -5,
  E1: -10,
  F1: -15,
  Fis1: -15,
  G1: -20,
  Gis1: -20,
  A1: -25,
  B1: -30,
  H1: -30,
  C2: -35,
  Cis2: -35,
  D2: -40,
  Dis2: -40,
  E2: -45,
  F2: -50,
  Fis2: -50,
  G2: -55,
  Gis2: -55,
  A2: -60,
  B2: -65,
  H2: -65,
  C3: -75,
  Cis3: -75,
  D3: -80,
  Dis3: -80,
  E3: -85,
  F3: -90,
  Fis3: -90,
  G3: -95,
  Gis3: -95,
  A3: -100,
  B3: -105,
  H3: -105,
};

function calculateShift(musicalKey) {
  let changePosition = 0;
  if (musicalKey === "C-dur" || musicalKey === "a-mol") {
    changePosition = 0;
  } else if (musicalKey === "F-dur" || musicalKey === "d-mol") {
    changePosition = 8;
  } else if (musicalKey === "D-dur" || musicalKey === "h-mol") {
    changePosition = 18;
  }
  return changePosition;
}

function Metrum(props) {
  const changePosition = calculateShift(props.musicalKey);

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
          <Cross
            style={{
              ...props.style,
              width: "4%",
              height: "3.5%",
              transform: [{ translateX: 50 }, { translateY: 220 }],
            }}
          />
          <Cross
            style={{
              ...props.style,
              position: "absolute",
              width: "4%",
              height: "3.5%",
              transform: [{ translateX: 60 }, { translateY: 235 }],
            }}
          />
          <Cross
            style={{
              ...props.style,
              width: "4%",
              height: "3.5%",
              transform: [{ translateX: 50 }, { translateY: 380 }],
            }}
          />
          <Cross
            style={{
              ...props.style,
              position: "absolute",
              width: "4%",
              height: "3.5%",
              transform: [{ translateX: 60 }, { translateY: 395 }],
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
function CzarneKlawisze(props) {
  switch (props.valueOfKey) {
    case "C-dur":
    case "a-mol":
      if (
        props.note === 25 ||
        props.note === 27 ||
        props.note === 30 ||
        props.note === 32 ||
        props.note === 37 ||
        props.note === 39 ||
        props.note === 42 ||
        props.note === 44 ||
        props.note === 49 ||
        props.note === 51 ||
        props.note === 54 ||
        props.note === 56
      ) {
        return (
          <Cross
            key={props.i}
            style={{
              ...props.style,
              position: "absolute",

              width: "4%",
              height: "3.5%",
              transform: [
                {
                  translateX: props.translateX - 2,
                },
                {
                  translateY: props.translateY + 48,
                },
              ],
            }}
          />
        );
      } else if (props.note === 34 || props.note === 46 || props.note === 58) {
        return (
          <Flat
            key={props.i + 1}
            style={{
              ...props.style,
              position: "absolute",
              width: "4%",
              height: "3.5%",
              transform: [
                {
                  translateX: props.translateX - 3,
                },
                {
                  translateY: props.translateY + 40,
                },
              ],
            }}
          />
        );
      }
    case "D-dur":
    case "h-mol":
      if (
        props.note === 27 ||
        props.note === 32 ||
        props.note === 39 ||
        props.note === 44 ||
        props.note === 46 ||
        props.note === 51 ||
        props.note === 56 ||
        props.note === 58
      ) {
        return (
          <Cross
            key={props.i + 2}
            style={{
              ...props.style,
              position: "absolute",

              width: "4%",
              height: "3.5%",
              transform: [
                {
                  translateX: props.translateX - 3,
                },
                {
                  translateY: props.translateY + 48,
                },
              ],
            }}
          />
        );
      } else if (props.note === 34 || props.note === 46 || props.note === 58) {
        return (
          <Flat
            key={props.i + 3}
            style={{
              ...props.style,
              position: "absolute",
              width: "4%",
              height: "3.5%",
              transform: [
                {
                  translateX: props.translateX - 3,
                },
                {
                  translateY: props.translateY + 40,
                },
              ],
            }}
          />
        );
      }
    case "F-dur":
    case "d-mol":
      if (
        props.note === 25 ||
        props.note === 27 ||
        props.note === 30 ||
        props.note === 32 ||
        props.note === 37 ||
        props.note === 39 ||
        props.note === 42 ||
        props.note === 44 ||
        props.note === 49 ||
        props.note === 51 ||
        props.note === 54 ||
        props.note === 56
      ) {
        return (
          <Cross
            key={props.i + 4}
            style={{
              ...props.style,
              position: "absolute",

              width: "4%",
              height: "3.5%",
              transform: [
                {
                  translateX: props.translateX - 3,
                },
                {
                  translateY: props.translateY + 48,
                },
              ],
            }}
          />
        );
      }
      break;

    default:
      return null;
  }
}

function LineOnNote(props) {
  if (
    props.note === 24 ||
    props.note === 25 ||
    props.note === 45 ||
    props.note === 48 ||
    props.note === 49 ||
    props.note === 52 ||
    props.note === 55 ||
    props.note === 56 ||
    props.note === 58 ||
    props.note === 59
  ) {
    return (
      <Line
        key={props.i}
        style={{
          ...props.style,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          width: "15%",
          height: "15%",
          transform: [
            { translateX: props.translateX - 6.5 },
            { translateY: props.translateY + props.changeLineForLineOnNotes },
            { rotate: "90deg" },
          ],
        }}
      />
    );
  } else if (
    props.note === 46 ||
    props.note === 47 ||
    props.note === 50 ||
    props.note === 51 ||
    props.note === 53 ||
    props.note === 54 ||
    props.note === 57 ||
    props.note === 58
  ) {
    return (
      <Line
        key={props.i}
        style={{
          ...props.style,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          width: "15%",
          height: "15%",
          transform: [
            { translateX: props.translateX - 5 },
            {
              translateY: props.translateY + 5 + props.changeLineForLineOnNotes,
            },
            { rotate: "90deg" },
          ],
        }}
      />
    );
  }
}

function wyliczJakaNuta(durationInMs, timeQuarter) {
  //dokonczyc
  console.log("czas cwierc", timeQuarter);
  console.log("duration", durationInMs);
  if (durationInMs < (3 * timeQuarter) / 8) {
    return szesnastka;
  } else if (
    durationInMs >= (3 * timeQuarter) / 8 &&
    durationInMs < (3 * timeQuarter) / 4
  ) {
    return osemka;
  } else if (
    durationInMs >= (3 * timeQuarter) / 4 &&
    durationInMs < (3 * timeQuarter) / 2
  ) {
    return cwiercnuta;
  } else if (
    durationInMs >= (3 * timeQuarter) / 2 &&
    durationInMs < 3 * timeQuarter
  ) {
    return polnuta;
  } else if (durationInMs >= 3 * timeQuarter) {
    return calanuta;
  }
}

const wartoscWTakcie = {
  "1/4": 1,
  "2/4": 2,
  "3/4": 3,
  "4/4": 4,
};
function displayNotes(
  musicalKey,
  pitchArray,
  startArray,
  stopArray,
  bpm,
  chosenTimeSignature,
  show_Hide
) {
  const changePosition = calculateShift(musicalKey);

  //in ms
  const timeQuarter = miliSecondInMinute / bpm;

  console.log("pitch: ", pitchArray);
  console.log("start: ", startArray);
  console.log("stop: ", stopArray);

  let licznik = wartoscWTakcie[chosenTimeSignature];
  console.log("li", licznik);
  const notesArray = [];

  if (pitchArray.length < startArray.length) {
    startArray.pop();
  }
  if (pitchArray.length > startArray.length) {
    pitchArray.pop();
  }
  if (pitchArray.length < stopArray.length) {
    stopArray.pop();
  }
  if (pitchArray.length > stopArray.length) {
    pitchArray.pop();
  }
  if (startArray.length > stopArray.length) {
    startArray.pop();
  }
  if (startArray.length < stopArray.length) {
    startArray.pop();
  }

  for (let i = 0; i < pitchArray.length; i++) {
    const note = pitchArray[i];
    const durationInMs = stopArray[i] - startArray[i];
    const dlugoscNuty = wyliczJakaNuta(durationInMs, timeQuarter);
    const zrodlo = nutki[dlugoscNuty];

    let translateX = 0;
    let translateY = 0;

    let changeLine = 0;
    if (i <= 7) {
      translateX = valueXBetweenNotes * i + positionXFirstNote + changePosition;
      translateY = positionsY[midiNumber[note]] + positionYFirstNote;
    } else if (i <= 15) {
      translateX = valueXBetweenNotes * (i % 8) + positionXFirstNote - 15;
      translateY = positionsY[midiNumber[note]] + 160 + positionYFirstNote;
      changeLine = 160;
    } else if (i <= 23) {
      translateX = valueXBetweenNotes * (i % 8) + positionXFirstNote - 15;
      translateY = positionsY[midiNumber[note]] + 320 + positionYFirstNote;
      changeLine = 320;
    }

    let changeLineForLineOnNotes = 0;
    if (i <= 7) {
      translateX = valueXBetweenNotes * i + positionXFirstNote + changePosition;
      translateY = positionsY[midiNumber[note]] + positionYFirstNote;
      changeLineForLineOnNotes = -1;
    } else if (i <= 15) {
      translateX = valueXBetweenNotes * (i % 8) + positionXFirstNote - 15;
      translateY = positionsY[midiNumber[note]] + 160 + positionYFirstNote;
      changeLineForLineOnNotes = -1;
    } else if (i <= 23) {
      translateX = valueXBetweenNotes * (i % 8) + positionXFirstNote - 15;
      translateY = positionsY[midiNumber[note]] + 320 + positionYFirstNote;
      changeLineForLineOnNotes = -1;
    }

    licznik = licznik - dlugoscNuty;
    console.log("licznikkk", licznik);
    let linia = null;
    if (licznik <= 0) {
      linia = (
        <Line
          key={`linia${i}`}
          style={{
            width: "30%",
            height: "9%",
            position: "absolute",
            transform: [
              { translateX: translateX - 17 },
              { translateY: 56 + changeLine },
            ],
          }}
        />
      );
    }
    if (licznik <= 0) {
      licznik = wartoscWTakcie[chosenTimeSignature];
    }

    console.log("licznikkk", licznik);

    const krzyzykbemol = (
      <CzarneKlawisze
        i={`klawisz${i}`}
        key={`klawiszz${i}`}
        translateX={translateX}
        translateY={translateY}
        valueOfKey={musicalKey}
        note={note}
        changePosition={changePosition}
        style={{
          resizeMode: "contain",
          position: "absolute",
        }}
      />
    );

    const lineOnNote = (
      <LineOnNote
        i={`line${i}`}
        key={`line${i}`}
        translateX={translateX}
        translateY={translateY}
        changeLineForLineOnNotes={changeLineForLineOnNotes}
        note={note}
        changePosition={changePosition}
        style={{
          resizeMode: "contain",
          position: "absolute",
        }}
      />
    );

    let notePicture = null;
    if (dlugoscNuty === calanuta) {
      notePicture = (
        <Image
          source={zrodlo}
          key={`image${i}`}
          style={{
            width: "5%",
            height: "5%",
            resizeMode: "contain",
            position: "absolute",
            transform: [
              { translateX: translateX + 10 },
              { translateY: translateY + 40 },
            ],
          }}
        />
      );
    } else if (
      (dlugoscNuty === osemka ||
        dlugoscNuty === szesnastka ||
        dlugoscNuty === cwiercnuta ||
        dlugoscNuty === polnuta) &&
      positionsY[midiNumber[note]] > -30
    ) {
      notePicture = (
        <Image
          source={zrodlo}
          key={`image${i}`}
          style={{
            width: "11%",
            height: "12%",
            resizeMode: "contain",
            position: "absolute",
            transform: [{ translateX }, { translateY: translateY - 1 }],
          }}
        />
      );
    } else if (
      (dlugoscNuty === polnuta || dlugoscNuty === cwiercnuta) &&
      positionsY[midiNumber[note]] <= -30
    ) {
      notePicture = (
        <Image
          source={zrodlo}
          key={`image${i}`}
          style={{
            width: "10%",
            height: "12%",
            resizeMode: "contain",
            position: "absolute",
            transform: [
              { translateX },
              { translateY: translateY + 25 },
              { rotate: "180deg" },
            ],
          }}
        />
      );
    } else if (dlugoscNuty === osemka && positionsY[midiNumber[note]] <= -30) {
      notePicture = (
        <Image
          source={require("./assets/rotatedEightNote.png")}
          key={`image${i}`}
          style={{
            width: "4.75%",
            height: "4.75%",
            resizeMode: "contain",
            position: "absolute",
            transform: [
              { translateX: translateX + 10 },
              { translateY: translateY + 56 },
            ],
          }}
        />
      );
    } else if (
      dlugoscNuty === szesnastka &&
      positionsY[midiNumber[note]] <= -30
    ) {
      notePicture = (
        <Image
          source={require("./assets/rotatedSixteenNote.png")}
          key={`image${i}`}
          style={{
            width: "7%",
            height: "7%",
            resizeMode: "contain",
            position: "absolute",
            transform: [
              { translateX: translateX + 10 },
              { translateY: translateY + 47 },
            ],
          }}
        />
      );
    }

    notesArray.push(notePicture);
    notesArray.push(krzyzykbemol);
    notesArray.push(linia);
    notesArray.push(lineOnNote);
  }

  return notesArray;
}
export default ThirdScreen;
export { displayNotes };
