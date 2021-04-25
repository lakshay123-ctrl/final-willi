import React from 'react'
import {Text,View,TextInput,StyleSheet,FlatList, KeyboardAvoidingView,Image,TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId:'',
            password:''
        }
    }

   login = async(email,password) => {
       if (email&&password){
           try{const response = await firebase.auth().signInWithEmailAndPassword(email,password)
               if(response){
                   this.props.navigation.navigate('Transcaction')
               }}

               catch(error){
                   switch(error.code){
                   case 'auth/user-not-found':alert("user doesnt exists")
                   break
                   case 'auth/invalid-email':alert("incorrect email or password")
                   break

                   }
               }

       }
       else{
           alert("enter email and password")
       }
   }

    render(){
        return(
            <KeyboardAvoidingView style = {{alignItems:'center',marginTop:10}}>

             <View>
             <Image
                    style = {{width:200,height:200}}
                    source = {require("./assets/booklogo.jpg")}
                    />
                 <Text style = {{textAlign:'center',fontSize:30}}>Wili</Text>
                 </View>

<View>
                    <TextInput
                    style = {styles.loginBox}
                    placeholder = "abc@example.com"
                    keyboardType = 'email-address'
                    onChangeText = {(text)=>{this.setState({emailId:text})}}
                    />
                    
                   <TextInput
                    style = {styles.loginBox}
                    placeholder = "enter password"
                    secureTextEntry = {true}
                    onChangeText = {(text)=>{this.setState({password:text})}}
                    />
 
                    
             </View>

            <View>
                <TouchableOpacity style = {styles.scanButton}
                onPress = {()=>{this.login(this.state.emailId,this.state.password)}}>
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({

    container:
    {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
    },
    
    scanButton:
    {
        backgroundColor:'yellow',
        padding:5,
        margin:5
    },
    
    displayText:
    {
    fontSize:20
    },
    
    buttonText:
    {
    fontSize:15,
    textAlign:'center',
    marginTop:10
    },
    
    loginBox:
    {
    width:200,
    height:10,
    borderWidth:1.5,
    borderRightWidth:0,
    fontSize:20
    },
    
    inputView:
    {
    flexDirection:'row',
    margin:10
    },
    
    submitButtonText:
    {
        fontSize:20,
        padding:10,
        textAlign:'center',
        fontWeight:'bold',
        color:'white'
    },
    
    submitButton:
    {
        backgroundColor:'red',
        width:100,
        height:50
    }
    
    })