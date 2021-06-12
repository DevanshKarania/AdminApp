import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import db from '../config';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class SuggestScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            allSuggestions: [],
            topic: '',
            suggestion: '',
        }
    }

    getAllSuggestions = () => {
        this.itemsRef = db.collection("Suggestions")
            .onSnapshot((snapshot) => {
                var allSuggestions = snapshot.docs.map(document => document.data());
               console.log("Line 120 : ", allSuggestions);
                this.setState({
                    allSuggestions: allSuggestions
                });
                  console.log("Line 123 : ", this.state.allSuggestions);
            })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        console.log(item)
        return (
            <ListItem
                key={i}
                title={"ClientName: " + item.clientName}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitle={"Topic:"+ item.topic}
                rightElement={
                    <TouchableOpacity style={styles.button} 
                    onPress={()=>{this.props.navigation.navigate("SuggestionDetails",{"details": item})}}>
                        <Text>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }

    componentDidMount() {
        this.getAllSuggestions()
    }

    render() {
        return (
            <View>
                <MyHeader title="Suggestions" navigation={this.props.navigation} />
                <ScrollView>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.allSuggestions}
                        renderItem={this.renderItem}
                    />
                </ScrollView>
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
        borderRadius:10,
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})