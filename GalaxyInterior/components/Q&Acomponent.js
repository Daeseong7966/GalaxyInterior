import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import * as Font from 'expo-font';
import QAinfocomponent from './Q&AInfocomponent';
import TimeAgo from 'react-native-timeago';
import ("moment/locale/ko");
import moment from 'moment';

class QAcomponent extends React.Component{
    state = {
        isLock : false,
        fontLoad : false,
        InfoOpen : false,
    }

    async componentDidMount(){
        await Font.loadAsync({
            'SCDream_M' : require('../assets/fonts/SCDream_M.otf'),
            'SCDream_EB' : require('../assets/fonts/SCDream_EB.otf')
        });
        this.setState({fontLoad : true});
    }

    toggleInfoOpen = () => {
        this.setState({InfoOpen : !this.state.InfoOpen});
    }

    render(){
        moment.locale('ko');
        if(this.state.fontLoad){
            if(this.props.QAdata.isLock){
                return(
                    <View style = {{flexDirection : "column", width : "100%"}}>
                        <TouchableOpacity onPress = {() => this.toggleInfoOpen()} style = {[styles.BasicQAcomponent, this.props.QAdata.isAnswer ? styles.isAnswerTrue : styles.isAnswerFalse, this.state.InfoOpen ? {marginBottom : 0} : {marginBottom : 10, borderBottomRightRadius : 4, borderBottomLeftRadius : 4}]}>
                            <View style = {styles.IconBox}>
                                <FontAwesomeIcon name = "lock" size = {25} color = "black" />
                            </View>
                            <Text style = {styles.Text1}>비밀글입니다.</Text>

                            <View style = {{flex : 1, flexDirection : "column", alignItems : "flex-end"}}>
                                <Text style = {styles.Text2}>{this.props.QAdata.author}</Text>
                                <TimeAgo time = {this.props.QAdata.date_timestamp} style = {{fontFamily : "SCDream_M", marginRight : 10}} />
                            </View>
                        </TouchableOpacity>
                        {
                            this.state.InfoOpen ? <QAinfocomponent QAdata = {this.props.QAdata} /> : null
                        }
                    </View>
                );
            }else{
                return(
                    <View style = {{flexDirection : "column", width : "100%"}}>
                        <TouchableOpacity onPress = {() => this.toggleInfoOpen()} style = {[styles.BasicQAcomponent, this.props.QAdata.isAnswer ? styles.isAnswerTrue : styles.isAnswerFalse, this.state.InfoOpen ? {marginBottom : 0} : {marginBottom : 10, borderBottomRightRadius : 4, borderBottomLeftRadius : 4}]}>
                            <View style = {styles.IconBox}>
                                <Text style = {styles.QText}>Q</Text>
                            </View>

                            <Text style = {styles.Text1}>{this.props.QAdata.title.substring(0,10)}</Text>

                            <View style = {{flex : 1, flexDirection : "column", alignItems : "flex-end"}}>
                                <Text style = {styles.Text2}>{this.props.QAdata.author}</Text>
                                <TimeAgo time = {this.props.QAdata.date_timestamp} style = {{fontFamily : "SCDream_M", marginRight : 10}} />
                            </View>
                        </TouchableOpacity>
                        {
                            this.state.InfoOpen ? <QAinfocomponent QAdata = {this.props.QAdata} /> : null
                        }
                    </View>
                );
            }
        }else{
            return <View style = {{flex : 1,justifyContent : "center", alignItems : "center", backgroundColor : "#FCF9F0"}}><Text style = {{fontSize : 50}}>Loading...</Text></View>
        }
    }
}

const styles = StyleSheet.create({
    BasicQAcomponent : {
        width : "90%",
        height : 60,
        borderTopLeftRadius : 4,
        borderTopRightRadius : 4,
        borderWidth : 1,
        flexDirection : "row",
        alignItems : "center",
    },
    isAnswerTrue : {
        borderColor : "#B6DAF7",
        backgroundColor : "#EEF5FB"
    },
    isAnswerFalse : {
        borderColor : "#FAB6B6",
        backgroundColor : "#F9E3DB"
    },
    IconBox : {
        width : "15%",
        height : "100%",
        alignItems : "center",
        justifyContent : "center"
    },
    Text1 : {
        fontSize : 25,
        fontFamily : "SCDream_M",
    },
    Text2 : {
        fontSize : 15,
        fontFamily : "SCDream_M",
        marginRight : 10
    },
    QText : {
        fontFamily : "SCDream_EB", 
        fontSize : 45,
    }
})

export default QAcomponent;