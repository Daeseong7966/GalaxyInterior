import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Font from 'expo-font';

class HomeScreen extends React.Component{
    state = {
        fontLoad : false
    }

    async componentDidMount(){
        await Font.loadAsync({
            'BlackHanSans' : require('../assets/fonts/BlackHanSans.ttf'),
            'SCDream_M' : require('../assets/fonts/SCDream_M.otf'),
            'SCDream_B' : require('../assets/fonts/SCDream_B.otf'),
            'SCDream_EB' : require('../assets/fonts/SCDream_EB.otf')
        });
        this.setState({fontLoad : true});
    }

    render(){
        if(this.state.fontLoad){
             return(
                <View style = {styles.container}>
                    <View style = {styles.TextBox}>
                        <Text style = {{fontSize : 25, fontFamily : "BlackHanSans"}}>안녕하세요</Text>
                        <Text style = {{fontFamily : "BlackHanSans"}}>
                            <Text style = {{fontSize : 30}}>은하수인테리어</Text>
                            <Text style = {{fontSize : 25}}>입니다.</Text>
                        </Text>
                    </View>

                    <View style = {styles.TobBox}>
                        <TouchableOpacity style = {styles.B_Btn} onPress = {() => this.props.navigation.navigate("Info")}>
                            <AntIcon name = "home" size = {30} color = "white" />
                            <Text style = {{color : "white", fontSize : 20, fontFamily : "SCDream_EB"}}>매장소개</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles.W_Btn} onPress = {() => this.props.navigation.navigate("Info")}>
                            <MaterialIcon name = "question-answer" size = {30} color = "#B6DAF7" />
                            <Text style = {{color : "#B6DAF7", fontSize : 20, fontFamily : "SCDream_EB"}}>매장소개</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {styles.BottomBox}>
                        <TouchableOpacity style = {styles.W_Btn} onPress = {() => this.props.navigation.navigate("Q&A")}>
                        <MaterialIcon name = "question-answer" size = {30} color = "#B6DAF7" />
                        <Text style = {{color : "#B6DAF7", fontSize : 20, fontFamily : "SCDream_EB"}}>Q&A</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles.B_Btn} onPress = {() => this.props.navigation.navigate("Info")}>
                            <AntIcon name = "home" size = {30} color = "white" />
                            <Text style = {{color : "white", fontSize : 20, fontFamily : "SCDream_EB"}}>매장소개</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }else{
            return <View><Text>Loading...</Text></View>
        }
    }
}

const Left = Dimensions.get('window').width/2-155;
const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
    },
    TextBox : {
        alignSelf : "flex-start",
        marginLeft : Left,
        marginBottom : "5%"
    },
    TobBox : {
        flexDirection : "row",
        marginBottom : 5
    },
    BottomBox : {
        flexDirection : "row"
    },
    B_Btn : {
        width : 150,
        height : 150,
        backgroundColor : "#DBEBF9",
        borderRadius : 4,
        borderWidth : 1,
        borderColor : "#B6DAF7",
        justifyContent : "center",
        alignItems : "center",
        marginRight : 5
    },
    W_Btn : {
        width : 150,
        height : 150,
        backgroundColor : "#FCF9F0",
        borderRadius : 4,
        borderWidth : 1,
        borderColor : "#FAE6A8",
        justifyContent : "center",
        alignItems : "center",
        marginRight : 5
    }
});

export default HomeScreen;