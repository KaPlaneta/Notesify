
 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Button,
 } from 'react-native';


 
 function SecondScreen({navigation})
{
  return(
    <View style={styles.container}>
    {/* <Text>{returnTheSame("siu")}</Text> */}
    {/* <Text>{concatenateArray(["dffd","gfddffddf","hfdfd"])}</Text> */}

    <Button
    onPress={() =>
        navigation.navigate('ThirdScreen')}
    title="START"
    color="#841584"
    />

  </View>);

  

}
 
 
 const styles = StyleSheet.create({
   container: {
         flex: 1,
          justifyContent: 'center',  //na srodku
          alignItems: 'center',   //tez
          backgroundColor: 'powderblue',
          flexDirection: 'column',
   }});
     
     
 export default SecondScreen;
 