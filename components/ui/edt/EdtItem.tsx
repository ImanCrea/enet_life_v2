import {StyleSheet, View} from 'react-native';
import EdtItemInvalid from './EdtItemInvalid';
import EdtItemValid from './EdtItemValid';
import {TEdtProps} from "../../../lib/type/TEdt";
import {JSX} from "react";

function EdtItem({data}: TEdtProps) {
  return (
    <View style={styles.detailsItem}>
      {data?.schedules.valid ? (
        <EdtItemValid data={data} /> as JSX.Element
      ) : (
        <EdtItemInvalid data={data} />
      )}
    </View>
  );
}

export default EdtItem;

const styles = StyleSheet.create({
  detailsItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
});
