import React, {useEffect} from 'react';
import {Stack} from "expo-router";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const AppNav = () => {
    const {i18n} = useTranslation();
    const {languageSelected} = useSelector((state: any) => state.language);
    const {userToken, onBoardingStatus} = useSelector((state: any) => state.user);


    useEffect(() => {
        i18n.changeLanguage(languageSelected).catch((error) => console.log(error));
        //console.log(languageSelected);
        console.log(userToken);
        console.log(onBoardingStatus);
    }, [i18n, languageSelected]);

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Stack>
                <Stack.Protected guard={userToken !== null}>
                    <Stack.Screen name="(drawer)" options={{headerShown: false}} />
                </Stack.Protected>
                <Stack.Protected guard={!(userToken !== null)}>
                    <Stack.Protected guard={onBoardingStatus}>
                        <Stack.Screen name="index" options={{ headerShown: false, title: 'OnBoarding' }} />
                        <Stack.Screen
                            name="policy"
                            options={{
                                headerShown: false,
                                title: 'Policy'
                            }}
                        />
                    </Stack.Protected>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                </Stack.Protected>
            </Stack>
        </GestureHandlerRootView>
    );
};

export default AppNav;