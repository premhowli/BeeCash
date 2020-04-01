import React, { Component } from "react";
import {View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, SafeAreaView} from 'react-native';
import * as feedActions from '../../../redux/actions/feedActions';
import * as contentActions from '../../../redux/actions/contentActions';

import { connect } from "react-redux";
import theme from '../../../styles/theme'
import {CustomCachedImage} from 'react-native-img-cache';
import Image from 'react-native-image-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export class TrackerCart extends React.Component {
    constructor(args) {
        super(args);

        let { width } = Dimensions.get("window");
        this.state = {
            showSortableView:false,
            showList:true,
            backgroundColor:"red",
            index: 0,
            eventDetails:null,
        };
        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;

    }

    componentDidMount(){
        this.id = this.props.navigation.getParam("id",null);

        this.props.fetchDetails(this.id);
    }


    static getDerivedStateFromProps(nextProp, prevState) {

        return {
            eventDetails: nextProp.eventDetails !== prevState.eventDetails ? nextProp.eventDetails : prevState.eventDetails,

        }

    }
    render() {

        let eventDetails = null;

        if(this.state.eventDetails && this.state.eventDetails.length>0){
            eventDetails = this.state.eventDetails[0];
        }

        return(
            <SafeAreaView style={{alignItems:'center',width:this.screenWidth,flex:1}}>
                <ScrollView style={{height:this.screenHeight,width:this.screenWidth}}>
                    { eventDetails ?
                        <View style={{alignItems:'center'}}>

                            <CustomCachedImage
                                component={Image}
                                source={{ uri: eventDetails.imageUrl }}
                                imageStyle={{
                                }}
                                style={
                                    {
                                        height:this.screenHeight*0.3,

                                        width:this.screenWidth,
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
                                <View style={{position:'absolute',
                                    right:0,
                                    bottom:0,
                                    height:40,
                                    backgroundColor:'#00000077',
                                    borderTopLeftRadius:10,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    minWidth:100}}>
                                    <Text style={{color:"#ffffff",fontSize:20,fontWeight:'bold'}}>{eventDetails.isPaid?"₹"+eventDetails.price:"Free"}</Text>

                                </View>
                            </CustomCachedImage>
                            <View style={{width:"100%",
                                minHeight:60,
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
                                justifyContent:'center',
                                paddingHorizontal:10,
                                alignItems:"center",


                            }}>
                                <Text style={{fontWeight:'bold',fontSize:10}}>{"Placeholder for a paragraph of details"}</Text>

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
                            <Text>Something went wrong! please try again.</Text>
                        </View>

                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        eventDetails: state.feedReducer.eventDetails,
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        getDummyData:()=>{
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


