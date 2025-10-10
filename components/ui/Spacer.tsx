import {View} from "react-native";

const Spacer = ({ width = "100%", height = 40 }: {width?: string, height?: number}) => {
    return (
        <View style={{ width, height }} />
    );
}

export default Spacer;