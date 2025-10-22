import React, {useRef, useState} from 'react';
import {View, StyleSheet, Dimensions, FlatList, Text, Image, TouchableOpacity} from "react-native";
import {COLORS, IMAGES} from "../constants";
import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import Spacer from "../components/ui/Spacer";
import {useRouter} from "expo-router";
import ViewThemed from "../components/ui/ViewThemed";

const {width, height} = Dimensions.get('window');
const slides = [
    {
        id: '1',
        image: IMAGES.onBoardingLogo,
        title: 'Vivez l’expérience Parent',
        subTitle: 'Enet Life vous embarque dans un nouveau paradigme du suivi scolaire de l’élève. Tranquilité d’esprit assurée!',
    },
    {
        id: '2',
        image: IMAGES.onBoardingLogo,
        title: 'Analysez la performance',
        subTitle: 'Anticipez de mauvaises performances de l’élève grâce à nos outils d’analyse.',
    },
    {
        id: '3',
        image: IMAGES.onBoardingLogo,
        title: 'Paiements mobiles',
        subTitle: 'Evitez la queue à la banque. Gagnez du temps. Payez par Mobile Money ou par carte bleue!',
    }
];

const Slide = ({item}) => {
    return (
        <View style={{flex: 1} as StyleSheet}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'} as StyleSheet}>
                <Image
                    source={item.image}
                    style={{height: '30%', width: (width-170), resizeMode: 'contain'} as StyleSheet}
                />
                <View style={{flex: 1, width, padding:15}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Spacer height={10} />
                    <Text style={styles.subTitle}>{item.subTitle}</Text>
                </View>

            </View>
        </View>
    )
}

const OnBoardingScreen = ({navigation}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const flatListRef = useRef(null);
    const router =  useRouter();

    const Footer = () => {
        return (
            <ViewThemed style={{
                height: height * 0.25,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                //backgroundColor: 'yellow',
            } as StyleSheet}>
                <ViewThemed style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                } as StyleSheet}>
                    {slides.map((_, index) => (
                        <View key={index} style={[styles.indicator, currentSlideIndex === index && {
                            backgroundColor: COLORS.primary,
                            width: 25,
                        }]} />
                    ))}
                </ViewThemed>
                <Spacer height={25} />
                <ViewThemed style={{ flex: 1, marginBottom: 20}}>
                    {currentSlideIndex === slides.length - 1 ? (
                        <View style={{height: 55}}>
                            <TouchableOpacity style={[styles.btn]} onPress={() => router.push('/policy')}>
                                <Text style={styles.btnText}>Commencer</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <ViewThemed style={{flexDirection: 'row', alignItems: 'flex-end'} as StyleSheet}>
                            {/*<TouchableOpacity
                                style={[
                                    styles.btn,
                                    {
                                        backgroundColor: 'transparent',
                                        borderWidth: 1,
                                        borderColor: COLORS.primary,
                                    }
                                ]}
                                onPress={skip}
                            >
                                <Text style={{
                                    color: COLORS.primary,
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                } as StyleSheet}>SKIP</Text>
                            </TouchableOpacity>
                            <View style={{width: 20}} />*/}
                            <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                                <Text style={styles.btnText}>Suivant</Text>
                            </TouchableOpacity>
                        </ViewThemed>
                    )}
                </ViewThemed>
            </ViewThemed>
        )
    }

    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * width;
            flatListRef?.current?.scrollToOffset({offset});
            setCurrentSlideIndex(nextSlideIndex);
        }
    }

    /*const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        flatListRef?.current?.scrollToOffset({offset});
        setCurrentSlideIndex(lastSlideIndex);
    }*/
    return (
        <>
            <StatusBar value="auto" translucent backgroundColor="transparent" />
            <ViewThemed>
                <FlatList
                    ref={flatListRef}
                    onMomentumScrollEnd={updateCurrentSlideIndex}
                    data={slides}
                    contentContainerStyle={{height: height * 0.75}}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <Slide item={item} />}
                />
                <Footer />
            </ViewThemed>
        </>
    );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: COLORS.primary,
        fontWeight: '600',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 26,
        letterSpacing: 0.1,
    },
    subTitle: {
        color: COLORS.gray,
        fontWeight: 'normal',
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 0.1,
    },
    indicator: {
        height: 3,
        width: 10,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    btn: {
        flex: 1,
        height: 55,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    }
});