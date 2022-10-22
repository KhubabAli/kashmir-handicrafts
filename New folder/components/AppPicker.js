import React, {useState} from "react";
import {
    Button,
    FlatList,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import AppText from "./AppText/AppText";
import defaultStyles from "../config/styles";
import Screen from "../screens/Screen";
import PickerItem from "./PickerItem";
import colors from "../config/colors";

export default function AppPicker({
                                      icon,
                                      items,
                                      numberOfColumns,
                                      PickerItemComponent = PickerItem,
                                      placeholder,
                                      selectedItem,
                                      onSelectItem,
                                      width = "100%",
                                      ...otherProps
                                  }) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <TouchableWithoutFeedback   onPress={() => setModalVisible(true)}>
                <View style={[styles.container, {width}]}>
                    {icon && (
                        <MaterialCommunityIcons
                            name={icon}
                            size={25}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                        />
                    )}

                    {selectedItem ? <AppText style={styles.text}> {selectedItem.label} </AppText>
                        : <AppText style={styles.placeholder}> {placeholder} </AppText>}

                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={25}
                        color={defaultStyles.colors.medium}
                    />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide">
                <Screen>
                    <Button title="close" onPress={() => setModalVisible(false)}/>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.name.toString()}
                        numColumns = {numberOfColumns}
                        renderItem={({item}) => (
                            <PickerItemComponent
                                item={item}

                                onPress={() => {
                                    setModalVisible(false);
                                    console.log(item)
                                    onSelectItem(item);
                                }}
                            />
                        )}
                    />
                </Screen>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        alignItems: "center",
    },
    icon: {
        marginRight: 10,
    },
    text: {
        flex: 1,
    },
    placeholder: {
        color: colors.medium,
        flex: 1,
    }
});
