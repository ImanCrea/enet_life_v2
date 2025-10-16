import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {COLORS} from "../../../constants";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

type TPayment = {
    codeversement: string,
    nomversement: string,
    montantversement: string,
    dateversement: string,
    typeversement: string
}

type TRecentPaymentItemProps = {
    data: TPayment,
    key?: number | string
}

export default function RecentPaymentItem({data}:TRecentPaymentItemProps) {
    const montantVersement = parseInt(data.montantversement);
    const montant:string = new Intl.NumberFormat("fr-FR").format(montantVersement);
    const dateVersement = Number.parseInt(data.dateversement);

    return (
        <View style={styles.recentPaymentItem}>
            <View style={{flex:2}}>
                <Text style={styles.recentPaymentType}>{data.nomversement}</Text>
                <Text style={styles.recentPaymentDate}>
                    {`${format(dateVersement, "dd", { locale: fr })} `}
                    {`${format(dateVersement, "MMM", { locale: fr })} `}
                    {format(dateVersement, "yyyy", { locale: fr })}
                </Text>
            </View>
            <View style={{flex:1}}>
                <Text style={styles.recentPaymentType}>{montant} FCFA</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    recentPaymentItem:{
        borderRadius:6,
        borderWidth:1,
        borderColor: COLORS.grayVeryLight,
        padding:12,
        flex:1,
        flexDirection:'row',
        marginBottom:12,
    },
    recentPaymentDate: {
        fontSize:13,
        letterSpacing:1,
        color: COLORS.gray,
        textTransform: 'capitalize'
    },
    recentPaymentType:{
        fontWeight:'500',
        fontSize:15,
        color: COLORS.secondary
    },
})
