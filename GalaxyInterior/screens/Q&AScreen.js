import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QAcomponent from '../components/Q&Acomponent';

class QAScreen extends React.Component{
    state = {
        data : [
            {isLock : false},
            {isLock : true}
        ]
    }
    render(){
        return(
            <View style = {styles.container}>
                {
                    this.state.data.map(data => <QAcomponent data = {data} />)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#FCF9F0",
        alignItems : "center"
    }
})

export default QAScreen;