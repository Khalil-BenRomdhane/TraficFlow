import React, { useState } from 'react';
import { View, Text, Button, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import moment from 'moment';
import { LineChart } from 'react-native-chart-kit';
import SegmentedControlTab from 'react-native-segmented-control-tab'; // Importation de la bibliothèque

// Dimensions de l'écran pour définir la taille du graphique
const screenWidth = Dimensions.get('window').width;

// Données des clusters (comme dans votre exemple)
const cluster1 = {
  hour: [
    { hour: 0, mean_taux_occupation: 3.644867 },
    { hour: 1, mean_taux_occupation: 3.414600 },
    { hour: 2, mean_taux_occupation: 3.305187 },
    { hour: 3, mean_taux_occupation: 3.271980 },
    { hour: 4, mean_taux_occupation: 3.277590 },
    { hour: 5, mean_taux_occupation: 3.225876 },
    { hour: 6, mean_taux_occupation: 5.520461 },
    { hour: 7, mean_taux_occupation: 34.358960 },
    { hour: 8, mean_taux_occupation: 36.970770 },
    { hour: 9, mean_taux_occupation: 39.142110 },
    { hour: 10, mean_taux_occupation: 39.600715 },
    { hour: 11, mean_taux_occupation: 12.317880 },
    { hour: 12, mean_taux_occupation: 13.216393 },
    { hour: 13, mean_taux_occupation: 13.349449 },
    { hour: 14, mean_taux_occupation: 12.754046 },
    { hour: 15, mean_taux_occupation: 13.367009 },
    { hour: 16, mean_taux_occupation: 14.208390 },
    { hour: 17, mean_taux_occupation: 42.187051 },
    { hour: 18, mean_taux_occupation: 42.583977 },
    { hour: 19, mean_taux_occupation: 42.074419 },
    { hour: 20, mean_taux_occupation: 40.696355 },
    { hour: 21, mean_taux_occupation: 10.632394 },
    { hour: 22, mean_taux_occupation: 3.811404 },
    { hour: 23, mean_taux_occupation: 3.665363 },
  ],
  day: [
    { day: 0, mean_taux_occupation: 19.881845 },
    { day: 1, mean_taux_occupation: 18.880427 },
    { day: 2, mean_taux_occupation: 21.301008 },
    { day: 3, mean_taux_occupation: 20.760294 },
    { day: 4, mean_taux_occupation: 19.107270 },
    { day: 5, mean_taux_occupation: 14.434085 },
    { day: 6, mean_taux_occupation: 14.342195 },
  ],
  month: [
    { month: 1, mean_taux_occupation: 20.455675 },
    { month: 2, mean_taux_occupation: 19.029896 },
    { month: 3, mean_taux_occupation: 16.874655 },
    { month: 4, mean_taux_occupation: 17.031656 },
  ],
};

const cluster2 = {
  hour: [
    { hour: 0, mean_taux_occupation: 6.468780 },
    { hour: 1, mean_taux_occupation: 5.851643 },
    { hour: 2, mean_taux_occupation: 4.868764 },
    { hour: 3, mean_taux_occupation: 4.185522 },
    { hour: 4, mean_taux_occupation: 3.744609 },
    { hour: 5, mean_taux_occupation: 3.764484 },
    { hour: 6, mean_taux_occupation: 12.061621 },
    { hour: 7, mean_taux_occupation: 41.385631 },
    { hour: 8, mean_taux_occupation: 43.660659 },
    { hour: 9, mean_taux_occupation: 45.683845 },
    { hour: 10, mean_taux_occupation: 46.496399 },
    { hour: 11, mean_taux_occupation: 18.538262 },
    { hour: 12, mean_taux_occupation: 19.169987 },
    { hour: 13, mean_taux_occupation: 19.511975 },
    { hour: 14, mean_taux_occupation: 18.996054 },
    { hour: 15, mean_taux_occupation: 19.109207 },
    { hour: 16, mean_taux_occupation: 19.556775 },
    { hour: 17, mean_taux_occupation: 48.252978 },
    { hour: 18, mean_taux_occupation: 48.722433 },
    { hour: 19, mean_taux_occupation: 47.873596 },
    { hour: 20, mean_taux_occupation: 46.980652 },
    { hour: 21, mean_taux_occupation: 17.209828 },
    { hour: 22, mean_taux_occupation: 7.134129 },
    { hour: 23, mean_taux_occupation: 6.525868 },
  ],
  day: [
    { day: 0, mean_taux_occupation: 24.945280 },
    { day: 1, mean_taux_occupation: 23.420899 },
    { day: 2, mean_taux_occupation: 24.074378 },
    { day: 3, mean_taux_occupation: 25.976380 },
    { day: 4, mean_taux_occupation: 25.569693 },
    { day: 5, mean_taux_occupation: 19.527602 },
    { day: 6, mean_taux_occupation: 18.840714 },
  ],
  month: [
    { month: 5, mean_taux_occupation: 27.285493 },
    { month: 6, mean_taux_occupation: 23.124867 },
    { month: 7, mean_taux_occupation: 22.607016 },
    { month: 8, mean_taux_occupation: 21.067341 },
    { month: 9, mean_taux_occupation: 22.500715 },
  ],
};

const cluster3 = {
  hour: [
    { hour: 0, mean_taux_occupation: 19.442547 },
    { hour: 1, mean_taux_occupation: 18.780881 },
    { hour: 2, mean_taux_occupation: 17.165383 },
    { hour: 3, mean_taux_occupation: 16.345478 },
    { hour: 4, mean_taux_occupation: 15.781987 },
    { hour: 5, mean_taux_occupation: 15.604227 },
    { hour: 6, mean_taux_occupation: 25.248714 },
    { hour: 7, mean_taux_occupation: 54.436631 },
    { hour: 8, mean_taux_occupation: 57.257619 },
    { hour: 9, mean_taux_occupation: 59.764586 },
    { hour: 10, mean_taux_occupation: 60.343757 },
    { hour: 11, mean_taux_occupation: 32.982885 },
    { hour: 12, mean_taux_occupation: 33.892734 },
    { hour: 13, mean_taux_occupation: 34.384662 },
    { hour: 14, mean_taux_occupation: 34.088559 },
    { hour: 15, mean_taux_occupation: 34.206355 },
    { hour: 16, mean_taux_occupation: 35.411799 },
    { hour: 17, mean_taux_occupation: 63.959529 },
    { hour: 18, mean_taux_occupation: 64.760602 },
    { hour: 19, mean_taux_occupation: 64.655540 },
    { hour: 20, mean_taux_occupation: 62.962742 },
    { hour: 21, mean_taux_occupation: 32.626330 },
    { hour: 22, mean_taux_occupation: 20.480098 },
    { hour: 23, mean_taux_occupation: 19.881174 },
  ],
  day: [
    { day: 0, mean_taux_occupation: 39.121623 },
    { day: 1, mean_taux_occupation: 37.684614 },
    { day: 2, mean_taux_occupation: 38.695951 },
    { day: 3, mean_taux_occupation: 38.518843 },
    { day: 4, mean_taux_occupation: 39.800459 },
    { day: 5, mean_taux_occupation: 34.741878 },
    { day: 6, mean_taux_occupation: 32.723340 },
  ],
  month: [
    { month: 10, mean_taux_occupation: 34.528915 },
    { month: 11, mean_taux_occupation: 37.946407 },
    { month: 12, mean_taux_occupation: 39.398477 },
  ],
};
const DataVue = () => {
  const [timeFrame, setTimeFrame] = useState(0); // Utilisation de l'index pour le contrôle

  const getChartData = () => {
    const now = moment();
    const currentMonth = now.month()+1;
    let filteredData = [];
  
    let selectedCluster = null;
    if (currentMonth >= 1 && currentMonth <= 4) {
      selectedCluster = cluster1; // Janvier à mars
    } else if (currentMonth >= 5 && currentMonth <= 9) {
      selectedCluster = cluster2; // Avril à juin
    } else {
      selectedCluster = cluster3; // Juillet à décembre
    }
  
    // Abréviations des jours et des mois
    const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const monthsOfYear = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  
    if (timeFrame === 0) {
      const last7Hours = [...Array(7)].map((_, index) => {
        const hour = (now.hour() - index + 24) % 24;
        return {
          hour,
          mean_taux_occupation: selectedCluster.hour.find(
            (data) => data.hour === hour
          )?.mean_taux_occupation || 0,
        };
      }).reverse();
      filteredData = last7Hours;
    } else if (timeFrame === 1) {
      const last7Days = [...Array(7)].map((_, index) => {
        const day = (now.day() - index + 7) % 7;
        return {
          day,
          mean_taux_occupation: selectedCluster.day.find(
            (data) => data.day === day
          )?.mean_taux_occupation || 0,
        };
      }).reverse();
      filteredData = last7Days;
    } else if (timeFrame === 2) {
      const last7Months = [...Array(7)].map((_, index) => {
        const month = (now.month() - index + 12) % 12;
        return {
          month,
          mean_taux_occupation: selectedCluster.month.find(
            (data) => data.month === month
          )?.mean_taux_occupation || 0,
        };
      }).reverse();
      filteredData = last7Months;
    }
  
    return {
      labels: filteredData.map((data) => {
        if (timeFrame === 0) return `${data.hour}h`;
        if (timeFrame === 1) return daysOfWeek[data.day];
        return monthsOfYear[data.month];
      }),
      datasets: [
        {
          data: filteredData.map((data) => data.mean_taux_occupation),
          strokeWidth: 3,
          color: () => '#007bff', // Couleur de la ligne
        },
      ],
    };
  };
  

  // Dynamically set the title based on the selected timeframe
  const getTitle = () => {
    switch (timeFrame) {
      case 0:
        return "Taux d'occupation en %";
      case 1:
        return "Taux d'occupation en %";
      case 2:
        return "Taux d'occupation en %";
      default:
        return 'Sélectionnez l\'affichage';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{getTitle()}</Text>

    
        {/* Graphique */}
        <LineChart
        data={getChartData()}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#e4e2dd', // Fond beige
          backgroundGradientFrom: '#e4e2dd',
          backgroundGradientTo: '#e4e2dd',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Couleur de la ligne en bleu
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 14,
            fontWeight: 'bold',
            fill: '#333',
          },
        }}
        yAxisSuffix="" // Si vous voulez ajouter une unité comme "kg", vous pouvez changer ici.
        yAxisInterval={1} // Intervalle de l'axe Y.
        fromZero={true} // Assure que l'échelle de Y commence à 0.
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
       {/* Groupe de boutons */}
            <SegmentedControlTab
            values={['Heures', 'Jours', 'Mois']} // Libellé des boutons
            selectedIndex={timeFrame}
            onTabPress={(index) => setTimeFrame(index)} // Mise à jour de l'index lorsqu'un bouton est pressé
            tabsContainerStyle={styles.segmentedControl}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.textStyle}
          />
          {timeFrame === 0 ? (
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Heures&nbsp;
              <Text style={{ fontWeight: 'normal', fontSize: 14 }}>
                (Données des dernières 7 heures) ce graphe presente le taux d'occupation moyen pour les dernieres 7 heures.
              </Text>
            </Text>
          ) : timeFrame === 1 ? (
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Jours&nbsp;
              <Text style={{ fontWeight: 'normal', fontSize: 14 }}>
                (Données des 7 derniers jours)  ce graphe presente le taux d'occupation moyen pour les 7 derniers jours.
              </Text>
            </Text>
          ) : timeFrame === 2 ? (
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Mois&nbsp;
              <Text style={{ fontWeight: 'normal', fontSize: 14 }}>
                (Données des 7 derniers mois) ce graphe presente le taux d'occupation moyen pour les 7 derniers mois.
              </Text>
            </Text>
          ) : (
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Mois&nbsp;
              <Text style={{ fontWeight: 'normal', fontSize: 14 }}>
                (Mode par défaut : Mois)
              </Text>
            </Text>
          )}
          
          
  
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e4e2dd' // Fond général en gris très clair
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e4e2dd', // Fond beige
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: "black", // Titre en bleu
    marginBottom: 10,
    textAlign: 'center',
    marginBottom: 30,
  },
  segmentedControl: {
    marginBottom: 20,
  },
  tabStyle: {
    backgroundColor: '#e4e2dd',
    borderColor: '#007bff',
  },
  activeTabStyle: {
    backgroundColor: '#007bff',
  },
  textStyle: {
    color: '#007bff',
  },
});

export default DataVue;




