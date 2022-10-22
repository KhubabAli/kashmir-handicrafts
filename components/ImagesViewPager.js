import React, {useState} from "react";
import PagerView from "react-native-pager-view";
import {View, Image, StyleSheet, Dimensions} from 'react-native'
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import Carousel from 'react-native-snap-carousel';

import PageIndicator from "./PageIndicator";
import {Buffer} from "buffer";


export default ({style, onTap, images}) => {
    const ref = React.useRef(PagerView);
    const [pageNumber, setPageNumber] = useState(0);

    return (
        <View style={style}>
            <PagerView style={{flex: 1}}
                       ref={ref}
                       collapsable={true}
                       onPageSelected={(e) => {
                           setPageNumber(e.nativeEvent.position)
                       }}>
                {
                    images.map(image => (
                        <View>
                            <ReactNativeZoomableView
                                maxZoom={4}
                                minZoom={1}
                                zoomStep={0.5}
                                initialZoom={1}
                                zoomEnabled

                                bindToBorders={true}>
                                <Image
                                    style={{width: "100%", height: "100%"}}
                                    source={{
                                        uri: 'data:image/jpeg;base64,' +
                                            Buffer.from(image).toString('base64'), //data.data in your case
                                    }} resizeMode="cover" onTap={onTap}/>
                            </ReactNativeZoomableView>
                        </View>
                    ))
                }
            </PagerView>
            <PageIndicator style={styles.pageIndicator} selectedPage={pageNumber} totalPages={images.length}/>
        </View>
    )
}

const styles = StyleSheet.create({
    pageIndicator: {
        position: "absolute",
        bottom: 12,
        start: 32,
    }
})