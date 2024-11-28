import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour gérer la connexion
  const handleLogin = () => {
    if (email && password) {
      // Logique de connexion (vous pouvez intégrer Firebase ou une API ici)
      console.log('Connexion réussie avec:', email, password);
      // Naviguer vers l'écran d'accueil ou un autre écran après la connexion réussie
      navigation.replace('Home'); // Remplacez 'Home' par le nom de l'écran vers lequel vous souhaitez naviguer
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Différentes configurations pour iOS et Android
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Bienvenue sur TraficFlow</Text>
          <Text style={styles.subtitle}>Veuillez vous connecter pour continuer</Text>

          {/* Champ Email */}
          <TextInput
            style={styles.input}
            placeholder="Entrez votre email"
            placeholderTextColor="#888" // Couleur pour le placeholder
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />

          {/* Champ Mot de passe */}
          <TextInput
            style={styles.input}
            placeholder="Entrez votre mot de passe"
            placeholderTextColor="#888" // Couleur pour le placeholder
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />

          {/* Bouton de connexion */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>

          {/* Lien pour aller à l'écran d'inscription */}
          <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
            <Text style={styles.linkText}>Pas de compte ? Inscrivez-vous ici</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e2dd',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '95%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    width: '95%',
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 15,
    color: '#007bff',
    fontSize: 16,
  },
});

export default LoginScreen;
