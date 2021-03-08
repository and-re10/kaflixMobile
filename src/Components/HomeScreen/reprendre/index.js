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
import { useNavigation } from "@react-navigation/native";
import apiMovies from '../../../api/moviesApi';

const ReprendreMenu = () => {
    const navigation = useNavigation();

    const [data, setData] = useState([]);

    // hooks pour enregistrer le nombre de clicks sur chaque filme
    const [movieClick, setMovieClick] = useState([

    ])

    function fetchData(search){
      apiMovies.get(search).then(response => {
        setData(response.data.Search)
      })
    }

    useEffect(() => {
      let search = 'joker'
      fetchData(search)
    }, [])

    //a chaque click, actualizer le filtre favorite
    function handleClick(){
      // const newRepositories = movies.map(m => {
      //   return m.id === id? {...m, click: 0} : m
      // });
      
        
      //actualise si le repositorie est favorité ou pas 
      setData(data?.map((m, i) => {
        return false ? {...m, click: 1}:{...m, click: 0}
      }));
      // alert(clicks[0].click)
      // alert(movies[0].click)
    };

    // Affichage du nom du film sur la console
    const handlePressConsole = (movie) => console.log(movie);

    // Affichage du nom du film sur la console
    const handlePressAlert = (movie, click) => {
      const add_click = movie.click = 0
      alert("nom du film: " + movie + "N° de clicks: " + click);
    }

  return (
    <>
          <Text style={styles.title}>Reprendre avec André</Text>
          <ScrollView style={{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>
            {data?.map((m, i) => 
                <TouchableOpacity style={styles.col} key={i} onPress={() => navigation.navigate('Details', {
                  Title: m.Title,
                  Poster: m.Poster,
                  Year: m.Year
                })}>
                    <View style={styles.cards}>
                        <Image style={{flex: 1, height: null, width: null, resizeMode: "cover", borderRadius: 90, margin: 3}} source={{uri: m.Poster}}/>
                    </View>
            <Text style={{color: "lightgrey", fontSize: 12, marginTop: 8, fontWeight: "700"}} >{m.Title}{m.click}</Text>
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
  //   paddingBottom: 100,
  // },
  title: {
    fontSize: 25,
    color: "white",
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: "700",
  },
  col: {
    width: 130,
    marginHorizontal: 3,
    borderRadius: 60,
    alignItems: "center",
  },
  cards: {
    height: 120,
    width: 120,
    // backgroundColor: "grey",
    borderRadius: 60,
    marginHorizontal: 20, 
    borderColor: "grey", 
    borderWidth: 1,
  }
});

export default ReprendreMenu;