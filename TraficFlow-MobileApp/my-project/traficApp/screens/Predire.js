import React, { useState, useRef, useCallback } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';

const { height: screenHeight } = Dimensions.get('window');

const Predire = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVoix, setSelectedVoix] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [voix, setVoix] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null);
  const [prediction, setPrediction] = useState('');

  const handleVoixSelection = (arc) => {
    setSelectedVoix(arc.Libelle);
    setVoix(arc);
    setSearchResults(null);
    setShowDatePicker(true);
  };

  const handleChangeSearchBar = (query) => {
    setSearchQuery(query);
  };

  const handleAnnuler = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedVoix(null);
  };

  const handlePredire = () => {
    if (selectedDate && selectedTime && voix) {
      const dayOfWeek = (selectedDate.getDay() + 6) % 7;
      const day = parseFloat(selectedDate.toLocaleString('fr-FR', { day: 'numeric' }));
      const month = parseFloat(selectedDate.toLocaleString('fr-FR', { month: 'numeric' }));
      const year = parseFloat(selectedDate.toLocaleString('fr-FR', { year: 'numeric' }));
      const hour = parseFloat(selectedTime.getHours());

      const geoPoint = voix.geo_point_2d.split(',');
      const latitude = parseFloat(geoPoint[0].trim());
      const longitude = parseFloat(geoPoint[1].trim());

      const jsonData = {
        latitude,
        longitude,
        day_of_week: parseFloat(dayOfWeek),
        day,
        month,
        year,
        hour,
      };

      fetch('http://192.168.1.6:5000/gateway/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          if (response.ok) {
            console.log('ok!');
          }
          return response.json();
        })
        .then((data) => {
          navigation.navigate('Prevision', {
            "prediction": data.prediction,
            "libelle": voix.Libelle,
            'libelle_noeud_amont': voix['Libelle noeud amont'],
            'libelle_noeud_aval': voix['Libelle noeud aval'],
            'day':day,
            'month':month,
            'year' :year,
             'hour':hour
          });
        })
        .catch((error) => console.error('Error:', error));
    } else {
      Alert.alert('Erreur', 'Date ou heure non sélectionnée');
    }
  };

  const handleSearch = useCallback(async () => {
    Keyboard.dismiss();
    if (searchQuery.trim().length === 0) {
      return;
    }
    setLoading(true);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const { signal } = controllerRef.current;

    try {
      const response = await fetch('http://192.168.1.6:5000/gateway/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: searchQuery.trim() }),
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      setSearchResults(data || []);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Erreur lors de la récupération des données:', error);
      }
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setShowTimePicker(true);
    }
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Bouton Retour */}
        <TouchableOpacity style={styles.backButton} onPress={() => selectedVoix? handleAnnuler(): navigation.goBack()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>

        {!selectedVoix && (
          <View>
            <Searchbar
              style={styles.searchbar}
              value={searchQuery}
              onChangeText={handleChangeSearchBar}
              placeholder="Saisir le nom de la voix"
              placeholderTextColor="gray"
            />
            <TouchableOpacity style={styles.button_2} onPress={handleSearch}>
              <Text style={styles.buttonText}>{loading ? 'Chargement...' : 'Rechercher'}</Text>
            </TouchableOpacity>
          </View>
        )}

        {searchResults && !selectedVoix && (
          searchResults.length === 0 ? (
            <Text style={{ alignSelf: 'center' }}>Aucun nom correspondant</Text>
          ) : (
            <ScrollView>
              {searchResults.map((arc, index) => (
                <TouchableOpacity key={index} onPress={() => handleVoixSelection(arc)}>
                  <ArcItem>
                    <ArcText>{arc.Libelle}</ArcText>
                  </ArcItem>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )
        )}
        
        {selectedVoix && (
          <View>
            <Text style={styles.text}>Voix sélectionnée: <Text>{selectedVoix}</Text> </Text>
            {selectedVoix && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.text}>
                  Date sélectionnée: {selectedDate ? selectedDate.toLocaleDateString('fr-FR', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }) : ''}
                </Text>
                {showDatePicker && <DateTimePicker
                  value={selectedDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />}
              </View>
            )}
          </View>
        )}

        {selectedVoix && selectedDate && showTimePicker && (
          <View style={styles.timePickerContainer}>
            <Text style={styles.text}>Sélectionner une heure:</Text>
            <DateTimePicker
              value={selectedTime || new Date()}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          </View>
        )}

        {selectedVoix && selectedDate && selectedTime && (
          <Text style={styles.text}>Heure sélectionnée: {selectedTime.toLocaleTimeString()}</Text>
        )}

        {selectedVoix && selectedDate && selectedTime && (
          <TouchableOpacity style={styles.button_2} onPress={handlePredire}>
            <Text style={styles.buttonText}>Prédire le taux d'occupation</Text>
          </TouchableOpacity>
        )}

        {selectedVoix && (
          <TouchableOpacity style={styles.button_2} onPress={handleAnnuler}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        )}

        {prediction && (
          <TouchableOpacity style={styles.button_2}>
            <Text style={styles.text}>Prediction: {prediction.prediction}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const ArcItem = styled.View`
  background-color: #f5f5f5;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1.41px;
`;

const ArcText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#e4e2dd',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  searchbar: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor:'white'
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    alignSelf:'center',
   fontWeight:'bold'
  },
  button_2: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timePickerContainer: {
    marginTop: 20,
    flexDirection:'row',
  },
});

export default Predire;
