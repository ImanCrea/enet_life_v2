import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {COLORS} from "../../../constants";

function MoreMenuButton({icon, title, size = 18, color = COLORS.grayLightIcon, handleNavigation}) {
    return (
        <TouchableOpacity onPress={handleNavigation} activeOpacity={0.5}>
            <View style={styles.menuContainer}>
                <MaterialIcons name={icon} size={size} color={color} />
                <Text style={styles.menuStyle}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default MoreMenuButton;

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginHorizontal: 15,
        alignItems: 'center',
        borderBottomColor: COLORS.grayVeryLight,
        borderBottomWidth: 1,
    },
    menuStyle: {
        marginLeft: 10,
        fontSize: 16,
        color: COLORS.gray,
    },
});
