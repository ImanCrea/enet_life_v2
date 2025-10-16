import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {COLORS} from "../../../../constants";
import {TReportCardProps} from "../../../../lib/type/TReportCard";
import {generateBulletinLink} from "../../../../utils/utilities";

function BulletinItem({data}: TReportCardProps) {
    const {t} = useTranslation();
    //const {selectedStudent} = useSelector((state: any) => state.student);
    const {user} = useSelector((state: any) => state.user);
    const openReportCard = () => {
        try {
            if (user !== null && data !== undefined) {
                const uri = generateBulletinLink(user.urlplateforme, data.bulletin);
                Linking.openURL(uri).then();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity onPress={() => openReportCard()} activeOpacity={1}>
            <View style={styles.item}>
                <MaterialIcons
                    name="picture-as-pdf"
                    size={28}
                    color={COLORS.yellowDark}
                />
                <Text style={styles.title}>
                    {t('more.report_text')} {data.nomperiod}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default BulletinItem;

const styles = StyleSheet.create({
    item: {
        width: 105,
        height: 130,
        padding: 5,
        marginLeft: 5,
        marginRight: 10,
        marginBottom: 20,
        borderRadius: 3,
        borderColor: COLORS.grayMedium,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    title: {
        fontSize: 13,
        color: COLORS.primary,
        marginTop: 5,
        textAlign: 'center',
    },
});
