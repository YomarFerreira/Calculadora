import React from 'react';
import{
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const style = StyleSheet.create({
    display:{
        flex: 1, //cresce com a necessidade
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end',
        width: Dimensions.get('window').width,
    },
    displayValue:{
        fontSize: 60,
        color: '#ffffff',
    }
})

export default props =>
    <View style ={style.display}>
        <Text style={style.displayValue} numberOfLines={1}>
            {props.value}
        </Text>
    </View>
