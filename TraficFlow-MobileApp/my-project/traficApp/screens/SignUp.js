import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour gérer l'inscription
  const handleSignup = () => {
    if (email && password) {
      // Logique d'inscription (vous pouvez intégrer Firebase ou une API ici)
      console.log('Inscription réussie avec:', email, password);
      // Naviguer vers l'écran de connexion après l'inscription
      navigation.replace('Login'); // Remplacez 'Login' par le nom de l'écran de connexion
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
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>Veuillez remplir les informations pour vous inscrire</Text>

          {/* Champ Email */}
          <TextInput
            style={styles.input}
            placeholder="Entrez votre email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />

          {/* Champ Mot de passe */}
          <TextInput
            style={styles.input}
            placeholder="Créez votre mot de passe"
            placeholderTextColor="#888"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />

          {/* Bouton d'inscription */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>

          {/* Lien pour aller à l'écran de connexion */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Déjà un compte ? Connectez-vous ici</Text>
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

export default SignupScreen;
