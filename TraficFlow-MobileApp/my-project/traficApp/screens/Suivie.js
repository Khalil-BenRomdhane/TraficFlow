import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeSelection = ({ navigation }) => {
  const [selectedTimes, setSelectedTimes] = useState([]);  // Array to store multiple times
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTimes((prevTimes) => [...prevTimes, time]);  // Add the new time to the list
    }
  };

  const handleConfirm = () => {
    if (selectedTimes.length > 0) {
      // Process selected times here
      const timeList = selectedTimes.map(time => time.toLocaleTimeString()).join(', ');
      alert(`Heures sélectionnées: ${timeList}`);
    } else {
      alert('Veuillez sélectionner au moins une heure');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Planifier les prévisions</Text>
      </View>

      {/* Show Time Picker */}
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.buttonText}>Sélectionner les Heures</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="inline"
            onChange={handleTimeChange}
            style={styles.datePicker}
            theme="dark"  // Set theme to dark (works for iOS)
          />
        )}
      </View>

      {/* Display Selected Times */}
      <ScrollView style={styles.selectedTimesContainer}>
        {selectedTimes.length > 0 ? (
          <Text style={styles.selectedTimesText}>
            Heures sélectionnées: {selectedTimes.map(time => time.toLocaleTimeString()).join(', ')}
          </Text>
        ) : (
          <Text style={styles.selectedTimesText}>Aucune heure sélectionnée</Text>
        )}
      </ScrollView>

      {/* Confirm Time Selection */}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmer les heures</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e4e2dd',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,  // Add shadow for Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  datePicker: {
    width: '100%',
    height: 200,
  },
  selectedTimesContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  selectedTimesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default TimeSelection;
