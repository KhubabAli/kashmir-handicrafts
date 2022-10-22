import {StyleSheet, View} from 'react-native'
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Text from "./Text";

export default ({name, badgeCount, color, size}) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={name} size={size} color={color}/>
            {
                badgeCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {badgeCount}
                        </Text>
                    </View>
                )

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 24,
        height: 24,
        margin: 5
    },
    badge: {
        position: 'absolute',
        right: -12,
        top: -6,
        backgroundColor: 'red',
        borderRadius: 6,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: 'bold'
    }
})
