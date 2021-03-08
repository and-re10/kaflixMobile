import React, { useEffect, useState} from 'react'
import { View, Text, Button, StatusBar, Image, StyleSheet, ScrollView } from 'react-native'

import apiMovies from '../../api/moviesApi';

import ReprendreMenu from "../../Components/HomeScreen/reprendre/index";
import ActuellesMenu from "../../Components/HomeScreen/actuelles/index";
import SuccesMenu from "../../Components/HomeScreen/succes_kaflix/index";
import Top10Menu from "../../Components/HomeScreen/top10/index";
import OriginauxMenu from "../../Components/HomeScreen/originaux/index";

export default function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);

    function fetchData (search) {
        apiMovies.get(search).then(response => {
            setData(response.data.Search);
        });
    };

    useEffect(() => {
        const serach = "batman";
        fetchData(serach);
    }, [])


    return (
        <>
            <StatusBar barStyle="light-content"/>
            <ScrollView style={{flex: 1, backgroundColor:"black", paddingTop: 100}}>
                <View style={{alignItems: "center", marginBottom: 40}} onPress={() => console.log(movies[0].Title)}>
                    <Text style={{color: "white", fontSize: 40, fontWeight: "bold"}} onPress={() => console.log("hello")}>KAFLIX</Text>
                </View>
                <View style={{width: "100%", height: 400, backgroundColor: "grey"}}>
                    <Image source={{uri: data[0]?.Poster}} style={{width: "100%", height: 400}} />
                </View>
                <ReprendreMenu/>
                <ActuellesMenu/>
                <SuccesMenu/>
                <Top10Menu/>
                <OriginauxMenu/>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      color: "white",
      paddingTop: 10,
      marginBottom: 30,
    },
    title: {
      fontSize: 25,
      color: "white",
      marginLeft: 10,
      marginTop: 40,
      marginBottom: 10,
      fontWeight: "700",
    },
    col: {
      width: 130,
      marginRight: 10,
      alignItems: "center",
      marginLeft: 10,
    },
    cards: {
      height: 130,
      width: 130,
      backgroundColor: "grey",
      borderRadius: 10,
    }
  });
