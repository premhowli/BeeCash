import React, { Component } from "react";
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
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
                {name:'Patrick star'},
                {name:'Gallileo'},
                {name:'Einsten'},
                {name:'Peterson'},
                {name:'Schwarzenneger'},
                {name:'Dostoyevsky'}
            ],
            showList:true,
            allEvent:null,

            index: 0,
            routes: [
                { key: 'first', title: 'bal' },
                { key: 'second', title: 'banmkl' },
            ],
        };


        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;

    }


    static getDerivedStateFromProps(nextProp, prevState) {
        console.log("<<<< nextProp = "+JSON.stringify(nextProp));
        return {
            allEvent: nextProp.allEvent !== prevState.allEvent ? nextProp.allEvent : prevState.allEvent,
            viewType: nextProp.viewType !== prevState.viewType ? nextProp.viewType : prevState.viewType
        }

    }

    onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
            case SWIPE_UP:
                // this.setState({backgroundColor: 'red'});
                break;
            case SWIPE_DOWN:
                // this.setState({backgroundColor: 'green'});
                break;
            case SWIPE_LEFT:
                // this.setState({backgroundColor: 'blue'});
                break;
            case SWIPE_RIGHT:
                // this.setState({backgroundColor: 'yellow'});
                break;
        }
    }


    _renderRows = ({item, index, separators})=>{

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
                            <View style={{padding:10}}>
                                <Text style={{color:'#000068',fontWeight: 'bold'}}>
                                    {item.name}
                                </Text>
                                <Text style={{color:'#323028'}}>
                                    {item.location}
                                </Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </CellContainer>
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
        // setTimeout(()=>{
        //     //this.props.navigation.navigate('Cart');
        // },5000);
        return(
            <View style={{flex:1}}>

                <View style={{height:50,backgroundColor:theme.colors.statusBarColor, justifyContent:'center',paddingHorizontal:10}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
                        <Text style={{fontWeight:"bold"}}>Hello</Text>
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
                        this.state.showList ?
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
                                            contentContainerStyle={{alignItems:'center'}}
                                            data={this.state.allEvent}
                                            renderItem={this._renderRows}
                                            keyExtractor={(item)=>{
                                                item.id;
                                            }}
                                        />
                                        :
                                        <View>
                                            <Text>
                                                hello
                                            </Text>
                                        </View>
                                }

                            </View>
                            :
                            <View style={{height:this.screenHeight-50,width:this.screenWidth,backgroundColor:"red"}}>
                                <Text>hello</Text>
                            </View>

                    }
                </View>





            </View>
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
            console.log("DP called");
            //contentActions.getAllContent(1,dispatch);
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
