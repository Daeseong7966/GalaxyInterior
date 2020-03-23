import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import axios from 'axios';
import QAcomponent from '../components/Q&Acomponent';
import MaterialCMIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

class QAScreen extends React.Component{
    state = {
        QAdata : [],
        SearchTitle : true, //true = 제목, false = 작성자
        FilterKeyword : ""
    }

    fetchQA(){
        axios.get('http://192.168.0.55:8000/qa')
        .then((response) => {
            console.log(response.data);
            this.setState({
                QAdata : response.data
            });
        })
        .catch((error) => {
            Alert.alert("알림", "Q&A를 불러오는데 실패했습니다.");
        });
    }

    toggleSearchTitle(){
        this.setState({SearchTitle : !this.state.SearchTitle});
    }

    componentDidMount(){
        this.fetchQA();
    }

    render(){
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
                {
                    this.state.QAdata.map(QAdata => <QAcomponent QAdata = {QAdata} key = {QAdata.id} />)
                }
            </View>
        );
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
        paddingLeft : 10
    }
})

export default QAScreen;