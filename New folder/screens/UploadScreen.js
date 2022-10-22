import React from 'react';
import {Modal, StyleSheet, View} from "react-native";
import * as Progress from 'react-native-progress';
import LottieView from "lottie-react-native";
import colors from "../config/colors";

const UploadScreen = ({progress, visible = false, onDone}) => {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                {(progress < 1) ?
                    (<Progress.Bar color={colors.primary} progress={progress} width={200}/>) :
                    (<LottieView autoPlay loop={false} style={styles.animation} autoSize={true}
                                 onAnimationFinish={onDone}
                                 source={require("../assets/animations/done.json")}/>)
                }
            </View>
        </Modal>
    );
};
    
const styles = StyleSheet.create({
    animation: {},
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
})


export default UploadScreen;
