import {ReduxProvider} from "../redux/provider";
import {Stack, useRouter} from "expo-router";
import i18next from '../i18next/i18next';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
    const userToken = false;

    return (
        <ReduxProvider>
            <I18nextProvider i18n={i18next}>
                <GestureHandlerRootView style={{flex: 1}}>
                    <Stack>
                        <Stack.Protected guard={userToken}>
                            <Stack.Screen name="(drawer)" options={{headerShown: false}} />
                        </Stack.Protected>
                        <Stack.Protected guard={!userToken}>
                            <Stack.Screen name="index" options={{ headerShown: false, title: 'OnBoarding' }} />
                            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                        </Stack.Protected>
                    </Stack>
                </GestureHandlerRootView>

            </I18nextProvider>
        </ReduxProvider>
    );
};

export default RootLayout;