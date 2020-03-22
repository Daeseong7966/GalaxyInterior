import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import * as Font from 'expo-font';

class QAcomponent extends React.Component{
    state = {
        isLock : false,
        fontLoad : false,
    }

    async componentDidMount(){
        await Font.loadAsync({
            'SCDream_M' : require('../assets/fonts/SCDream_M.otf'),
        });
        this.setState({fontLoad : true});
    }

    render(){
        if(this.state.fontLoad){
            if(this.props.data.isLock){
                return(
                    <TouchableOpacity style = {styles.QAcomponent}>
                        <Text>가나다라마바사</Text>
                    </TouchableOpacity>
                );
            }else{
                return(
                    <TouchableOpacity style = {styles.QALockComponent} disabled = {true}>
                        <FontAwesomeIcon name = "lock" size = {25} color = "black" />
                        <Text style = {styles.LockText}>비밀글입니다.</Text>
                    </TouchableOpacity>
                );
            }
        }else{
            return <View style = {{flex : 1,justifyContent : "center", alignItems : "center", backgroundColor : "#FCF9F0"}}><Text style = {{fontSize : 50}}>Loading...</Text></View>
        }
    }
}

const styles = StyleSheet.create({
    QAcomponent : {
        width : "90%",
        height : 60,
        backgroundColor : "white",
        borderRadius : 4,
        borderWidth : 1,
        borderColor : "#FAE6A8",
    },
    QALockComponent : {
        width : "90%",
        height : 60,
        backgroundColor : "white",
        borderRadius : 4,
        borderWidth : 1,
        borderColor : "#FAE6A8",
        alignItems : "center",
        paddingLeft : 20,
        flexDirection : "row"
    },
    LockText : {
        fontSize : 25,
        fontFamily : "SCDream_M",
        marginLeft : 10
    }
})

export default QAcomponent;