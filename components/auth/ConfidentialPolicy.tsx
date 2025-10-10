import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {globalStyles} from "../../style/Global";
import {COLORS, IMAGES, ROUTES} from "../../constants";
import FlatButton from "../../components/ui/FlatButton";
import {useTranslation} from "react-i18next";
import Spacer from "../ui/Spacer";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {useRouter} from "expo-router";

function ConfidentialPolicy() {
    const { t } = useTranslation();
    const router = useRouter();
    const handlePolicy = () => {
        router.push(ROUTES.LOGIN);
    }

    return (
        <View style={globalStyles.container}>
            <View style={{...styles.smallLogoContainer}}>
                <Image
                    source={IMAGES.logoEnet}
                    style={styles.responsiveLogo}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.textContainer}>
                <ScrollView style={{flex:1}}>
                    <Text style={globalStyles.title}>Conditions générales d'utilisation</Text>
                    <Spacer height={10} />
                    <Text style={[globalStyles.paragraph, {textAlign: "justify"}] as StyleProp<any>}>
                        Veuillez lire attentivement les présentes conditions générales avant d'utiliser notre service.
                    </Text>
                    <Spacer height={15} />

                    <Text style={[globalStyles.titleH3, {color: COLORS.primary}]}>
                        Interprétation et définitions
                    </Text>
                    <Spacer height={10} />

                    <Text style={[globalStyles.titleH3, {color: COLORS.primary}]}>Interprétation</Text>
                    <Spacer height={5} />

                    <Text style={{...globalStyles.paragraph,textAlign: 'justify'} as StyleProp<any>}>
                        Les mots dont la lettre initiale est en majuscule ont des significations définies dans les conditions suivantes. Les définitions suivantes ont la même signification, qu'elles apparaissent au singulier ou au pluriel.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.titleH3, color: COLORS.primary}}>
                        Définitions
                    </Text>
                    <Spacer height={5} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Aux fins des présentes conditions générales, on entend par
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Application désigne le programme logiciel fourni par la Société et téléchargé par Vous sur tout appareil électronique, nommé ENET LIFE.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.paragraph,textAlign: 'justify'} as StyleProp<any>}>
                        Application Store désigne le service de distribution numérique exploité et développé par Apple Inc. (Apple App Store) ou Google Inc. (Google Play Store) dans lequel l'Application a été téléchargée.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Affilié désigne une entité qui contrôle, est contrôlée par ou est sous contrôle commun avec une partie, le terme "contrôle" désignant la propriété de 50 % ou plus des actions, participations ou autres titres donnant droit à un vote pour l'élection des administrateurs ou d'autres responsables de la gestion.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Le pays se réfère à : Côte d'Ivoire
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Société (désignée par "la Société", "Nous", "Notre" ou "Nos" dans le présent accord) désigne ENET AFRICA, Riviera Palmeraie, Cocody, Côte d'Ivoire.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Appareil désigne tout appareil pouvant accéder au Service tel qu'un ordinateur, un téléphone portable ou une tablette numérique.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Service désigne l'Application.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Termes et Conditions (également appelés "Termes") désigne les présents Termes et Conditions qui constituent l'intégralité de l'accord entre Vous et la Société concernant l'utilisation du Service.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Service de médias sociaux tiers : tout service ou contenu (y compris les données, informations, produits ou services) fourni par un tiers qui peut être affiché, inclus ou rendu disponible par le Service.
                        On entend par "vous" la personne qui accède au service ou l'utilise, ou la société ou autre entité juridique au nom de laquelle cette personne accède au service ou l'utilise, selon le cas.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.titleH3, color: COLORS.primary}}>
                        Reconnaissance
                    </Text>
                    <Spacer height={5} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Les présentes conditions générales régissent l'utilisation de ce service et constituent l'accord conclu entre vous et la société. Ces conditions définissent les droits et obligations de tous les utilisateurs en ce qui concerne l'utilisation du service.
                        Votre accès au service et son utilisation sont subordonnés à votre acceptation et à votre respect des présentes conditions générales. Ces conditions s'appliquent à tous les visiteurs, utilisateurs et autres personnes qui accèdent au service ou l'utilisent.
                        En accédant au service ou en l'utilisant, vous acceptez d'être lié par les présentes conditions générales. Si vous n'êtes pas d'accord avec une partie de ces conditions, vous ne pouvez pas accéder au service.
                        Vous déclarez avoir plus de 18 ans. La société n'autorise pas les personnes de moins de 18 ans à utiliser le service.
                        Votre accès et votre utilisation du service sont également conditionnés par votre acceptation et votre respect de la politique de confidentialité de la société. Notre politique de confidentialité décrit nos politiques et procédures en matière de collecte, d'utilisation et de divulgation de vos informations personnelles lorsque vous utilisez l'application ou le site web et vous informe de vos droits en matière de confidentialité et de la manière dont la loi vous protège. Veuillez lire attentivement notre politique de confidentialité avant d'utiliser notre service.
                    </Text>
                    <Spacer height={10} />


                    <Text style={{...globalStyles.titleH3, color: COLORS.primary}}>
                        Liens vers d'autres sites web
                    </Text>
                    <Spacer height={5} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Notre Service peut contenir des liens vers des sites web ou des services de tiers qui ne sont pas détenus ou contrôlés par la Société.
                        La Société n'a aucun contrôle et n'assume aucune responsabilité quant au contenu, aux politiques de confidentialité ou aux pratiques des sites web ou services tiers. Vous reconnaissez et acceptez en outre que la Société ne peut être tenue responsable, directement ou indirectement, de tout dommage ou perte causé ou supposé causé par ou en relation avec l'utilisation ou la confiance accordée à un tel contenu, biens ou services disponibles sur ou par l'intermédiaire de ces sites web ou services.
                        Nous vous conseillons vivement de lire les conditions générales et les politiques de confidentialité des sites web ou services tiers que vous visitez.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.titleH3, marginBottom:5, color: COLORS.primary}}>
                        Résiliation
                    </Text>
                    <Spacer height={5} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Nous pouvons résilier ou suspendre votre accès immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, mais sans s'y limiter, si vous enfreignez les présentes conditions générales.
                        En cas de résiliation, votre droit d'utiliser le service cessera immédiatement.
                    </Text>
                    <Spacer height={10} />

                    <Text style={{...globalStyles.titleH3, color: COLORS.primary}}>
                        Limitation de la responsabilité
                    </Text>
                    <Spacer height={5} />

                    <Text style={{...globalStyles.paragraph, textAlign: 'justify'} as StyleProp<any>}>
                        Nonobstant tout dommage que vous pourriez subir, l'entière responsabilité de la Société et de ses fournisseurs en vertu de toute disposition des présentes conditions et votre recours exclusif pour tout ce qui précède seront limités au montant effectivement payé par vous par l'intermédiaire du service ou à 100 USD si vous n'avez rien acheté par l'intermédiaire du service.
                        Dans toute la mesure permise par la loi applicable, la Société ou ses fournisseurs ne peuvent en aucun cas être tenus responsables des dommages spéciaux, accessoires, indirects ou consécutifs quels qu'ils soient (y compris, mais sans s'y limiter, les dommages pour perte de bénéfices, perte de données ou d'autres informations, pour interruption d'activité, pour préjudice corporel, perte de vie privée résultant de l'utilisation ou de l'impossibilité d'utiliser le service, les logiciels de tiers et/ou le matériel de tiers utilisés avec le service, ou en rapport avec toute disposition des présentes conditions), même si la société ou tout fournisseur a été informé de la possibilité de tels dommages et même si le remède n'atteint pas son objectif essentiel.
                        Certains États n'autorisent pas l'exclusion des garanties implicites ou la limitation de la responsabilité pour les dommages accessoires ou indirects, ce qui signifie que certaines des limitations ci-dessus peuvent ne pas s'appliquer. Dans ces États, la responsabilité de chaque partie sera limitée dans toute la mesure permise par la loi.
                    </Text>
                    <Spacer height={10} />
                </ScrollView>
            </View>

            <Spacer height={15} />
            <View style={styles.buttonContainer}>
                <FlatButton
                    title={t('authentication.validate')}
                    style={{paddingVertical: 15, backgroundColor: COLORS.primary}}
                    onPress={() => handlePolicy()}
                />
            </View>
            <Spacer height={10} />
        </View>
    )
}

export default ConfidentialPolicy;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.white,
    },
    smallLogoContainer: {
        height:80,
        paddingTop:30,
        alignItems: 'center',
    },
    responsiveLogo: {
        width: '100%',
        height: 39,
        aspectRatio: 86 / 33,
    },
    textContainer:{
        flex:5,
        borderTopWidth:1,
        borderTopColor: COLORS.grayMedium,
        borderBottomWidth:1,
        borderBottomColor: COLORS.grayMedium,
        padding:15
    },
    buttonContainer:{
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 15
    }
});
