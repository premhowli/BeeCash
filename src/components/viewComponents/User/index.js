/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { Component } from "react";
import {View, Text, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import * as contentActions from '../../../redux/actions/contentActions';

import { connect } from "react-redux";
import theme from '../../../styles/theme';

class Login extends React.Component {
    constructor(args) {
        super(args);
        this.state={
            name:null,
        }
    }

    render() {
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TextInput
                    style={{ height: 40,width:"80%",borderRadius:5, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => {
                        this.setState({
                            name:text
                        })
                    }}
                    placeholder={"Enter your name"}

                    value={this.state.name}
                />
                <TouchableOpacity
                    style={{width:"50%",
                        marginTop:20,
                        height:40,
                        borderRadius:5,
                        justifyContent:'center',
                        backgroundColor:theme.colors.statusBarColor,
                        alignItems:'center'}}
                onPress={()=>{
                    if(this.state.name){
                        this.props.doLogin(this.state.name);
                        this.props.navigation.navigate("Home");
                    }
                    else{
                        alert("Please provide your name");
                    }

                }}
                >
                    <Text style={{color:"#ffffff"}}>Login</Text>
                </TouchableOpacity>
            </View>

        )

    }
}

const mapStateToProps = (state) => {
    return {

    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        doLogin:(name)=>{
            contentActions.doLogin(name,dispatch)
            //.fetchEventDetails(id,dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
const styles = {
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1"
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffbb00"
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00"
    }
};
