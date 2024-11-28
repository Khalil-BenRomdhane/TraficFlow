import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import styled from 'styled-components/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // You can use an icon library like Io


const GOOGLE_API_KEY = 'AIzaSyBjfI_cE5eE08SiFL_KGwgkghTFKUGzMWs'; // Remplacez par votre clé API Google

const PrevisionMap = ({ route, navigation }) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const { libelle, libelle_noeud_amont, libelle_noeud_aval, prediction ,day,month,year,hour} = route.params;
  const formattedHour = hour === 0 ? '00' : hour < 10 ? `0${hour}` : hour;

// Handle the next hour (if hour is 23, it should become 00)
const nextFormattedHour = hour === 23 ? '00' : (hour + 1) < 10 ? `0${hour + 1}` : hour + 1;

// Format the date in DD/MM/YYYY format
const formattedDate = `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`;

const dateTimeString = `Estimation a partir de  ${formattedHour}h jusqu'a ${nextFormattedHour}h pour le ${formattedDate}`;
const getPolylineColor = (prediction) => {
  if (prediction < 15) {
    return '#00FF00'; // Vert - Fluide
  } else if (prediction < 30) {
    return '#FFA500'; // Orange - Pré-saturé
  } else if (prediction < 50) {
    return '#FFFF00'; // Jaune - Saturé
  } else {
    return '#FF0000'; // Rouge - Bloqué
  }
};

const getTrafficStatus = (prediction) => {
  if (prediction < 15) {
    return "Fluide"; // 0% ≤ K < 15%
  } else if (prediction < 30) {
    return "Pré-saturé"; // 15% ≤ K < 30%
  } else if (prediction < 50) {
    return "Saturé"; // 30% ≤ K < 50%
  } else {
    return "Bloqué"; // K ≥ 50%
  }
};




  const fetchAddress = async (libelle) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${libelle}, Paris&key=${GOOGLE_API_KEY}`
      );
      if (response.data.results.length > 0) {
        return response.data.results[0].formatted_address;
      } else {
        throw new Error('Adresse non trouvée');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', `Échec de la récupération de l'adresse pour ${libelle}`);
      return null;
    }
  };

  const getRoute = async (startAddress, endAddress) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startAddress}&destination=${endAddress}&mode=driving&key=${GOOGLE_API_KEY}`
      );
      if (response.data.routes.length > 0) {
        const points = response.data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(points);
        setPolylineCoordinates(decodedPoints);
      } else {
        throw new Error('Aucun itinéraire trouvé');
      }

      const startCoordinates = await getCoordinatesFromAddress(startAddress);
      const endCoordinates = await getCoordinatesFromAddress(endAddress);

      if (startCoordinates && endCoordinates) {
        const newRegion = {
          latitude: (startCoordinates.lat + endCoordinates.lat) / 2,
          longitude: (startCoordinates.lng + endCoordinates.lng) / 2,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        };
        setRegion(newRegion);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Échec de la récupération de l\'itinéraire');
    }
  };

  const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}, Paris&key=${GOOGLE_API_KEY}`
      );
      if (response.data.results.length > 0) {
        return response.data.results[0].geometry.location;
      } else {
        throw new Error('Adresse non trouvée');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', `Échec de la récupération des coordonnées pour ${address}`);
      return null;
    }
  };

  const decodePolyline = (encoded) => {
    let index = 0;
    const coordinates = [];
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let byte;
      let shift = 0;
      let result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      coordinates.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return coordinates;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (libelle_noeud_amont && libelle_noeud_aval) {
        const startAddress = await fetchAddress(libelle_noeud_amont);
        const endAddress = await fetchAddress(libelle_noeud_aval);
        if (startAddress && endAddress) {
          getRoute(startAddress, endAddress);
        } else {
          Alert.alert('Erreur', 'Impossible de récupérer les adresses de départ et d\'arrivée');
        }
      } else {
        Alert.alert('Erreur', 'Points de départ et d\'arrivée manquants');
      }
    };
    fetchData();
  }, [libelle_noeud_amont, libelle_noeud_aval]);

  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      <Container>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>

        {/* Map Container */}
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          zoomEnabled={true}
          scrollEnabled={true}
        >
          <Polyline coordinates={polylineCoordinates} strokeColor={getPolylineColor(prediction)} strokeWidth={6} />
        </MapView>

        {/* Info Container */}
        <InfoContainer>
          <Text style={styles.title}>Données Prévisionnelles</Text>
          <InfoSection label="Nom de la voie" value={libelle} />
          <InfoSection label="Taux d'occupation" value={`${parseFloat(prediction).toFixed(2)}%`} />
          <InfoSection label="Temps d'attente" value={`${parseFloat((prediction / 100) * 60).toFixed(1)} mins de temps d'attente dans les embouteillages en passant par ${libelle}`}
          ></InfoSection>
          <InfoSection label="Etat trafic" value={getTrafficStatus(prediction)}/>
          <InfoSection
                    label="Description"
                    value={`${dateTimeString}`}
                  />
         
        </InfoContainer>
      </Container>
    </View>
  );
};

// InfoSection Component
const InfoSection = ({ label, value }) => (
  <View style={styles.infoSection}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.info}>{value+"."}</Text>
  </View>
);

const Container = styled.View`
  flex: 1;
  background-color: #f8f8f8;
  flex-direction: column;
`;

const InfoContainer = styled.View`
  flex: 0.5; /* 40% of the screen height */
  padding: 10px; /* Réduit le padding */
  background-color: '#e4e2dd';
  elevation: 8;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
`;

const styles = StyleSheet.create({
  map: {
    flex: 1,  // Takes up the majority of the screen
    borderRadius: 0, // Full screen, no rounding
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
      alignSelf:'center'
  },
  infoSection: {
    flexDirection: 'row',  // Ensure label and value are on the same line
    marginBottom: 15,
    alignItems: 'flex-start',
    
    
    // Vertically center the label and value
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#555',
    marginRight: 5,  // Add some space between the label and the value
  },
  info: {
    fontSize: 15,
    color: '#333',
    flexWrap:'wrap',
    width:'65%',
    
  },
backButton: {
  position: 'absolute',
  top: 45, // Adjust the top position as needed
  left: 5, // Set left to 0 to make it start from the left edge
  right: 5, // Set right to 0 to make it stretch to the right edge
  backgroundColor: '#007bff',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignItems: 'center',
  zIndex: 10, // Ensure it is above other elements
},
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PrevisionMap;
