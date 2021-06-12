import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailID: '',
            password: ''
        }
    }

    userLogin = (emailID, password) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(emailID, password)
                    .then(() => {
                        this.props.navigation.navigate('RequestMedicines');
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        return alert(errorMessage);
                    });
            });
    };
    

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('RequestMedicines')
            } else {
                this.props.navigation.navigate('LoginScreen');
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Text style={styles.title}>My App</Text>
                    <Image
                        source={require('../assets/amway.png')}
                        style={{ width: 300, height: 200, marginTop: 50 }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={styles.loginBox}
                        placeholder="enter email-id"
                        keyboardType='email-address'
                        onChangeText={(text) => {
                            this.setState({
                                emailID: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.loginBox}
                        placeholder="enter password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />
                    <TouchableOpacity style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
                        onPress={() => {
                            this.userLogin(this.state.emailID, this.state.password)
                        }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1B6AB',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:250
    },
    title: {
        fontSize: 65,
        fontWeight: '300',
        paddingBottom: 30,
        color: 'red',
        marginTop: -20,
        alignSelf:'center'
    },
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: 'red',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    KeyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 25,
        backgroundColor: "red",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10,
        marginBottom: 50
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20,
        textAlign: 'center'
    },
    buttonContainer:{
        marginTop:150
    }
})