import React, { Component } from "react";
import {View, Text,
    Dimensions,
    InteractionManager, ActivityIndicator,
    TouchableOpacity, FlatList} from 'react-native';
import * as contentActions from '../../../redux/actions/contentActions';
import * as feedActions from '../../../redux/actions/feedActions'
import { connect } from "react-redux";
import theme from '../../../styles/theme'
import {CustomCachedImage} from 'react-native-img-cache';
import Image from 'react-native-image-progress';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';





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



export class HomeFeed extends React.Component {
    constructor(props) {
        super(props);

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
                {name:'Patrick star'},
                {name:'Gallileo'},
                {name:'Einsten'},
                {name:'Peterson'},
                {name:'Schwarzenneger'},
                {name:'Dostoyevsky'}
            ],
            showList:true,
            backgroundColor:"red",
            index: 0,
            routes: [
                { key: 'first', title: 'bal' },
                { key: 'second', title: 'banmkl' },
            ],
            isReady : false
        };
        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;

    }

    componentDidMount(){
        // 1: Component is mounted off-screen
        this.props.getAllEvent();
        InteractionManager.runAfterInteractions(() => {
            // 2: Component is done animating
            // 3: Start fetching the team / or render the view
            // this.props.dispatchTeamFetchStart();
            this.setState({
                isReady: true
            })
        });
        console.log("props = "+JSON.stringify(this.props));

    }

    static getDerivedStateFromProps(nextProp, prevState) {
        return {
            allEvent: nextProp.allEvent !== prevState.allEvent ? nextProp.allEvent : prevState.allEvent,
            viewType: nextProp.viewType !== prevState.viewType ? nextProp.viewType : prevState.viewType
        }

    }

    renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });


        //this.props.navigation.navigate('Cart')

        // if(parseInt(JSON.stringify(dragX),10)<(-10)){
        //     this.props.navigation.navigate('Cart')
        // }

        console.log("le bhhhhau 4 "+JSON.stringify(dragX));
        return;
        // this.props.navigation.navigate('Cart')
        // if(this.props.navigation){
        //     this.props.navigation.navigate('Cart')
        // }


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
                    this.props.navigation.navigate('Cart')
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
                            {item.name+item.name}
                        </Text>
                        <Text style={{color:'#323028'}}>
                            {item.name+item.name}
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



    render() {

        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 50
        }


        console.log("<<<<<<<<<<<<<<<"+this.props.press)

        if(!this.state.isReady){
            return <ActivityIndicator />
        }
        else{
            return(
                <View style={{alignItems:'center',width:this.screenWidth}}>
                    {
                        this.state.allEvent?
                            <View
                                style={{
                                    height:this.screenHeight-50,
                                    backgroundColor: this.state.backgroundColor
                                }}
                            >
                                <FlatList
                                    style={{marginTop:10,
                                        backgroundColor:theme.colors.backgroundColor,
                                        width:this.screenWidth}}
                                    contentContainerStyle={{alignItems:'center'}}
                                    data={this.state.FlatListItems}
                                    renderItem={this._renderRows}
                                    keyExtractor={(item)=>{
                                        item.id;
                                    }}
                                />
                            </View>
                            :
                            <View style={{
                                height:this.screenHeight-50,
                                backgroundColor: this.state.backgroundColor
                            }}>
                                <Text>
                                    Sorry!! nothiong is available right now!!!
                                </Text>
                            </View>
                    }

                </View>
            )
        }






    }
}


const mapStateToProps = (state) => {
    return {
        allEvent:state.feedReducer.allEvent,
        viewType : state.feedReducer.viewType,
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        getDummyData:()=>{
            console.log("DP called");
            contentActions.getAllContent(1,dispatch);
        },
        getAllEvent:()=>{
            feedActions.getAllEvent(dispatch);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);




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
