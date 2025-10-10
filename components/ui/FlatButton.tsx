import React, {BaseSyntheticEvent} from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Button,
    Text,
    NativeSyntheticEvent,
    TextStyle,
    ActivityIndicator
} from "react-native";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {COLORS} from "../../constants";

type TFlatButtonProps = {
    title: string,
    style?: StyleProp<ViewStyle>,
    disable?: boolean,
    titleStyle?: StyleProp<TextStyle>,
    onPress: (event: BaseSyntheticEvent) => void,
}

export default function FlatButton({ title, onPress, style={}, disable, titleStyle } : TFlatButtonProps) {

    return (
        <TouchableOpacity onPress={onPress} disabled={disable} activeOpacity={0.7} >
            {/*style={{...style, ...styles.button}}*/}

            {/*// @ts-ignore*/}
            <View style={{...style, ...styles.button}}>
                {disable && (
                    <ActivityIndicator size={"small"} color={COLORS.white}/>
                )}

                {!disable && (
                    // @ts-ignore
                    <Text style={{...styles.buttonText, ...titleStyle}}>
                        {title}
                    </Text>
                )}

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: COLORS.white,
        textTransform: 'none',
        textAlign: 'center',
        letterSpacing:1,
        fontWeight: '600',
        fontSize: 17,
    },
});
