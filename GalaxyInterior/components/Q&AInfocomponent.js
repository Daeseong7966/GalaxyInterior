import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Font from 'expo-font';

class QAinfocomponent extends React.Component{
    state = {
        fontLoad : false,
        isOpen : true, //비밀번호 해재 여부 확인하는 스테이트
        checkPw : "",
    }

    async componentDidMount(){
        await Font.loadAsync({
            'SCDream_M' : require('../assets/fonts/SCDream_M.otf'),
            'SCDream_EB' : require('../assets/fonts/SCDream_EB.otf')
        });
        this.setState({fontLoad : true});
    }

    checkPw(){
        if(this.state.checkPw === this.props.QAdata.pw){
            this.setState({
                isOpen : true
            })
        }else{
            Alert.alert("안내", "비밀번호가 틀렸습니다.");
        }
    }

    render(){
        if(this.state.fontLoad){
            if(this.state.isOpen){
                return(
                    <View style = {[styles.InfoMainContainer, this.props.QAdata.isAnswer ? {borderColor : "#B6DAF7"} : {borderColor : "#FAB6B6"}]}>
                        
                    </View>
                );
            }else{
                return(
                    <View style = {[styles.PwMainContainer, this.props.QAdata.isAnswer ? {borderColor : "#B6DAF7"} : {borderColor : "#FAB6B6"}]}>
                        <TextInput
                            placeholder = "비밀번호를 입력하세요."
                            style = {styles.PwTextInput}
                            onChangeText = {(Text) => this.setState({checkPw : Text})}
                        />
                        <TouchableOpacity onPress = {() => this.checkPw()} style = {{width : "20%", height : 50, borderRadius : 4, borderWidth : 1, justifyContent : "center", alignItems : "center"}}>
                            <Text style = {{fontFamily : "SCDream_M"}}>확인</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        }else{
            return <View><Text>dd</Text></View>
        }
    }
}

const styles = StyleSheet.create({
    PwMainContainer : {
        flex : 1,
        height : 70,
        backgroundColor : "white",
        marginBottom : 10,
        borderBottomLeftRadius : 4,
        borderBottomRightRadius : 4,
        borderWidth : 1,
        borderTopWidth : 0,
        alignItems : "center",
        flexDirection : "row",
    },
    PwTextInput : {
        width : "50%",
        height : 50,
        borderRadius : 4,
        borderWidth : 1,
        paddingLeft : 10,
        fontFamily : "SCDream_M",
        marginRight : 5,
        marginLeft : 10
    },
    InfoMainContainer : {
        flex : 1,
        height : 200,
        backgroundColor : "white",
        marginBottom : 10,
        borderBottomLeftRadius : 4,
        borderBottomRightRadius : 4,
        borderWidth : 1,
        borderTopWidth : 0,
    }
})

export default QAinfocomponent;