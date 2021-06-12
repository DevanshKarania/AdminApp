import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AppTabNavigator } from '../components/appTabNavigator';
import firebase from 'firebase';
import db from '../config';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class RequestScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            allMedicines: [],
            medicineName: '',
            numberOfMedicines: '',
            clientName: '',
            clientContact: '',
            clientAddress: '',
            userId: firebase.auth().currentUser.email,
            firstName: '',
            contact: '',
            address: ''
        }
    }

    getAllMedicines = () => {
        this.itemsRef = db.collection("requestMedicines")
            .onSnapshot((snapshot) => {
                var allMedicines = snapshot.docs.map(document => document.data());
                console.log("Line 120 : ", allMedicines);
                this.setState({
                    allMedicines: allMedicines
                });
                console.log("Line 123 : ", this.state.allMedicines);
            })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        console.log(item)
        return (
            <ListItem
                key={i}
                title={"Medicine Name: " + item.medicineName}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this.props.navigation.navigate("RecieverDetails", { "details": item }) }}>
                        <Text>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }

    componentDidMount() {
        this.getAllMedicines()
    }

    render() {
        return (
            <View>
                <MyHeader title="Medicines Requested" navigation={this.props.navigation} />
                <ScrollView>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.allMedicines}
                        renderItem={this.renderItem}
                    />
                </ScrollView>
                <View style={styles.buttonContainer}>
                    {
                        this.state.recieverId !== this.state.userId
                            ? (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        this.updateBookStatus()
                                        this.addNotification()
                                        this.props.navigation.navigate('RequestScreen')
                                    }}>
                                    <Text>I want to Donate</Text>
                                </TouchableOpacity>
                            )
                            : null
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#CE8A8A",
        shadowColor: "#DDDCDC",
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})