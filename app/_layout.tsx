import {ReduxProvider} from "../redux/provider";
import {Stack, useRouter} from "expo-router";
import i18next from '../i18next/i18next';
import {I18nextProvider, useTranslation} from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import AppNav from "./AppNav";

const RootLayout = () => {
    const userTokenStatus = false;


    return (
        <ReduxProvider>
            <I18nextProvider i18n={i18next}>
                <AppNav />
            </I18nextProvider>
        </ReduxProvider>
    );
};

export default RootLayout;