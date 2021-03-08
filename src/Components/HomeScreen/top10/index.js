import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from "@react-navigation/native"

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import apiMovies from "../../../api/moviesApi";

const Top10Menu = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  function fetchData(search){
    apiMovies.get(search).then(response => {
      setData(response.data.Search);
    })
  }

  useEffect(() => {
    let search = 'hacking'
    fetchData(search);
  }, [])

    // Affichage du nom du film sur la console
    const handlePressConsole = (movie) => console.log(movie);

    // Affichage du nom du film sur la console
    const handlePressAlert = (movie) => alert(movie);

  return (
    <>
          <Text style={styles.title}>Top 10 en Belgique aujourd'hui</Text>
          <ScrollView style={{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>
            {data?.map( m => 
              <TouchableOpacity style={styles.col} key={m.imdbID} onPress={() => navigation.navigate('Details', {
                Title: m.Title,
                Poster: m.Poster,
                Year: m.Year
              })}>
                <View style={styles.cards}>
                  <Image style={{flex: 1, height: null, width: null, resizeMode: "cover"}} source={{uri: m.Poster}}/>
                </View>
                <Text style={{color: "lightgrey", fontSize: 12, marginTop: 8, fontWeight: "700"}}>{m.Title}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
    paddingTop: 40,
  },
  title: {
    fontSize: 25,
    color: "white",
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 10,
    fontWeight: "700",
  },
  col: {
    width: 130,
    marginHorizontal: 20,
    alignItems: "center",
  },
  cards: {
    height: 260,
    width: 160,
    backgroundColor: "grey",
    marginHorizontal: 20,
  }
});

export default Top10Menu;