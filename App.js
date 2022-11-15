import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SecondScreen from './SecondScreen';
import FirstScreen from './FirstScreen';
import ThirdScreen from './ThirdScreen';
import { displayNotes } from './ThirdScreen';



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


const Stack = createNativeStackNavigator();

const App = () => {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
         name="Home"
         component={FirstScreen}
         options={{ title: 'Welcome' }}
       />
       <Stack.Screen 
       name="SecondScreen" 
       component={SecondScreen} 
       />
        <Stack.Screen 
       name="ThirdScreen" 
       component={ThirdScreen} 
       />
     </Stack.Navigator>
   </NavigationContainer>
 );
};




function returnTheSame(name)
{
 return name;
}



function concatenateArray(myArray) //łączy stringi, zmienna i w petli dodawac nasteony element do tej zmiennej 
{
let name = "";
//   for (let i=0; i < myArray.length; i++)
// {
//    // console.log("The member of myArray in index " + i + " is " + myArray[i]);
//   name += myArray[i];
// }
 for (const element of myArray) {
   name += element;
 }
return name;
}


// format midi: tablica zawierajaca obiekty pojedynczych dzwiekow w standardzie midi
// pojedynczy dzwiek: obiekt z dwoma polami, pierwsze wysokosc, drugie dlugosc




const styles = StyleSheet.create({
 container: {
       flex: 1,
        justifyContent: 'center',  //na srodku
        alignItems: 'center',   //tez
        backgroundColor: 'powderblue',
        flexDirection: 'column',
 }});

 
       
   
export default App;
