import React from "react";
import {Image, ImageStyle, StyleProp} from "react-native";
import {ImageSourcePropType} from "react-native/Libraries/Image/Image";
type TIconProps = {
    source: ImageSourcePropType,
    style?: any,
}

export default function IconRender({source, style}:TIconProps){
    return (
       <Image source={source} style={style} />
    )
}
