import { Stack } from "expo-router";
import {StatusBar} from "expo-status-bar";
import React from "react";

export default function AuthLayout() {
    return (
        <>
            <StatusBar value="auto" translucent backgroundColor="transparent" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "none"
                }}
            >
                {/*<Stack.Screen
                    name="policy"
                    options={{
                        //headerShown: true,
                        title: 'Policy'
                    }}
                />*/}
                <Stack.Screen
                    name="login"
                    options={{
                        title: 'Login'
                    }}
                />
            </Stack>
        </>
    );
}