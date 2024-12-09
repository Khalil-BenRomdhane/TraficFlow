import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { auth } from '../Services/Config'; // Assurez-vous que Firebase est correctement configuré
import { Ionicons } from 'react-native-vector-icons'; // Importation des icônes

const ChoiceScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  // Vérifier si l'utilisateur est connecté dès que l'écran s'affiche
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUsername(currentUser.displayName || 'Utilisateur');
    } else {
      // L'utilisateur n'est pas connecté, rediriger vers l'écran Login
      navigation.replace('Login');
    }
  }, [navigation]);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // L'utilisateur est déconnecté, rediriger vers l'écran de connexion
        navigation.replace('Login');
      })
      .catch((error) => {
        console.error('Erreur de déconnexion: ', error.message);
      });
  };

  // Naviguer vers les autres écrans
  const handleFutureTraffic = () => {
    navigation.navigate('Predire'); // Naviguer vers l'écran de prévisions
  };

  const handleDataVue = () => {
    navigation.navigate('DataView'); // Naviguer vers l'écran de données
  };

  
  const handlePlanification = () => {
    navigation.navigate('Suivie'); // Naviguer vers l'écran de données
  };

  return (
    <View style={styles.container}>
      {/* Icône de déconnexion placée en haut à droite avec le mot "Déconnexion" */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Déconnexion</Text>
        <Ionicons name="log-out" size={30} color="#007bff" />
        
      </TouchableOpacity>

      {/* Affichage du nom d'utilisateur */}
      <Text style={styles.greeting}>Bienvenue, {username}!</Text>

      <TouchableOpacity style={styles.button} onPress={handleFutureTraffic}>
        <Text style={styles.buttonText}>Prévision</Text>
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
    backgroundColor: '#e4e2dd',
  },
  logoutButton: {
    position: 'absolute',
    top: 48,
    right: 20,
    flexDirection: 'row', // Aligner l'icône et le texte horizontalement
    alignItems: 'center',
    zIndex: 1, // Pour s'assurer que le bouton soit au-dessus des autres éléments
  },
  logoutText: {
    marginLeft: 10, // Espacement entre l'icône et le texte
    fontSize: 16,
    color: '#007bff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
