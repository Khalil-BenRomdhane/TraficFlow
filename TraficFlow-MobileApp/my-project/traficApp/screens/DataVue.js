import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/AntDesign'; // Icône pour revenir en arrière

const DataView = ({ navigation }) => {

  return (

      <WebView
        source={{
          uri: 'https://opendata.paris.fr/chart/embed/?dataChart=eyJ0aW1lc2NhbGUiOiJob3VyIiwicXVlcmllcyI6W3siY2hhcnRzIjpbeyJ0eXBlIjoic3BsaW5lIiwiZnVuYyI6IkFWRyIsInlBeGlzIjoicSIsInNjaWVudGlmaWNEaXNwbGF5Ijp0cnVlLCJjb2xvciI6IiNmZjVjMzMifV0sInhBeGlzIjoidF8xaCIsIm1heHBvaW50cyI6IiIsInRpbWVzY2FsZSI6Im1vbnRoIiwic29ydCI6IiIsImNvbmZpZyI6eyJkYXRhc2V0IjoiY29tcHRhZ2VzLXJvdXRpZXJzLXBlcm1hbmVudHMiLCJvcHRpb25zIjp7fX19XSwiYWxpZ25Nb250aCI6dHJ1ZSwiZGlzcGxheUxlZ2VuZCI6dHJ1ZX0%3D',
        }}
        style={styles.webview}
        startInLoadingState={true}
       
      />

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e2dd',
  },
  header: {
    backgroundColor: '#004aad',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  webview: {
    flex: 1,
  },
});
export default DataView;
