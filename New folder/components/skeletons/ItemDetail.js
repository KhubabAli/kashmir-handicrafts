import {View, Animated} from "react-native";
import colors from "../../config/colors";
import Shimmer from "../Shimmer";

export default ({style}) => {
    return (
        <Animated.View style={style}>
            <Shimmer width={"100%"} height={32}/>
            <Shimmer width={"25%"} height={32} style={{marginTop: 10}}/>
            <Shimmer width={"25%"} height={16} style={{marginTop: 32}}/>
            <Shimmer width={"50%"} height={16} style={{marginTop: 24}}/>
            <Shimmer width={"100%"} height={16} style={{marginTop: 24}}/>
            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 56}}>
                <Shimmer width={"80%"} height={40} style={{borderRadius: 100, marginHorizontal: 12}}/>
            </View>

        </Animated.View>

    )
}