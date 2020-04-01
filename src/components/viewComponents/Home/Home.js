import React, { Component } from "react";
import {Dimensions, FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from "react-redux";
import {HomeFeed} from '../HomeFeed/HomeFeed';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as contentActions from '../../../redux/actions/contentActions';
import theme from '../../../styles/theme';
import * as feedActions from '../../../redux/actions/feedActions';
import {CustomCachedImage} from 'react-native-img-cache';
import Image from 'react-native-image-progress';





class CellContainer extends React.Component {
    constructor(args) {
        super(args);
    }
    render() {
        return <View {...this.props}>
            {this.props.children}
        </View>;
    }
}


class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showList:true,
            allEvent:null,
            index: 0,
        };


        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;

    }


    static getDerivedStateFromProps(nextProp, prevState) {
        return {
            allEvent: nextProp.allEvent !== prevState.allEvent ? nextProp.allEvent : prevState.allEvent,
            viewType: nextProp.viewType !== prevState.viewType ? nextProp.viewType : prevState.viewType
        }

    }


    _renderRows = ({item, index, separators})=>{

        const data = this.state.allEvent;

        if(this.state.showList){
            return(
                <CellContainer>
                    <TouchableOpacity style={{
                        justifyContent:'center',
                        alignItems:'center',
                        marginBottom:10,
                        height:this.screenHeight*theme.heights.titleHeightPercentage,
                        width:this.screenWidth*0.95,
                        borderRadius:5,
                        elevation:5,
                        backgroundColor:theme.colors.tileColor}}

                                      onPress={()=>{
                                          this.props.navigation.navigate('Cart',{
                                              id : item.id

                                          })
                                      }}
                    >
                        <View style={{flex:3,backgroundColor:theme.colors.statusBarColor,borderTopRightRadius:5,borderTopLeftRadius:5}}>
                            <CustomCachedImage
                                component={Image}
                                source={{ uri: item.imageUrl }}
                                // indicator={}
                                imageStyle={{
                                    borderRadius:5
                                }}
                                style={
                                    {
                                        height:this.screenHeight*theme.heights.titleHeightPercentage*(3/5),width:this.screenWidth*0.95,
                                        borderTopRightRadius:5
                                    }
                                }/>
                        </View>
                        <View style={{flex:2,
                            width:'100%',
                            borderBottomLeftRadius:5,
                            borderBottomRightRadius:5,

                        }}>
                            <View style={{padding:10,
                                height:"100%",
                                flexDirection:'row',
                                }}>
                                <View style={{flex:3}}>
                                <Text style={{color:'#000068',fontSize:20,fontWeight: 'bold'}}>
                                    {item.name}
                                </Text>
                                <Text style={{color:'#323028'}}>
                                    {item.location}
                                </Text>
                                    <Text style={{marginTop:5,color:'#323028'}}>
                                        {"One Liner description"}
                                    </Text>
                                </View>
                                <View style={{postion:'absotute',right:0,

                                    justifyContent:'center',
                                    alignItems:'flex-end',
                                    }}>
                                    <Text style={{
                                        fontWeight:'bold',
                                        color:'#000068',
                                        fontSize:20}}>{item.isPaid?"₹"+item.price:"Free"}</Text>
                                </View>
                            </View>
                        </View>

                    </TouchableOpacity>
                </CellContainer>
            )
        }
        else{
            if(index%2!=0){
                return;
            }
            else{
            return(
                <CellContainer>
                    <View style={{width:this.screenWidth,flexDirection:'row',justifyContent:(data[index] && data[index+1])?'space-around':'center'}}>
                        {
                            data[index]?
                                <TouchableOpacity style={{
                                    justifyContent:'center',
                                    alignItems:'center',
                                    marginBottom:10,
                                    height:this.screenHeight*0.3,
                                    width:this.screenWidth*0.45,
                                    borderRadius:5,
                                    elevation:5,
                                    backgroundColor:theme.colors.tileColor}}

                                                  onPress={()=>{
                                                      this.props.navigation.navigate('Cart',{
                                                          id : data[index].id

                                                      })
                                                  }}
                                >


                                    <CustomCachedImage
                                        component={Image}
                                        source={{ uri: data[index].imageUrl }}
                                        // indicator={}
                                        imageStyle={{
                                            borderRadius:5
                                        }}
                                        style={
                                            {
                                                height:"100%",width:"100%",
                                                borderTopRightRadius:5
                                            }
                                        }>
                                        <View style={{flex:1,backgroundColor:"#00000077",borderRadius:5,padding:10,justifyContent:'flex-end',
                                        alignItems:'flex-start'}}>
                                        <Text style={{color:'#ffffff',
                                            fontSize:20,
                                            fontWeight:'bold'
                                        }}>
                                            {data[index].name}
                                        </Text>
                                        </View>
                                    </CustomCachedImage>

                                </TouchableOpacity>
                                :
                                <View/>

                        }
                        {
                            data[index+1] ?
                                <TouchableOpacity style={{
                                    justifyContent:'center',
                                    alignItems:'center',
                                    marginBottom:10,
                                    height:this.screenHeight*0.3,
                                    width:this.screenWidth*0.45,
                                    borderRadius:5,
                                    elevation:5,
                                    backgroundColor:theme.colors.tileColor}}

                                                  onPress={()=>{
                                                      this.props.navigation.navigate('Cart',{
                                                          id : data[index+1].id

                                                      })
                                                  }}
                                >


                                    <CustomCachedImage
                                        component={Image}
                                        source={{ uri: data[index+1].imageUrl }}
                                        // indicator={}
                                        imageStyle={{
                                            borderRadius:5
                                        }}
                                        style={
                                            {
                                                height:"100%",width:"100%",
                                                borderTopRightRadius:5
                                            }
                                        }>
                                        <View style={{flex:1,backgroundColor:"#00000077",borderRadius:5,padding:10,justifyContent:'flex-end',
                                            alignItems:'flex-start'}}>
                                            <Text style={{color:'#ffffff',
                                                fontSize:20,
                                                fontWeight:'bold'
                                            }}>
                                                {data[index+1].name}
                                            </Text>
                                        </View>
                                    </CustomCachedImage>

                                </TouchableOpacity>
                                :
                                <View/>

                        }


                    </View>

                </CellContainer>
            )}
        }
    };


    _changeViewState = () => {
        if(this.state.showList){
            this.props.changeViewType("grid");
        }
        else{
            this.props.changeViewType("list");
        }

        this.setState((prevState)=>{
            return {
                showList: !prevState.showList
            }
        },()=>{
            console.log("ho gaya"+this.state.showList);
        })
    }

    render(){
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 50
        };
        return(
            <SafeAreaView style={{flex:1}}>

                <View style={{height:50,backgroundColor:theme.colors.statusBarColor, justifyContent:'center',paddingHorizontal:10}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
                        <Text style={{fontWeight:"bold"}}>BeeCash</Text>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
                            {
                                this.state.showList && this.state.showList ?
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this._changeViewState();
                                            //this.props.navigation.navigate('Cart');
                                        }

                                        }>
                                        <Entypo name="grid" size={30}></Entypo>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={()=>{
                                            //fsgst
                                            this._changeViewState();
                                        }
                                        }
                                    >
                                        <Entypo name="list" size={32}/>
                                    </TouchableOpacity>
                            }


                        </View>

                    </View>

                </View>
                <View style={{height:this.screenHeight-50}}>
                    {

                            <View
                                style={{
                                    height:this.screenHeight-50,
                                    backgroundColor: this.state.backgroundColor
                                }}
                            >
                                {
                                    this.state.allEvent?
                                        <FlatList
                                            style={{marginTop:10,
                                                backgroundColor:theme.colors.backgroundColor,
                                                width:this.screenWidth}}
                                            contentContainerStyle={{alignItems:'center',paddingBottom:80}}
                                            data={this.state.allEvent}
                                            renderItem={this._renderRows}
                                            keyExtractor={(item)=>{
                                                item.id;
                                            }}
                                        />
                                        :
                                        <View>
                                            <Text>
                                                No events available right now!!
                                            </Text>
                                        </View>
                                }

                            </View>


                    }
                </View>
            </SafeAreaView>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        content:state.contentReducer.allContent,
        allEvent:state.feedReducer.allEvent,
        viewType : state.feedReducer.viewType,
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        getDummyData:()=>{

        },
        changeViewType:(type)=>{
            contentActions.changeViewType(type,dispatch);
        },
        getAllEvent:()=>{
            feedActions.getAllEvent(dispatch);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
