import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Font from 'expo-font';
import moment from 'moment';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

class QAinfocomponent extends React.Component{
    state = {
        fontLoad : false,
        isOpen : false, //비밀번호 해재 여부 확인하는 스테이트
        checkPw : "",
        isModify : false,
        title : this.props.QAdata.title,
        content : this.props.QAdata.content,
        isModifyText : ""
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

    DeleteQA(){
        axios.delete(`http://192.168.0.55:8000/qa/${this.props.QAdata.id}`)
        .then((response) => {
            console.log(response);
            if(response.status === 200){
                Alert.alert("안내", "게시물 삭제 성공!");
                this.props.fetchQA();
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    ModifyQA(){
        axios.put(`http://192.168.0.55:8000/qa/${this.props.QAdata.id}`, {
            title : this.state.title,
            content : this.state.content
        })
        .then((response) => {
            console.log(response);
            if(response.status === 200){
                Alert.alert("안내", "게시물이 수정되었습니다!");
                this.setState({
                    isModify : false,
                    isModifyText : "(수정됨)"
                });
                this.props.fetchQA();
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    toggleisModify(){
        this.setState({isModify : !this.state.isModify});
    }

    onClickModifyQA(){
        Alert.alert(
            "안내",
            "게시물을 수정하시겠습니까?",
            [
                {text : "확인", onPress : () => this.ModifyQA()},
                {text : "취소"}
            ]
        )
    }

    onClickDeleteQA(){
        Alert.alert(
            "안내",
            "게시물을 삭제하시겠습니까?",
            [
                {text : "확인", onPress : () => this.DeleteQA()},
                {text : "취소"}
            ]
        )
    }

    render(){
        const date = this.props.QAdata.date_timestamp;
        const Fixdate = moment(date).format("YYYY-MM-DD") + this.state.isModifyText;
        if(this.state.fontLoad){
            if(this.state.isOpen){
                if(this.state.isModify){
                    return(
                        <View style = {[styles.InfoMainContainer, this.props.QAdata.isAnswer ? {borderColor : "#B6DAF7"} : {borderColor : "#FAB6B6"}]}>
                            <TextInput 
                                style = {styles.ModifyTitle}
                                placeholder = {this.props.QAdata.title}
                                value = {this.state.title}
                                onChangeText = {(Text) => this.setState({title : Text})}
                                autoCapitalize = "none"
                            />

                            <TextInput 
                                style = {styles.ModifyContent}
                                placeholder = {this.props.QAdata.content}
                                value = {this.state.content}
                                onChangeText = {(Text) => this.setState({content : Text})}
                                autoCapitalize = "none"
                                multiline = {true}
                            />
                            <View style = {{flexDirection : "row", marginTop : 10}}>
                                <TouchableOpacity style = {styles.ModifyBtn} onPress = {() => this.onClickModifyQA()}>
                                    <Text>수정하기</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style = {styles.CancleBtn} onPress = {() => this.toggleisModify()}>
                                    <Text>취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                    
                }else{
                    return(
                        <View style = {[styles.InfoMainContainer, this.props.QAdata.isAnswer ? {borderColor : "#B6DAF7"} : {borderColor : "#FAB6B6"}]}>
                            <View style = {styles.TopContainer}>
                                <View style = {styles.TopTitleBox}>
                                    <Text style = {styles.TitleText}>{this.props.QAdata.title}</Text>
                                    <Text style = {styles.TimeText}>{Fixdate}</Text>
                                </View>
                                <Text style = {styles.ContentText}>{this.props.QAdata.content}</Text>
                                
                                <TouchableOpacity style = {styles.CircleBtn} onPress = {() => this.onClickDeleteQA()}>
                                    <FontAwesomeIcon name = "trash-o" size = {20} />
                                </TouchableOpacity>

                                <TouchableOpacity style = {[styles.CircleBtn, {marginRight : 35}]} onPress = {() => this.toggleisModify()}>
                                    <FontAwesome5Icon name = "pencil-alt" size = {15} color = "black" />
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.BottomConatiner}>
                                {
                                    this.props.QAdata.isAnswer ? 
                                    <View style = {{flexDirection : "row", alignItems : "center"}}>
                                        <Text style = {{fontFamily : "SCDream_B", fontSize : 20, marginTop : 5}}>답변 : </Text>
                                        <Text style = {{fontFamily : "SCDream_M", fontSize : 17, marginTop : 5}}>{this.props.QAdata.answer}</Text>
                                    </View> : <Text style = {{fontFamily : "SCDream_B", fontSize : 20, marginTop : 5}}>답변예정입니다.</Text>
                                }
                            </View>
                        </View>
                    );
                }   
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
        height : 250,
        backgroundColor : "white",
        marginBottom : 10,
        borderBottomLeftRadius : 4,
        borderBottomRightRadius : 4,
        borderWidth : 1,
        borderTopWidth : 0,
        alignItems : "center"
    },
    TopContainer : {
        //위에있는 박스 전체
        flex : 3,
        width : "90%",
        alignItems : "center",
    },
    BottomConatiner : {
        flex : 1,
        width : "90%",
        borderTopWidth : 2,
    },
    TitleText : {
        fontFamily : "SCDream_B",
        fontSize : 25,
        marginBottom : 5
    },
    ContentText : {
        fontFamily : "SCDream_M",
        fontSize : 17,
        alignSelf : "flex-start",
        marginTop : 10
    },
    TopTitleBox : {
        //제목 + 시간 표시해주는 View
        flexDirection : "row",
        borderBottomWidth : 2,
        width : "100%",
        marginTop : "10%"
    },
    TimeText : {
        fontFamily : "SCDream_B",
        position : "absolute",
        right : 0,
        bottom : 0,
        marginBottom : 5,
        marginRight : 5
    },
    CircleBtn : {
        width : 30, 
        height : 30,
        justifyContent : "center", 
        alignItems : "center", 
        borderRadius : 100/2,
        borderWidth : 2,
        position : "absolute",
        right : 0,
        marginTop : 5
    },
    ModifyTitle : {
        width : "90%",
        height : 50,
        borderRadius : 4,
        borderWidth : 3,
        paddingLeft : 10,
        fontFamily : "SCDream_M",
        marginTop : "5%"
    },
    ModifyContent : {
        width : "90%",
        height : 90,
        borderRadius : 4,
        borderWidth : 3,
        paddingLeft : 10,
        fontFamily : "SCDream_M",
        marginTop : 10
    },
    ModifyBtn : {
        width : "44%",
        height : 50,
        borderRadius : 4,
        borderWidth : 1,
        fontFamily : "SCDream_M",
        justifyContent : "center",
        alignItems : "center",
        marginRight : 5
    },
    CancleBtn : {
        width : "44%",
        height : 50,
        borderRadius : 4,
        borderWidth : 1,
        justifyContent : "center",
        alignItems : "center"
    }
})

export default QAinfocomponent;