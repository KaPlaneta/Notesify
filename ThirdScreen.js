
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
   Image,
   ImageBackground,
   
 } from 'react-native';

function ThirdScreen()
{
    

    return (
        
        <ImageBackground source={require('./notestaff2.png')} style={{width: '100%', height: '60%'}}>

            {/* <Image source={require('./note2.png')} style={{width:'4%', height: '5%', resizeMode: "contain", transform: [{ translateX: 30}, { translateY: 7 }]}}/> */}
            {/* <Image source={require('./note2.png')} style={{width:'4%', height: '5%', resizeMode: "contain", position: 'absolute', transform: [{ translateX: 60}, { translateY: 6 }]}}/> */}
            {/* <Image source={require('./note2.png')} style={{width:'4%', height: '5%', resizeMode: "contain", position: 'absolute', transform: [{ translateX: 80}, { translateY: 2 }]}}/> */}
            {/* <Image source={require('./note2.png')} style={{width:'4%', height: '5%', resizeMode: "contain", position: 'absolute', transform: [{ translateX: 100}, { translateY: -2 }]}}/> */}
            {/* <Image source={require('./note2.png')} style={{width:'4%', height: '5%', resizeMode: "contain", position: 'absolute', transform: [{ translateX: 60}, { translateY: 4 }]}}/> */}
            
             {/* wywolanie funkcji displayNotes */}
            {displayNotes()}   
            
            

        
        </ImageBackground>
    );
        

      
}

// komentarze

function displayNotes()
{
    // tablica z numerami z potencjanlego midi
const myArray = [5,3,7,4]
const notesArray = [];

        for (let i=0; i < myArray.length; i++) 
        {
            const translateY =  -2*myArray[i] +12 //wysokosc dzwieku
            const translateX = 10*i + 30 // polozenie dzwieku kolejnego


            // console.log(translateY,translateX)
            
            //tutaj do zmiennej przypisany komponent
            note = <Image source={require('./note2.png')} key={i} style={{width:'4%', height: '5%', resizeMode: "contain", position: 'absolute', transform: [{ translateX}, { translateY }]}}/>
            
            notesArray.push(note);  //dodawanie do tablicy
             
        }

        return notesArray //odnosi sie do funkcji 
 
}
 

 export default ThirdScreen;
 
 export{displayNotes};

