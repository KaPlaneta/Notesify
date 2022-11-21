
 import React from 'react';
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
   Image
 } from 'react-native';
 import Logo from "./assets/logo.svg";
 import { StatusBar } from "expo-status-bar";




//  const AppButton = ({ onPress, title }) => (
//   <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
//     <Text style={styles.appButtonText}>{title}</Text>
//   </TouchableOpacity>
// );

function FirstScreen({ navigation })
{
  return(
    <SafeAreaView style={styles.container}>
     <Logo />
     <StatusBar style="auto" />
    <View style={styles.appButtonContainer}>

    <Button
    title="CREATE SONG"
    onPress={() =>
      navigation.navigate('SecondScreen',{
        itemId: 86,
        otherParam: 'anything you want here'})}
    color="#fcf7fb"
    

    />

  </View>
  </SafeAreaView>

  );

}


const styles = StyleSheet.create({
    container: {
          flex: 1,
           justifyContent: 'center',  //na srodku
           alignItems: 'center',   //tez
           backgroundColor: '#f0f5f4',
           flexDirection: 'column',
           alignItems: "center",
           justifyContent: "center",
            },
            title: {
              textAlign: 'center',
              marginVertical: 8,
            },
            appButtonContainer: {
              elevation: 8,
              backgroundColor: "#a82f7a",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 12
            },
            appButtonText: {
              fontSize: 18,
              color: "#fcf7fb",
              fontWeight: "bold",
              alignSelf: "center",
              textTransform: "uppercase"
            }
            
          });  

      
      
  export default FirstScreen;
  
{/* <Text>{returnTheSame("siu")}</Text> */}
    {/* <Text>{concatenateArray(["dffd","gfddffddf","hfdfd"])}</Text> */}
