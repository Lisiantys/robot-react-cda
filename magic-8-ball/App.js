import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [randomAnswer, setRandomAnswer] = useState('');

  // Fonction pour récupérer une réponse aléatoire
  const fetchRandomAnswer = async () => {
    try {
      // Remplacez '192.168.x.x' par l'adresse IP locale de votre machine
      const response = await axios.get('http://192.168.8.81:3000/answers');
      const answers = response.data;

      const randomIndex = Math.floor(Math.random() * answers.length);
      setRandomAnswer(answers[randomIndex].text);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      setRandomAnswer("Erreur lors du chargement des réponses");
    }
  };

  // Utilise useEffect pour appeler l'API lors du premier chargement
  useEffect(() => {
    fetchRandomAnswer();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header avec le nom du jeu */}
      <View style={styles.header}>
        <Text style={styles.headerText}>GPT - 5.0</Text>
      </View>

      {/* Image en arrière-plan */}
      <ImageBackground 
        source={require('./assets/boule8.png')}
        style={styles.backgroundImage}
        resizeMode="contain"
      >
        {/* Texte centré sur l'image */}
        <Text style={styles.answerText}>
          {randomAnswer ? randomAnswer : "Chargement de la réponse..."}
        </Text>
      </ImageBackground>

      {/* Bouton tout en bas */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={fetchRandomAnswer} style={styles.btn}>
          <Text style={styles.btnText}>Obtenir une nouvelle réponse</Text>
        </TouchableOpacity>
      </View>
      
      {/* Supprimer la barre de statut */}
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between', // Espace entre header, contenu et footer
  },
  header: {
    backgroundColor: '#000070',
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  backgroundImage: {
    width: 300,
    height: 300, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#000070',
    borderRadius: 1000,
  },
  answerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 100,
  },
  footer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: "#000070",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
  },
});
