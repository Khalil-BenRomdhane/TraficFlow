import { View,StyleSheet,Image,Text ,StatusBar} from "react-native"
import ChoiceScreen from "./ChoiceScreen"
import React,{useEffect} from "react"


export default Splash=({navigation})=>{
  useEffect(() => {
    // Ajoute un délai de 3 secondes avant de naviguer vers "Home"
    const timer = setTimeout(() => {
      navigation.replace('ChoiceScreen'); // Naviguer vers la page "Home" après 3 secondes
    }, 3000); // 3000 ms = 3 secondes

    // Nettoyer le timer si le composant est démonté avant la fin
    return () => clearTimeout(timer);
  }, [navigation]);

return (

    <View style={styles.container}>
    <StatusBar hidden={true} /> 
        <Image style={styles.logo}
            source={require('../Assets/splash_image.png')} 
            />

            <View style={styles.textContainer}>
                <Text style={{fontWeight: 'bold'}}>By</Text>
                <Text style={styles.text}>Data Craft©</Text>
            </View>
            
    </View>
)

} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e4e2dd', // You can change the background color if needed
    },
    logo: {
      width: 350,  // Adjust the size of the image
      height: 300, // Adjust the size of the image
      alignContent:'flex-start',
      resizeMode: 'contain', // Ensures the image keeps its aspect ratio
      width: '100%',
      //marginTop:'25%'
      backgroundColor:"'#e4e2d'"
    },
    textContainer: {
        position: 'absolute',
        bottom: 20, // Adjust this value as needed
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color:'black',
      },
  });
  