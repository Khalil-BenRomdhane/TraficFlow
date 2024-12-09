import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { auth } from '../Services/Config'; // Import correct de Firebase Auth
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState(''); // Nouveau champ pour le nom d'utilisateur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Fonction pour gérer l'inscription
  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Utilisateur créé :', user.email);

        // Mettre à jour le nom d'utilisateur
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            console.log('Nom d\'utilisateur mis à jour:', user.displayName);

            // Envoi de l'email de vérification
            sendEmailVerification(user)
              .then(() => {
                Alert.alert(
                  'Succès',
                  `Compte créé avec succès ! Un email de vérification a été envoyé à ${user.email}.`
                );
                navigation.replace('Login'); // Naviguer vers l'écran de connexion
              })
              .catch((error) => {
                console.error('Erreur lors de l\'envoi de l\'email de vérification :', error.message);
                Alert.alert('Erreur', "Impossible d'envoyer l'email de vérification. Veuillez réessayer.");
              });
          })
          .catch((error) => {
            console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error.message);
            Alert.alert('Erreur', 'Impossible de définir le nom d\'utilisateur. Veuillez réessayer.');
          });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'inscription :', error.message);
        Alert.alert('Erreur', error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Créer un compte TraficFlow</Text>
          <Text style={styles.subtitle}>Veuillez remplir les informations pour vous inscrire</Text>

          {/* Champ Nom d'utilisateur */}
          <TextInput
            style={styles.input}
            placeholder="Entrez votre nom d'utilisateur"
            placeholderTextColor="#888"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

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

          {/* Champ Confirmer le mot de passe */}
          <TextInput
            style={styles.input}
            placeholder="Confirmez votre mot de passe"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
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
