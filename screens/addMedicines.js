import React from 'react';
import { TouchableOpacity, Text, View, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class AddMedicines extends React.Component {

    constructor() {
        super();
        this.state = {
            medicineName: '',
            userId: firebase.auth().currentUser.email,
            numberOfMedicines: '',
            allMedicines: []
        }
    }

    addRequest = async (medicineName) => {
        db.collection('medicines').add({
            "medicineName": medicineName,
        })
        this.setState({
            medicineName: '',
        })
        return alert("Medicine Requested Successfully")
    }

    render() {
        return (
            <View>
                <MyHeader title="Add Medicines" navigation={this.props.navigation} />
                <View>
                    <TextInput
                        style={styles.textInputBox}
                        label={"Request Medicines"}
                        placeholder={"Enter the medicine name"}
                        containerStyle={{ marginTop: 60 }}
                        onChangeText={(text) => {
                            this.setState({
                                medicineName: text
                            })
                            console.log("Name : ", this.state.medicineName)
                        }}
                        value={this.state.medicineName}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.addRequest(this.state.medicineName);
                        }}
                    >
                        <Text>Add</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    textInputBox: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    button: {
        width: "25%",
        height: 50,
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#CE8A8A",
        shadowColor: "#DDDCDC",
        shadowOffset: {
            width: 0,
            height: 8
        }
    },
})