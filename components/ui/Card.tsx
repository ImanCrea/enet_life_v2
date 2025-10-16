import React from 'react';
import {StyleProp, StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type TCardProps = {
    style?: StyleProp<ViewStyle>;
    children?: any;
};
export default function Card({children, style}: TCardProps) {
    //const { borderRaduis, marginBottom } = props;
    return (
        // @ts-ignore
        <View style={{...styles.card, ...style}}>
            <View style={styles.cardContent}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        elevation: 2,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        //marginHorizontal: 18,
        //marginVertical: 10,
    },
});
