import React, {useState} from "react";
import PagerView from "react-native-pager-view";
import {View, Text} from 'react-native'

import BannerItem from "./BannerItem";

const bannerItems = [
    {
        title: "GET ALL KASHMIRI DRESS WITH 10% DISCOUNT",
        image: require("../assets/redponchobtrans.png"),
        key: 0
    },
    {
        title: "Lorem ipsum stratum",
        image: require("../assets/bluepheran.png"),
        key: 1
    },
    {
        title: "Lorem ipsum stratum",
        image: require("../assets/bluepheran.png"),
        key: 2

    },
]

export default ({style, onTap}) => {
    const ref = React.useRef(PagerView);
    const [pageNumber, setPageNumber] = useState(0);


    return (
        <View style={style}>
            <PagerView style={{flex: 1, backgroundColor: "blue"}}
                       ref={ref}
                       collapsable={false}
                       onPageSelected={(e) => {
                           setPageNumber(e.nativeEvent.position)
                       }}>
                {
                    bannerItems.map(bannerItem => (
                        <BannerItem title={bannerItem.title} image={bannerItem.image} onTap={onTap}/>
                    ))
                }
            </PagerView>
            {/*<PageSwitcher selectedPage={pageNumber} totalPages={bannerItems.length}*/}
            {/*              switchLeft={() => ref.current.setPage(pageNumber - 1)}*/}
            {/*              switchRight={() => ref.current.setPage(pageNumber + 1)}*/}
            {/*              switchToFirst={() => ref.current.setPage(0)}*/}
            {/*              switchToLast={() => ref.current.setPage(bannerItems.lengths)}*/}
            {/*              style={{*/}
            {/*                  left: 20,*/}
            {/*                  right: 20,*/}
            {/*                  bottom: 20,*/}
            {/*                  position: "absolute"*/}
            {/*              }}/>*/}
        </View>
    )
}