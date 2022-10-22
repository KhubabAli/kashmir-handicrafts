import React, {useContext} from 'react';
import {View, StyleSheet, FlatList} from "react-native";


import colors from "../config/colors";
import AuthContext from "../auth/contex";
import Screen from "./Screen";
import ListItem from "../components/ListItem";
import Text from "../components/Text";
import Icon from "../components/Icon";
import ListItemSeperator from "../components/ListItemSeperator";
import routes from "../navigation/routes"
import authStorage from "../auth/storage";

const menuItems = [
    {
        title: "My Orders",
        icon: {
            iconName: "format-list-bulleted",
            backgroundColor: colors.primary,
        },
        targetScreen: routes.ORDERS
    },
    {
        title: "Favorite",
        icon: {
            iconName: "heart",
            backgroundColor: colors.primary
        }
    },
    {
        title: "My Addresses",
        icon: {
            iconName: "map-marker",
            backgroundColor: colors.primary
        }
    },
    {
        title: "Settings",
        icon: {
            iconName: "cog",
            backgroundColor: colors.primary
        }
    },

]

export default ({navigation}) => {
    const handleLogOut = () => {
        setUser(null);
        authStorage.removeToken();
    }
    const {user, setUser} = useContext(AuthContext);

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                {user ? <ListItem
                    title={user.name}
                    subtitle={user.phone}
                /> : <View style={styles.loginPrompt}>
                    <Text style={styles.loginPromptText}>Login To View User Detail</Text>
                </View>
                }
            </View>
            <FlatList
                style={[styles.container, {flexGrow: 0}]}
                data={menuItems}
                keyExtractor={(menuItem) => menuItem.title}
                ItemSeparatorComponent={ListItemSeperator}
                renderItem={
                    ({item}) => (
                        <ListItem
                            title={item.title}
                            ImageComponent={
                                <Icon
                                    iconName={item.icon.iconName}
                                    backgroundColor={item.icon.backgroundColor}/>
                            }
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    )
                }
            />
            {user ?
                <ListItem
                    onPress={handleLogOut}
                    title={"Log Out"}
                    ImageComponent={<Icon iconName={"logout"} backgroundColor={colors.primary}/>}
                /> :
                <ListItem
                    onPress={() => navigation.navigate(routes.LOGIN)}
                    title={"Log In"}
                    ImageComponent={<Icon iconName={"login"} backgroundColor={colors.primary}/>}/>}
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    },
    loginPrompt: {
        alignItems: "center",
        top: 32
    },
    screen: {
        backgroundColor: colors.light,
    },
})