
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

function FirstScreen({ navigation })
{
  return(
    <View style={styles.container}>
    {/* <Text>{returnTheSame("siu")}</Text> */}
    {/* <Text>{concatenateArray(["dffd","gfddffddf","hfdfd"])}</Text> */}

    <Button
    title="Create song"
    onPress={() =>
      navigation.navigate('SecondScreen')}
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
      
      
  export default FirstScreen;
  
