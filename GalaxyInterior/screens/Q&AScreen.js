import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import axios from 'axios';
import QAcomponent from '../components/Q&Acomponent';
import MaterialCMIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { DotIndicator } from 'react-native-indicators';
import * as Font from 'expo-font';

class QAScreen extends React.Component{
    state = {
        QAdata : [],
        SearchTitle : true, //true = 제목, false = 작성자
        FilterKeyword : "",
        isLockFilter : false, //잠금이 되어있는지 안되어있는지 체크하는 필터
        fontLoad : false,
    }

    async componentDidMount(){
        await Font.loadAsync({
            'SCDream_M' : require('../assets/fonts/SCDream_M.otf'),
        });
        this.setState({fontLoad : true});
        this.fetchQA();
    }

    fetchQA(){
        axios.get('http://192.168.0.55:8000/qa')
        .then((response) => {
            console.log(response.data);
            this.setState({
                QAdata : response.data,
                FilterKeyword : ""
            });
        })
        .catch((error) => {
            Alert.alert("알림", "Q&A를 불러오는데 실패했습니다.");
        });
    }

    toggleSearchTitle(){
        this.setState({SearchTitle : !this.state.SearchTitle});
    }

    toggleisLockFilter(){
        this.setState({isLockFilter : !this.state.isLockFilter});
    }

    render(){
        const filteredComponents = (data) => {
            if(!this.state.isLockFilter){
                data = data.filter((qadata) => {
                    if(this.state.SearchTitle){
                        return qadata.title.indexOf(this.state.FilterKeyword) > -1; //비밀글이 아닐 때 제목으로 검색하면 결과값 전달
                    }else{
                        return qadata.author.indexOf(this.state.FilterKeyword) > -1; //비밀글이 아닐 때 작성자로 검색하면 결과값 전달
                    }
                });
                return data.map((qadata) => {
                    return <QAcomponent QAdata = {qadata} key = {qadata.id} />
                })
            }else{
                data = data.filter((qadata) => {
                    if(this.state.SearchTitle){
                        return !qadata.isLock && qadata.title.indexOf(this.state.FilterKeyword) > -1; //비밀글이 아닌고, 제목 검색
                    }else{
                        return !qadata.isLock && qadata.author.indexOf(this.state.FilterKeyword) > -1; //비밀글이 아니고, 작성자 검색
                    }
                });
                return data.map((qadata) => {
                    return <QAcomponent QAdata = {qadata} key = {qadata.id} />
                })
            }
        }
        if(this.state.fontLoad){
            return(
                <View style = {styles.container}>
                    <View style = {styles.TopContainer}>
                        <View style = {styles.SerchBox}>
                            <TextInput 
                                style = {styles.SerchTextInput}
                                placeholder = "검색어를 입력해주세요."
                                onChangeText = {(Text) => this.setState({FilterKeyword : Text})}
                            />
                            <TouchableOpacity onPress = {() => this.toggleSearchTitle()}>
                                {
                                    this.state.SearchTitle ? <MaterialCMIcon name = "subtitles-outline" size = {30} color = "black" /> : <FontAwesome5Icon name = "user-alt" size = {25} color = "black" />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity onPress = {() => this.toggleisLockFilter()} style = {{flexDirection : "row", alignItems : "center", alignSelf : "flex-start", marginLeft : "5%"}}>
                        <FontAwesome5Icon name = "check" size = {15} color = {this.state.isLockFilter ? "#1C5AF5" : "#7B7B7B"} />
                        <Text style = {[styles.FilterFont, this.state.isLockFilter ? styles.TrueFilterFont : styles.FalseFilterFont]}>비밀글 제외</Text>
                    </TouchableOpacity>
                    {
                        this.state.QAdata ? filteredComponents(this.state.QAdata) : null
                    }
                </View>
            );
        }else{
            return <View style = {{flex : 1,justifyContent : "center", alignItems : "center", backgroundColor : "#FCF9F0"}}><DotIndicator color = "#7B7B7B"/></View>
        }
    }
}

const statusSize = StatusBar.currentHeight;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#FCF9F0",
        alignItems : "center"
    },
    TopContainer : {
        width : "100%",
        height : "10%",
        marginTop : statusSize,
        alignItems : "center",
        justifyContent : "center"
    },
    AddBtn : {
        position : "absolute",
        right : 0,
        top : 0
    },
    SerchBox : {
        width : "90%",
        height : 50,
        borderRadius : 4,
        flexDirection : "row",
        borderColor : "black",
        borderWidth : 3,
        alignItems : "center",
    },
    SerchTextInput : {
        width : "90%",
        height : "100%",
        paddingLeft : 10,
        fontFamily : "SCDream_M"
    },
    FilterFont : {
        fontFamily : "SCDream_M",
        marginLeft : 5
    },
    TrueFilterFont : {
        color : "black"
    },
    FalseFilterFont : {
        color : "#7B7B7B"
    }
})

export default QAScreen;