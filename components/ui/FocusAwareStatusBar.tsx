import * as React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export default function FocusAwareStatusBar() {
    const isFocused = useIsFocused();

    return isFocused ? (
        <StatusBar
            barStyle="default" //light-content
            translucent={true}
            showHideTransition="none"
        />
    ) : null;
}
