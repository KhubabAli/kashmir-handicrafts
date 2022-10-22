import React from "react";
import {Image, StyleSheet, View} from "react-native";

export default ({images}) => {
    const count = images.length + 1;
    return <View style={styles.imagesContainer}>{
        images.map(image => {
            return (
                <View style={[styles.imageContainer, {
                    height: "100%",
                    width: "100%",
                }]}>
                    <Image
                        style={[styles.image, {}]}
                        source={{uri: image}}/>
                </View>
            )
        })
    }
    </View>
}
const styles = StyleSheet.create({
    image: {
        flex: 1
    },
    imageContainer: {
        backgroundColor: '#fff',
        borderRadius: 24,
        height: 230,
        overflow: "hidden",
        shadowColor: '#000000',
        elevation: 20,
        width: 143,
    },
    imagesContainer: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
})