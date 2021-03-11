import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import apiMovies from "../../api/moviesApi";
import { Card } from "../../Components/Cards/styles"

export default function SearchScreen({ route, navigation }) {

    const [data, setData] = useState([]);

    const { Search } = route.params;

    function fetchData(search){
        apiMovies.get(search).then(response => {
            setData(response.data.Search);
        });
    }

    useEffect(() => {
        fetchData(Search)
    }, []);

    return (
        <ScrollView vertical style={{flex: 1, backgroundColor: "black"}}>
            <View style={{flex: 1,flexDirection: "row", flexWrap: "wrap" ,backgroundColor: "black", justifyContent: "space-around"}}>
                <View style={{width: "100%", alignItems: "center"}}>
                    <Text style={styles.title}>{Search}</Text>
                </View>
                {data?.map((movie, index) => {
                    return (
                        <View key={index} style={{width: "50%", alignItems: "center", marginBottom: 20}}>
                            <TouchableOpacity style={styles.cards} onPress={() => navigation.navigate('Details', {
                            Title: movie.Title,
                            Poster: movie.Poster,
                            Year: movie.Year
                            })}>
                                <Image style={{width: "100%", height:"100%", borderRadius: 10}} source={{uri: movie.Poster}}/>
                            </TouchableOpacity>
                            <Text style={{color: "lightgrey", fontSize: 12, fontWeight: "700", width: 130, textAlign: "center"}}>{movie.Title}</Text>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        color: "white",
        marginLeft: 20,
        marginTop: 40,
        marginBottom: 40,
        fontWeight: "700",
    },
    cards: {
        height: 200,
        width: 130,
        backgroundColor: "grey",
        borderRadius: 10,
        margin: 10,
        borderColor: "grey",
        borderWidth: 2
    }
  });
