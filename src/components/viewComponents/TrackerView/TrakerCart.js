import React, { Component } from "react";
import {View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import * as feedActions from '../../../redux/actions/feedActions';
import * as contentActions from '../../../redux/actions/contentActions';

import { connect } from "react-redux";
import theme from '../../../styles/theme'
import {CustomCachedImage} from 'react-native-img-cache';
import Image from 'react-native-image-progress';
import DraggableFlatList from "react-native-draggable-flatlist";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';




import {HomeFeed} from '../HomeFeed/HomeFeed';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const exampleData = [...Array(20)].map((d, index) => ({
    key: `item-${index}`, // For example only -- don't use index as your key!
    label: index,
    backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));


export class TrackerCart extends React.Component {
    constructor(args) {
        super(args);

        let { width } = Dimensions.get("window");
        this.state = {
            FlatListItems: [
                {name:'Patrick star'},
                {name:'Gallileo'},
                {name:'Einsten'},
                {name:'Peterson'},
                {name:'Schwarzenneger'},
                {name:'Dostoyevsky'},
                {name:'Patrick star'},
                {name:'Gallileo'},
                {name:'Einsten'},
                {name:'Peterson'},
                {name:'Schwarzenneger'},
                {name:'Dostoyevsky'},
            ],
            showSortableView:false,
            showList:true,
            backgroundColor:"red",
            index: 0,
            routes: [
                { key: 'first', title: 'bal' },
                { key: 'second', title: 'banmkl' },
            ],
            data: exampleData,
            eventDetails:null,
        };
        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;

    }

    componentDidMount(){
        this.id = this.props.navigation.getParam("id",null);
        console.log("leh bara = "+this.id);
        this.props.fetchDetails(this.id);
    }


    static getDerivedStateFromProps(nextProp, prevState) {
        console.log("<<<< nextProp = "+JSON.stringify(nextProp));
        return {
            eventDetails: nextProp.eventDetails !== prevState.eventDetails ? nextProp.eventDetails : prevState.eventDetails,
            //viewType: nextProp.viewType !== prevState.viewType ? nextProp.viewType : prevState.viewType
        }

    }


    renderItem = ({ item, index, drag, isActive }) => {
        return (
            <TouchableOpacity
                style={{
                    marginBottom:20,
                    height:this.screenHeight*theme.heights.trackerTileHeightPercentage,
                    width:this.screenWidth,
                    borderRadius:5,
                    elevation:5,
                    backgroundColor: isActive ? "blue" : theme.colors.tileColor,
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onLongPress={drag}
                //onPressOut={moveEnd}
            >
                <View style={{flex:3,
                    backgroundColor:theme.colors.statusBarColor,
                    borderTopRightRadius:5,
                    borderTopLeftRadius:5}}>
                    <Text>hello</Text>
                </View>
                <View style={{flex:2,
                    width:'100%',
                    borderBottomLeftRadius:5,
                    borderBottomRightRadius:5,

                }}>
                    <View style={{padding:10}}>
                        <Text style={{color:'#000068',fontWeight: 'bold'}}>
                            {item.name+item.name}
                        </Text>
                        <Text style={{color:'#323028'}}>
                            {item.name+item.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

        );
    };



    _renderRows = ({item, index, separators})=>{

        if(this.state.showList){
            return(
                <View style={{
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:10,
                    height:this.screenHeight*theme.heights.trackerTileHeightPercentage,
                    width:this.screenWidth*0.95,
                    borderRadius:5,
                    elevation:5,
                    backgroundColor:theme.colors.tileColor}}>
                    <View style={{flex:3,backgroundColor:theme.colors.statusBarColor,borderTopRightRadius:5,borderTopLeftRadius:5}}>
                        <CustomCachedImage
                            component={Image}
                            source={{ uri: 'https://source.unsplash.com/random/600*500' }}
                            // indicator={}
                            imageStyle={{
                                borderRadius:5
                            }}
                            style={
                                {
                                    height:this.screenHeight*theme.heights.trackerTileHeightPercentage*(3/5),width:this.screenWidth*0.95,
                                    borderTopRightRadius:5
                                }
                            }/>
                    </View>
                    <View style={{flex:2,
                        width:'100%',
                        borderBottomLeftRadius:5,
                        borderBottomRightRadius:5,

                    }}>
                        <View style={{padding:10}}>
                            <Text style={{color:'#000068',fontWeight: 'bold'}}>
                                {item.name+item.name}
                            </Text>
                            <Text style={{color:'#323028'}}>
                                {item.name+item.name}
                            </Text>
                        </View>
                    </View>

                </View>
            )
        }
        else{
            return(
                <View style={{justifyContent:'center',marginBottom:10}}>
                    <Text style={{backgroundColor:'green',color:'white',padding:10,width:Dimensions.get('window').width}}>
                        {item.name}
                    </Text>
                </View>
            )
        }
    };
    // this.viewType = this.props.viewType;
    _toggleSortView = () =>{
        this.setState((prevState)=>{
            return {
                showSortableView: !prevState.showSortableView
            }
        },()=>{
            console.log("ho gaya"+this.state.showSortableView);
        })
    };


    render() {
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 50
        };

        //console.log("leh "+JSON.stringify(this.state.eventDetails[0]));
        //console.log("leh "+this.state.eventDetails.length);



        let eventDetails = null;

        if(this.state.eventDetails && this.state.eventDetails.length>0){
            eventDetails = this.state.eventDetails[0];
        }


        //this.state.eventDetails[0];


        return(
            <View style={{alignItems:'center',width:this.screenWidth,flex:1}}>
                {/*<View*/}
                    {/*style={{height:50,*/}
                        {/*width:this.screenWidth,*/}
                        {/*justifyContent:'center'*/}
                        {/*}}*/}
                {/*>*/}
                {/*<TouchableOpacity*/}
                    {/*onPress={()=>{*/}
                        {/*this._toggleSortView();*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*/!*<MaterialCommunityIcons name={'reorder-horizontal'} size={40}/>*!/*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}
                <ScrollView style={{height:this.screenHeight,width:this.screenWidth}}>
                    { eventDetails ?
                        <View style={{alignItems:'center'}}>

                            <CustomCachedImage
                                component={Image}
                                source={{ uri: eventDetails.imageUrl }}
                                // indicator={}
                                imageStyle={{
                                    //borderRadius:5
                                }}
                                style={
                                    {
                                        height:this.screenHeight*0.3,

                                        width:this.screenWidth,
                                        //borderTopRightRadius:5
                                    }
                                }>
                                <TouchableOpacity
                                    style={{position:'absolute',
                                    top:10,
                                    left:10,
                                    width:30,height:30}}
                                    onPress={()=>{
                                        this.props.navigation.goBack();
                                    }
                                    }

                                >
                                    <MaterialCommunityIcons name={'arrow-left'} size={30} color={'#ffffff'}/>
                                </TouchableOpacity>
                            </CustomCachedImage>
                            <View style={{width:"100%",
                                height:60,
                                paddingHorizontal:10,
                                alignItems:"flex-start",
                                justifyContent:'flex-end'}}>
                                <Text style={{fontWeight:'bold',fontSize:30}}>{eventDetails.name}</Text>

                            </View>
                            <View style={{width:"100%",
                                height:30,
                                paddingHorizontal:10,
                                alignItems:"flex-start",
                                justifyContent:'flex-start'}}>
                                <Text style={{fontWeight:'bold',fontSize:10}}>{eventDetails.location}</Text>

                            </View>

                            <View style={{width:"100%",
                                height:this.screenHeight*0.3,
                                marginTop:10,
                                paddingHorizontal:10,
                                alignItems:"flex-start",


                            }}>
                                <Text style={{fontWeight:'bold',fontSize:10}}>{eventDetails.location}</Text>

                            </View>
                            <View style={{width:this.screenWidth,alignItems:'center'}}>
                                <TouchableOpacity style={{height:45,
                                    width:this.screenWidth*0.7,
                                    borderRadius:22.5,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    backgroundColor:theme.colors.statusBarColor}}
                                    onPress={()=>{
                                        this.props.addItemToTracker(eventDetails);
                                        this.props.navigation.navigate("Track");
                                    }
                                    }

                                >
                                    <Text style={{fontSize:25,color:'#ffffff'}}>{eventDetails.isPaid?"Buy Now":"Track"}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{}}>

                            </View>
                        </View>:
                        <View>
                            <Text>meme lelo</Text>
                        </View>

                    }
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // content:state.contentReducer.allContent,
        // viewType : state.contentReducer.viewType,
        eventDetails: state.feedReducer.eventDetails,
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        getDummyData:()=>{
            console.log("DP called");
            //contentActions.getAllContent(1,dispatch);
        },
        fetchDetails:(id)=>{
            feedActions.fetchEventDetails(id,dispatch)
        },
        addItemToTracker:(item)=>{
            contentActions.addItemToTracker(item,dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerCart);




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
