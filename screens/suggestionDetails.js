import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';
import SuggestScreen from './suggestionScreen';

export default class SuggestionDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            clientName: '',
            clientContact: '',
            userId: firebase.auth().currentUser.email,
            date: '',
            topic: '',
            suggestion: ''
        }
    }

    getSuggestionDetails() {
        //console.log("in getRecieverDetails:",this.state)
        db.collection('Suggestions').where('userId', '==', this.state.userId).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        clientName: doc.data().clientName,
                        clientContact: doc.data().clientContact,
                        date: doc.data().date,
                        topic: doc.data().topic,
                        suggestion: doc.data().suggestion
                    })
                })
            });

    }
    componentDidMount() {
        console.log("Suggestion Details line 40")
        this.getSuggestionDetails();
        // this.getUserDetails(this.state.userID)
    }

    render() {
        return (
            <View style={{ flex: 0.3 }}>
                <Card
                    title={"Client Information"}
                    titleStyle={{ fontSize: 20 }}
                >
                    <Card>
                        <Text style={{ fontWeight: 'bold' }}>Name: {this.state.clientName}</Text>
                    </Card>
                    <Card>
                        <Text style={{ fontWeight: 'bold' }}>Contact: {this.state.clientContact}</Text>
                    </Card>
                    <Card>
                        <Text style={{ fontWeight: 'bold' }}>Topic:{this.state.topic}</Text>
                    </Card>
                    <Card>
                        <Text style={{ fontWeight: 'bold' }}>Suggestion:{this.state.suggestion}</Text>
                    </Card>
                </Card>

                {/* <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate('SuggestScreen')
                        }}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                            )
                            : null

                </View> */}
            </View>

        )
    }
}
const styles=StyleSheet.create({
    buttonContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation: 16
    }
})