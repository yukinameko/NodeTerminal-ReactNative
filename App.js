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

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      // 入力履歴と出力のリスト
      list: [],
      // 入力履歴のリスト
      historyList: [],
    };
  }

  // テキスト入力の反映
  _onChangeText = inputValue => this.setState({inputValue});
  _onPress = () => {
    const {inputValue, list, historyList} = this.state;

    // 入力文字をエンコードした上で実行し，実行結果を取得
    const result = eval(this._encode(inputValue));
    
    // 実行コードと結果を追加
    const _list = list.concat();
    const _historyList = historyList.concat();
    _list.push(`> ${inputValue}`);
    _list.push(result+'');
    _historyList.push(inputValue+'');

    this.setState({
      inputValue:'',
      list:_list,
      historyList:_historyList
    });
  };

  // '(var|const|let) 'を削除，''や""を使用できるようにする
  _encode = (str) => str.replace(/^ *(var|const|let) /g, '').replace(/(\u2018|\u2019|\u201c|\u201d)/g, "'");//.replace(/\$/g, 'data.');
  // 変数を保持するためのdataオブジェクトを内部に持つ関数
  // eval実行時のスコープは関数内
  // _data = (() => {
  //   const data = {};
  //   const func = str => eval(str);
  //   return func;
  // })();
  
  render() {
    const {
      inputValue,
      list,
      historyList
    } = this.state;
    
    return (
      <View style={styles.container}>
        <FlatList style={styles.list} data={list} renderItem={({item}) => <Text style={[styles.item, styles.color]}>{item}</Text>} />
        
        <View style={styles.separator}/>
        <View style={styles.input}>
          <Text style={styles.color}>{'> '}</Text><TextInput style={[styles.inputArea, styles.color]} value={this.state.inputValue} onChangeText={this._onChangeText}/>
          <TouchableOpacity onPress={this._onPress}>
            <Text style={styles.color}> ENTER </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1D1D1D',
  },
  input: {
    flexDirection:'row',
    height:20,
    margin:10,
  },
  list: {
    flex:1,
    margin:10,
    marginTop: 20,
  },
  item: {
    fontSize: 15,
    textAlign: 'left',
  },
  inputArea: {
    fontSize: 15,
    flex: 1,
  },
  color: {
    color: '#FEFEFE',
  },
  separator: {
    height: 1,
    backgroundColor: '#FEFEFE',
  },
});
