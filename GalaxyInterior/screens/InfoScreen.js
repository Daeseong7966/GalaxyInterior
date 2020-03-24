import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Clipboard } from 'react-native';
import MaterialCMIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Font from 'expo-font';
import { DotIndicator } from 'react-native-indicators';

class InfoScreen extends React.Component{
    state = {
        fontLoad : false,
        email : "daesung09854@gmail.com",
        address : "대구광역시 달서구 진천로10길 93(진천동)",
        cellphone : "010-5920-8883",
        phone : "053-634-7966"
    }

    async componentDidMount(){
        await Font.loadAsync({
            'SCDream_M' : require('../assets/fonts/SCDream_M.otf'),
        });
        this.setState({fontLoad : true});
    }

    writeToClipboard = async (Text) => {
        await Clipboard.setString(Text);
        alert("클립보드에 복사되었습니다.");
    }

    render(){
        if(this.state.fontLoad){
            return(
                <View style = {styles.container}>
                    <View style = {styles.imgBox}>
                        <Image style = {{width : "95%", height : "95%"}} source = {require('../assets/imgs/GalaxyInterior.jpg')} resizeMode = "cover" />
                    </View>

                    <TouchableOpacity onPress = {() => this.writeToClipboard(this.state.cellphone)} style = {styles.TextBox}>
                        <MaterialCMIcon name = "cellphone" size = {30} color = "black" />
                        <Text style = {styles.Text}>{this.state.cellphone}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress = {() => this.writeToClipboard(this.state.phone)} style = {styles.TextBox}>
                        <MaterialCMIcon name = "phone-classic" size = {30} color = "black" />
                        <Text style = {styles.Text}>{this.state.phone}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {() => this.writeToClipboard(this.state.email)} style = {styles.TextBox}>
                        <MaterialCMIcon name = "email" size = {30} color = "black" />
                        <Text style = {styles.Text}>{this.state.email}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {() => this.writeToClipboard(this.state.address)} style = {styles.TextBox}>
                        <MaterialCMIcon name = "home-map-marker" size = {30} color = "black" />
                        <Text style = {styles.Text}>{this.state.address}</Text>
                    </TouchableOpacity>
                    
                    <View style = {{alignItems : "center", flexDirection : "row", position : "absolute", bottom : 0, marginBottom : "3%"}}>
                        <MaterialIcon name = "announcement" size = {20} color = "#7B7B7B" />
                        <Text style = {{color : "#7B7B7B"}}>전화번호, 메일, 주소를 클릭하시면 복사가 됩니다.</Text>
                    </View>
                </View>
            );
        }else{
            return <View style = {{flex : 1,justifyContent : "center", alignItems : "center", backgroundColor : "#DBEBF9"}}><DotIndicator color = "#7B7B7B"/></View>
        }
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems :"center",
        justifyContent : "center",
        backgroundColor : "#DBEBF9"
    },
    imgBox : {
        width : "90%",
        height : 250,
        borderRadius : 4,
        backgroundColor : "white",
        justifyContent : "center",
        alignItems : "center",
        borderWidth : 1,
        borderColor : "#B6DAF7",
    },
    TextBox : {
        flexDirection : "row",
        alignItems : "center",
        width : "90%",
        height : 70,
        backgroundColor : "white",
        paddingLeft : 10,
        borderRadius : 4,
        marginTop : 5,
        borderWidth : 1,
        borderColor : "#B6DAF7",
    },
    Text : {
        fontSize : 18,
        fontFamily : "SCDream_M",
        marginLeft : 5
    }
})

export default InfoScreen;