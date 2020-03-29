import React, { Component } from "react";
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from "react-redux";
import {HomeFeed} from '../HomeFeed/HomeFeed';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as contentActions from '../../../redux/actions/contentActions';
import theme from '../../../styles/theme';


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

            index: 0,
            routes: [
                { key: 'first', title: 'bal' },
                { key: 'second', title: 'banmkl' },
            ],
        };


        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;

    }

    onSwipeUp(gestureState) {
        //this.setState({backgroundColor: 'blue'});
    }

    onSwipeDown(gestureState) {
        this.setState({myText: 'You swiped down!'});
    }

    onSwipeLeft(gestureState) {
        //this.props.navigation.navigate('Cart');
    }

    onSwipeRight(gestureState) {
        // this.setState({myText: 'You swiped right!',
        //     backgroundColor: 'black'});
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
        setTimeout(()=>{
            //this.props.navigation.navigate('Cart');
        },5000);
        return(
            <View style={{flex:1,backgroundColor:'red'}}>

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
                            <GestureRecognizer
                                // onSwipe={(direction, state) => this.onSwipe(direction, state)}
                                // onSwipeUp={(state) => this.onSwipeUp(state)}
                                // onSwipeDown={(state) => this.onSwipeDown(state)}
                                // onSwipeLeft={(state) => this.onSwipeLeft(state)}
                                // onSwipeRight={(state) => this.onSwipeRight(state)}
                                config={config}
                                style={{
                                    height:this.screenHeight-50,
                                    backgroundColor: this.state.backgroundColor
                                }}
                            >
                                <HomeFeed press={()=>{
                                    // this.props.navigation.navigate('Cart');
                                }
                                }navigation={this.props.navigation} viewType={'list'}/>
                            </GestureRecognizer>
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
        viewType : state.contentReducer.viewType
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        getDummyData:()=>{
            console.log("DP called");
            contentActions.getAllContent(1,dispatch);
        },
        changeViewType:(type)=>{
            contentActions.changeViewType(type,dispatch);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
