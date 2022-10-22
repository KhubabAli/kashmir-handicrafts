import React from "react";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import colors from "../config/colors";
import Button from "./Button";
import Slogan from "./Slogan"
import HeroImages from "./HeroImages";

export default ({style, slogan, images}) => {
    return (
        <ImageBackground source={{uri: images[1]}}
                         style={[styles.heroContainer, style]}
                         resizeMode="cover"
        >
            <View style={styles.backgroundOverlay}/>
            <View style={styles.container}>
                <Image source={images[0]} style={{width: "100%", height: 200, resizeMode: "cover"}}/>
                {/*<HeroImages images={images}/>*/}
                <Slogan text={slogan} style={styles.slogan}/>
                <Button style={{
                    borderWidth: 2,
                    marginTop: 18,
                    paddingHorizontal: 25,
                    paddingVertical: 12,
                    borderRadius: 100,
                    borderColor: colors.black,
                }}>SHOP NOW</Button>
            </View>

        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    backgroundOverlay: {
        backgroundColor: colors.overlay,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    heroContainer: {
        margin: 10,
        backgroundColor: "black",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingTop: 28,
        paddingBottom: 100,
        paddingHorizontal: 55,
        paddingVertical: 0
    },
    slogan: {
        textTransform: "uppercase",
        color: '#fff',
        fontFamily: "LatoBlack",
        fontSize: 32,
        marginTop: 28,
        textAlign: "center",
    },
})