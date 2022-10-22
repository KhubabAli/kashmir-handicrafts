import React from 'react';
import {FlatList, StyleSheet} from "react-native";
import BannerItem from "./BannerItem";


export default () => {
    return (
        <FlatList
            data={bannerItems}
            horizontal={true}
            renderItem={(item) => <BannerItem title={item.title} image={item.image}/>}/>
    )
}

const styles = StyleSheet.create({})