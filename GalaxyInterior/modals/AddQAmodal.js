import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import * as Font from 'expo-font';
import CheckBox from 'react-native-check-box';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

class AddQaModal extends React.Component{
    state = {
        fontLoad : false,
        isLock : false, //비밀글 체크 여부
        title : "",
        content : "",
        pw : "",
        author : ""
    }

    async componentDidMount(){
        await Font.loadAsync({
            'SCDream_M' : require('../assets/fonts/SCDream_M.otf'),
        });
        this.setState({fontLoad : true});
    }

    toggleisAddQaVisible = () => {
        this.props.toggleisAddQaVisible();
    }

    AddQatoServer = () => {
        axios.post('http://192.168.0.55:8000/qa', {
            title : this.state.title,
            content : this.state.content,
            isLock : this.state.isLock,
            pw : this.state.pw,
            author : this.state.author
        })
        .then((response) => {
            console.log(response);
            if(response.status === 200){
                this.toggleisAddQaVisible();
                this.props.fetchQA();
            }
        })
    }

    render(){
        const CheckSpace = this.state.title === "" || this.state.content === "" || this.state.pw === "" || this.state.author === "";
        if(this.state.fontLoad){
            return(
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                    <View style = {styles.container}>
                        <View style = {styles.MainBox}>
                            <TextInput
                                placeholder = "제목을 입력해주세요."
                                style = {styles.TitleTextInput}
                                autoCapitalize = "none"
                                onChangeText = {(Text) => this.setState({title : Text})}
                            />

                            <TextInput
                                placeholder = "내용을 입력해주세요."
                                style = {styles.ContentTextInput}
                                multiline = {true}
                                autoCapitalize = "none"
                                onChangeText = {(Text) => this.setState({content : Text})}
                            />

                            <View style = {{flexDirection : "row", marginTop : 5}}>
                                <TextInput 
                                    placeholder = "비밀번호"
                                    style = {styles.PwTextInput}
                                    autoCapitalize = "none"
                                    onChangeText = {(Text) => this.setState({pw : Text})}
                                />
                                <TextInput 
                                    placeholder = "작성자"
                                    style = {styles.AuthorTextInput}
                                    autoCapitalize = "none"
                                    onChangeText = {(Text) => this.setState({author : Text})}
                                />
                            </View>

                            <View style = {{flexDirection : "row", alignItems : "center", alignSelf : "flex-start", marginLeft : "5%", marginTop : 5, marginBottom : 5}}>
                                <CheckBox 
                                isChecked = {this.state.isLock}
                                onClick = {() => this.setState({isLock : !this.state.isLock})}
                                />
                                <TouchableOpacity onPress = {() => this.setState({isLock : !this.state.isLock})}>
                                    <Text style = {{fontFamily : "SCDream_M"}}>비밀글</Text>
                                </TouchableOpacity>
                            </View>

                            <View style = {{alignItems : "center", flexDirection : "row", position : "absolute", bottom : 0, marginBottom : "3%"}}>
                                <MaterialIcon name = "announcement" size = {20} color = "#7B7B7B" />
                                <Text style = {{color : "#7B7B7B"}}>빈칸없이 모두 작성해주세요.</Text>
                            </View>
                            
                            <View style = {{flexDirection : "row"}}>
                                <TouchableOpacity style = {styles.AddBtn} disabled = {CheckSpace} onPress = {() => this.AddQatoServer()}>
                                    <Text>작성하기</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style = {styles.CancleBtn} onPress = {() => this.toggleisAddQaVisible()}>
                                    <Text>취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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
        height : 340,
        backgroundColor : "#FCF9F0",
        alignItems : "center",
        borderRadius : 4
    },
    TitleTextInput : {
        width : "90%",
        height : 50,
        borderRadius : 4,
        borderWidth : 2,
        borderColor : "black",
        fontFamily : "SCDream_M",
        paddingLeft : 10,
        marginTop : 10
    },
    ContentTextInput : {
        width : "90%",
        height : 100,
        borderRadius : 4,
        borderWidth : 2,
        borderColor : "black",
        fontFamily : "SCDream_M",
        paddingLeft : 10,
        marginTop : 5
    },
    PwTextInput : {
        width : "44%",
        height : 50,
        borderRadius : 4,
        borderWidth : 2,
        borderColor : "black",
        fontFamily : "SCDream_M",
        paddingLeft : 10,
        marginRight : 5
    },
    AuthorTextInput : {
        width : "44%",
        height : 50,
        borderRadius : 4,
        borderWidth : 2,
        borderColor : "black",
        fontFamily : "SCDream_M",
        paddingLeft : 10,
    },
    AddBtn : {
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

export default AddQaModal;