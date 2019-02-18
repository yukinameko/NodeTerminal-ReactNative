/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Alert,
  Text, 
  TextInput, 
  Button, 
  ImagePicker,
  Permissions,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      historyList: []
    };
  }

  _onChangeText = inputValue => this.setState({inputValue});
  _onPress = () => {
    const {inputValue, historyList} = this.state;

    var result = this._data(this._encode(inputValue));
    
    const _historyList = historyList.concat();
    _historyList.push(inputValue+"");
    _historyList.push(result+"");

    this.setState({
      inputValue:'',
      historyList:_historyList
    });
  };
  _encode = (str) => str.replace(/'/g, "\\'").replace(/var /g, 'data.').replace(/\$/g, 'data.');
  _onKeyDown = (e) => Alert.alert(e);
  _data = (() => {
    var data = {};
    var func = str => eval(str);
    return func;
  })();
  
  render() {
    const {
      inputValue,
      historyList
    } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to node in iOS!</Text>
        
        <FlatList data={historyList} renderItem={({item}) => <Text>{item}</Text>} />
        
        <Text style={styles.instructions}>{instructions}</Text>
        
        <TextInput value={this.state.inputValue} onChangeText={this._onChangeText}/>
        <TouchableOpacity onPress={this._onPress} onKeyDown={this._onKeyDown}>
          <Text> enter </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
