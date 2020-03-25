import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import * as Font from 'expo-font';

class AddQaModal extends React.Component{
    state = {
        fontLoad : false
    }

    async componentDidMount(){
        await Font.loadAsync({
            'SCDream_M' : require('../assets/fonts/SCDream_M.otf'),
        });
        this.setState({fontLoad : true});
    }

    render(){
        if(this.state.fontLoad){
            return(
                <View style = {styles.container}>
                    <View style = {styles.MainBox}>
                        <TextInput
                            placeholder = "제목을 입력해주세요."
                            style = {styles.TitleTextInput}
                        />
                    </View>
                </View>
            );
        }else{
            return <View style = {styles.container}><View style = {styles.MainBox}><BallIndicator color = "#7B7B7B" /></View></View>
        }
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    MainBox : {
        width : "90%",
        height : "90%",
        backgroundColor : "#FCF9F0",
        alignItems : "center"
    },
    TitleTextInput : {
        width : "90%",
        height : 50,
        borderRadius : 4,
        borderWidth : 2,
        borderColor : "black",
        fontFamily : "SCDream_M",
        paddingLeft : 10
    }
})

export default AddQaModal;