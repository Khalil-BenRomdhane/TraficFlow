import { View, StyleSheet, Image, Text, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { auth } from '../Services/Config'; // Assurez-vous que Firebase est correctement configuré

export default Splash = ({ navigation }) => {
  useEffect(() => {
    // Ajoute un délai de 3 secondes avant de naviguer
    const timer = setTimeout(() => {
      const currentUser = auth.currentUser; // Vérifier si un utilisateur est connecté
      if (currentUser) {
        // Si un utilisateur est connecté, naviguer vers l'écran "ChoiceScreen"
        navigation.replace('ChoiceScreen');
      } else {
        // Si l'utilisateur n'est pas connecté, naviguer vers la page "Login"
        navigation.replace('Login');
      }
    }, 3000); // 3000 ms = 3 secondes

    // Nettoyer le timer si le composant est démonté avant la fin
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        style={styles.logo}
        source={require('../Assets/splash_image.png')}
      />
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: 'bold' }}>By</Text>
        <Text style={styles.text}>Data Craft©</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e2dd', // Vous pouvez changer la couleur de fond si nécessaire
  },
  logo: {
    width: 350, // Ajustez la taille de l'image
    height: 300, // Ajustez la taille de l'image
    alignContent: 'flex-start',
    resizeMode: 'contain', // Assure que l'image conserve son ratio d'aspect
    width: '100%',
    backgroundColor: "#e4e2dd", // Ajustez la couleur de fond
  },
  textContainer: {
    position: 'absolute',
    bottom: 20, // Ajustez cette valeur si nécessaire
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
