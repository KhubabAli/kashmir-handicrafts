import React, {useEffect} from 'react';
import {Alert, Image, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Icon} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';

import colors from "../config/colors";


export default ({imageUri, onChangeImage}) => {
    useEffect(() => {
        requestPermission();
    }, [])
     
    const requestPermission = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) alert("You need to enable permission to acces the images");
    };

    const handlePress = () => {
        if (!imageUri) selectImage();
        else Alert.alert("Delete", "Are you sure you want to delete the image?",
            [
                {text: "Yes", onPress: () => onChangeImage(null)},
                {text: "NO"},
            ]);
    }

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5
            });

            if (!result.cancelled) onChangeImage(result.uri)


        } catch (e) {
            console.log("Error Loading the Image.")
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri && <Icon name={"camera"} size={40} color={colors.textGray}/>}
                {imageUri && <Image source={{uri: imageUri}} style={styles.image}/>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.lightGray,
        borderRadius: 5,
        overflow: "hidden",
        height: 100,
        justifyContent: "center",
        width: 100,
    },
    image: {
        width: "100%",
        height: "100%"
    }
})