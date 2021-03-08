import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'

export default function DetailsScreen({ route }) {

    const {Title, Year, Poster} = route.params;
    
    return (
        <ScrollView style={{backgroundColor: "black"}}>
            <View style={{width: "100%", height: 400, alignItems: "center", justifyContent: "center"}}>
                <Image source={{uri: Poster}} style={{height: 320, width: "50%", borderRadius: 20, borderColor: "grey", borderWidth: 2}} />
            </View>
            <View style={{alignItems: "center", paddingHorizontal: 40}}>
                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "white", fontSize: 30}}>{Title} - <Text style={{fontSize: 25}}>{Year}</Text></Text>
                </View>
                
                <Text style={{color: "white", fontSize: 20, marginVertical: 20, textAlign: "justify"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam adipisci earum nostrum corporis hic unde, ea beatae, rem temporibus fugit est culpa ducimus accusantium tempore vero nesciunt vel impedit voluptatem?
                Ratione alias cupiditate molestias nulla maxime dolore placeat, veniam ex! Aperiam, reiciendis iure, doloribus repellat quisquam debitis soluta quas dicta velit sunt porro corrupti quam minima odit delectus, iste dolor.
                Veritatis voluptate, ratione accusamus aliquam ad sit enim corrupti esse doloribus. Eum ipsa architecto qui in quae cupiditate laudantium animi sunt quod. Tempora odio ducimus unde, natus necessitatibus commodi adipisci.</Text>
            </View>
            
        </ScrollView>
    )
}
