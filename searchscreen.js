import React from 'react'
import {Text,View,TextInput,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import db from './config'


export default class SearchScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        allTransactions : [],
        lastVisibleTransaction:null,
        search:''
        }
    }

    fetchMoreTransaction = async() => {
        var text = this.state.search.toUpperCase()
        var enteredText = text.split("")
        if (enteredText[0].toUpperCase()==='B'){
        const query = await db.collection("transaction").where('bookId','==',text)
        .startAfter(this.state.lastVisibleTransaction).limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTranscation,doc.data()],
                lastVisibleTransaction:doc
            })
        })  
        }
      else if (enteredText[0].toUpperCase()==='S'){
        const query = await db.collection("transaction").where('bookId','==',text)
        .startAfter(this.state.lastVisibleTransaction).limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTranscation,doc.data()],
                lastVisibleTransaction:doc
            })
        })  
        }
    }

    searchTransaction = async(text) => {
        var enteredText = text.split("")
        if (enteredText[0].toUpperCase()==='B'){
        const transaction = await db.collection("transaction").where('bookId','==',text)
        .startAfter(this.state.lastVisibleTransaction).get()
        transaction.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTranscation,doc.data()],
                lastVisibleTransaction:doc
            })
        })  
        }
      else if (enteredText[0].toUpperCase()==='S'){
        const transaction = await db.collection("transaction").where('studentId','==',text)
        .startAfter(this.state.lastVisibleTransaction).get()
        transaction.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTranscation,doc.data()],
                lastVisibleTransaction:doc
            })
        })  
        }
    }

    componentDidMount = async() => {
    const query = await db.collection("transaction").limit(10).get()
    query.docs.map((doc)=>{this.setState({allTransactions:[],lastVisibleTransaction:doc})
    })
    }

    render(){
        return(
            <View style = {{justifyContent:'center',alignItems:'center',flex:1}}>
                <View style = {styles.searchBar}>
            <TextInput
            style = {styles.bar}
            placeholder = "enter book ID/student ID"
            onChangeText = { (text) => {this.setState({search:text})}}
            />
            <TouchableOpacity style = {styles.searchbutton}
            onPress = {()=>{this.searchTransaction(this.state.search)}}>
                <Text>Search</Text>
            </TouchableOpacity>
            </View>

            <FlatList
            data = {this.state.allTransactions}
            renderItem = {({item})=>(
                <View style = {{borderBottomWidth:2}}>
                    <Text>{"bookId:  " + item.bookId}</Text>
                    <Text>{"studentId:  " + item.StudentId}</Text>
                    <Text>{"transactionType:  " + item.transactionType}</Text>
                    <Text>{"date:  " + item.date.toDate()}</Text>
                </View>
            )}
            keyExtractor = {(item,index)=>index.toString()}
            onEndReached = {this.fetchMoreTransaction}
            onEndReachedThreshold = {0.7}
            />

            </View>
        )
    }
}

const styles = StyleSheet.create({
   searchBar:{
       flexDirection:'row',
       height:40,
       width:'auto',
       borderWidth:0.5,
       alignItems:'center'
   } ,
   bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10 
   }
})