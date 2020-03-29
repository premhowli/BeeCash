import React, { Component } from "react";
import {View, Text, Dimensions, TouchableOpacity, FlatList} from 'react-native';
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
        };
        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;

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

    onSwipeUp(gestureState) {
        //this.setState({backgroundColor: 'blue'});
    }

    onSwipeDown(gestureState) {
        this.setState({myText: 'You swiped down!'});
    }

    onSwipeLeft(gestureState) {
        //this.props.navigation.navigate('Cart');
    }

    onSwipeRight() {
        console.log("leh bara swipe");
        this.props.navigation.goBack();
        // this.setState({myText: 'You swiped right!',
        //     backgroundColor: 'black'});
    }

    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        console.log("le bhhhhau");
        //this.props.navigation.goBack();
        return;

        // return (
        //     <View style={styles.leftAction} onPress={console.log('Pressed')}>
        //         <Animated.Text
        //             style={[
        //                 styles.actionText,
        //                 {
        //                     transform: [{ translateX: trans }],
        //                 },
        //             ]}>
        //             Swiped!!
        //         </Animated.Text>
        //     </View>
        // );
    };

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
        return(
            <View style={{alignItems:'center',width:this.screenWidth,flex:1}}>
                <View
                    style={{height:50,
                        width:this.screenWidth,
                        justifyContent:'center',
                        backgroundColor:'#cccccc'}}
                >
                <TouchableOpacity
                    onPress={()=>{
                        this._toggleSortView();
                    }}
                    >
                    <MaterialCommunityIcons name={'reorder-horizontal'} size={40}/>
                </TouchableOpacity>
                </View>
                <View style={{height:this.screenHeight-50}}>
                    { this.state.showSortableView?
                        <DraggableFlatList
                            style={{paddingTop:10,
                                backgroundColor:theme.colors.backgroundColor,
                                width:this.screenWidth}}
                            contentContainerStyle={{}}
                            data={this.state.data}
                            scrollPercent={5}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => `draggable-item-${item.key}`}
                            //onMoveEnd={({ data }) => this.setState({ data })}
                            onDragEnd={({ data }) => this.setState({ data })}
                        />
                        :
                        <View>
                        <FlatList
                            style={{marginTop:10,
                                paddingBottom:200,
                                backgroundColor:theme.colors.backgroundColor,
                                width:this.screenWidth}}
                            contentContainerStyle={{alignItems:'center'}}
                            data={this.state.FlatListItems}
                            renderItem={this.renderItem}
                        />
                        </View>
                    }
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        content:state.contentReducer.allContent,
        viewType : state.contentReducer.viewType,
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        getDummyData:()=>{
            console.log("DP called");
            contentActions.getAllContent(1,dispatch);
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
