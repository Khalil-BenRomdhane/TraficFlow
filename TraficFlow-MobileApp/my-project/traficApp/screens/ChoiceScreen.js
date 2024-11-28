import React from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';


const ChoiceScreen = ({navigation}) => {


  const handleRealTimeTraffic = () => {
    // Handle the real-time traffic logic here
    navigation.navigate('realTime')
  
  };

  const handleFutureTraffic = () => {
    // Handle the future traffic prediction logic here
    navigation.navigate('Predire')
  };

  const handleDataVue = () => {
    // Handle the future traffic prediction logic here
    navigation.navigate('DataView')
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleFutureTraffic}>
        <Text style={styles.buttonText}>Prevision  </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDataVue}>
         <Text style={styles.buttonText}>DataVue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e2dd', // You can change the background color if needed
   
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default ChoiceScreen;
