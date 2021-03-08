import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import apiMovies from '../../../api/moviesApi'



const ActuellesMenu = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

    function fetchData(search){
        apiMovies.get(search).then(response => {
            setData(response.data.Search);
        })
    }

    useEffect(() => {
        search = "batman";
        fetchData(search);
    }, [])

    // Affichage du nom du film sur la console
    const handlePressConsole = (movie) => console.warn(movie);

    // Affichage du nom du film sur la console
    const handlePressAlert = (movie) => alert(movie);

  return (
    <>
          <Text style={styles.title}>Tendances actuelles</Text>
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
  // container: {
  //   flex: 1,
  //   backgroundColor: "black",
  //   color: "white",
  //   paddingTop: 40,
  // },
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
    marginHorizontal: 40,
    alignItems: "center",
  },
  cards: {
    height: 300,
    width: 200,
    backgroundColor: "grey",
    // borderRadius: 10,
    marginHorizontal: 20,
  }
});

export default ActuellesMenu;
