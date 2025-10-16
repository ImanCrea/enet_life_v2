import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, IMAGES} from "../../../../constants";
import {TTeacherProps} from "../../../../lib/type/TTeacher";

function TeacherItem({data}: TTeacherProps) {
    return (
        <View style={styles.item}>
            <View style={styles.picContainer}>
                <View style={styles.pictureContent}>
                    <Image source={IMAGES.avatar} style={styles.picture} />
                </View>
            </View>
            <View style={styles.details}>
                <Text style={styles.nameText}>
                    {data.nomperso} {data.prenomperso}
                </Text>
                <Text style={styles.email}>{data.matiere}</Text>
                <Text style={styles.email}>{data.courriel}</Text>
            </View>
        </View>
    );
}

export default TeacherItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingHorizontal: 0,
    },
    pictureContent: {
        width: 45,
        height: 45,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        backgroundColor: COLORS.grayLight,
    },
    picture: {
        width: 45,
        height: 45,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    picContainer: {
        width: 60,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    details: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1,
        color: COLORS.gray,
    },
    email: {
        fontSize: 14,
        color: COLORS.gray,
    },
});
