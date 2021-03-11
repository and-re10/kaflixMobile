import React, { useEffect, useState, useContext} from 'react'
import { View, Text, Button, StatusBar, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import apiMovies from '../../api/moviesApi';

import ReprendreMenu from "../../Components/HomeScreen/reprendre/index";
import ActuellesMenu from "../../Components/HomeScreen/actuelles/index";
import SuccesMenu from "../../Components/HomeScreen/succes_kaflix/index";
import Top10Menu from "../../Components/HomeScreen/top10/index";
import OriginauxMenu from "../../Components/HomeScreen/originaux/index";

import AuthContext from "../../contexts/auth";

export default function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const { signed, signOut, user } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);

    function fetchData (search) {
        apiMovies.get(search).then(response => {
            setData(response.data.Search);
        });
    };

    useEffect(() => {
        const serach = "batman";
        fetchData(serach);
    }, []);

    async function handleSignOut(){
        signOut();
    }

    return (
        <>
            <StatusBar barStyle="light-content"/>
            <ScrollView style={{flex: 1, backgroundColor:"black", paddingTop: 100}}>
                {/* <View> */}
                    <TouchableOpacity style={{alignItems: "center", marginBottom: 40}} onPress={() => handleSignOut()}>
                        <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>Sign Out</Text>
                    </TouchableOpacity>
                    <View style={{alignItems: "center"}} >
                        <Text style={{color: "red", fontSize: 40, fontWeight: "bold"}} onPress={() => console.log("hello")}>KAFLIX</Text>
                    </View>
                    <View style={styles.header}>
                        <View style={styles.inputArea}>
                            <TouchableOpacity onPress={() => { 
                                navigation.navigate('Search', {
                                    Search: search.trim()
                                });
                                setSearch('');
                            }} style={styles.plus}>
                                <Feather name='search' size={24} color="black"/>
                            </TouchableOpacity>
                            <TextInput placeholder="O que est procurado?" value={search} id="searchInput" style={styles.input} onChangeText={(text) =>  {
                                setSearch(text);
                            }}/>
                        </View>
                    </View>
                    <View style={{width: "100%", height: 400, backgroundColor: "grey"}}>
                        <Image source={{uri: data[0]?.Poster}} style={{width: "100%", height: 400}} />
                    </View>
                    <ReprendreMenu userName={user.name}/>
                    <ActuellesMenu/>
                    <SuccesMenu/>
                    <Top10Menu/>
                    <OriginauxMenu/>
                {/* </View> */}
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
    },
    header: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
        marginVertical: 50,
    },
    inputArea: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '98%',
        backgroundColor: '#FFF',
        elevation: 5,
        paddingHorizontal: 10,
        height: 37,
        borderRadius: 10,
        borderColor: 'lightgrey',
        borderWidth: 1
    },
    input: {
        paddingHorizontal: 10,
        fontSize: 13,
        width: '90%'
    },
    contentNew: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    }, 
    title: {
        paddingHorizontal: 15,
        fontSize: 18,
        color: "#4f4a4a",
    }, 
    plus: {
        zIndex: 10,
    }
  });
