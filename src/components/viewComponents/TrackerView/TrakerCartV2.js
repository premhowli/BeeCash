import React, { Component,  createRef  } from "react";
import {View, Text, Dimensions, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import * as contentActions from '../../../redux/actions/contentActions';
import { connect } from "react-redux";
import theme from '../../../styles/theme'
import {CustomCachedImage} from 'react-native-img-cache';
import Image from 'react-native-image-progress';
import DraggableFlatList from "react-native-draggable-flatlist";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider
} from "recyclerlistview";



import {HomeFeed} from '../HomeFeed/HomeFeed';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};



const getRandomColor = ()=> {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const immutableMove = (arr, from, to) => {
    return arr.reduce((prev, current, idx, self) => {
        if (from === to) {
            prev.push(current);
        }
        if (idx === from) {
            return prev;
        }
        if (from < to) {
            prev.push(current);
        }
        if (idx === to) {
            prev.push(self[from]);
        }
        if (from > to) {
            prev.push(current);
        }
        return prev;
    }, []);
}

const colorMap = {};

const { cond, eq, add, call, set, Value, event, or } = Animated;

const exampleData = [...Array(20)].map((d, index) => ({
    key: `item-${index}`, // For example only -- don't use index as your key!
    label: index,
    backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));


export class TrackerCart2 extends React.Component {


    list = React.createRef();
    listContainer = React.createRef();
    _layoutProvider: LayoutProvider;
    y: Animated.Node<number>;
    offY = new Value(0);
    gestureState = new Value(-1);
    onGestureEvent: any;
    rowHeight = 70;
    currIdx = -1;
    scrollOffset = 0;
    lastScrollOffset = -1;
    flatlistHeight = -1;
    topOffset = 0;
    scrolling = false;


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
            dragging: false,
            draggingIdx: -1,
            dataProvider: dataProvider.cloneWithRows(arr),
        };
        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;


        this.onGestureEvent = event([
            {
                nativeEvent: {
                    absoluteY: this.offY,
                    state: this.gestureState
                }
            }
        ]);

        this.y = add(this.offY, new Value(-this.rowHeight / 2));

        this._layoutProvider = new LayoutProvider(
            index => {
                return ViewTypes.FULL;
            },
            (type, dim) => {
                dim.width = width;
                dim.height = 70;
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);

        const arr = this._generateArray(300);

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });





    }


    _generateArray(n) {
        return Array.from(Array(n), (_, i) => {
            colorMap[i] = getRandomColor();
            return i;
        });
    }

    _rowRenderer(type, data, index, _, nope) {
        nope = !!nope;
        return (
            <View
                style={{
                    padding: 16,
                    backgroundColor: nope ? "#f2f2f2" : colorMap[data],
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    opacity: !nope && index === this.state.draggingIdx ? 0 : 1
                }}
            >
                {nope ? (
                    <View>
                        <Text style={{ fontSize: 32 }}>@</Text>
                    </View>
                ) : (
                    <PanGestureHandler
                        maxPointers={1}
                        onGestureEvent={this.onGestureEvent}
                        onHandlerStateChange={this.onGestureEvent}
                    >
                        <Animated.View>
                            <Text style={{ fontSize: 32 }}>@</Text>
                        </Animated.View>
                    </PanGestureHandler>
                )}
                <Text style={{ fontSize: 18, textAlign: "center", flex: 1 }}>
                    {data}
                </Text>
            </View>
        );
    }

    yToIndex = (y: number) =>
        Math.min(
            this.state.dataProvider.getSize() - 1,
            Math.max(
                0,
                Math.floor((y + this.scrollOffset - this.topOffset) / this.rowHeight)
            )
        );

    reset = () => {
        this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows(
                this.state.dataProvider.getAllData()
            ),
            dragging: false,
            draggingIdx: -1
        });
        this.scrolling = false;
    };

    start = ([y]) => {

        this.currIdx = this.yToIndex(y);
        console.log("<<<< bnh  = "+this.currIdx);
        this.setState({ dragging: true, draggingIdx: this.currIdx });
    };

    updateOrder = y => {
        const newIdx = this.yToIndex(y);
        if (this.currIdx !== newIdx) {
            this.setState({
                dataProvider: this.state.dataProvider.cloneWithRows(
                    immutableMove(
                        this.state.dataProvider.getAllData(),
                        this.currIdx,
                        newIdx
                    )
                ),
                draggingIdx: newIdx
            });
            this.currIdx = newIdx;
        }
    };

    moveList = amount => {
        if (!this.scrolling) {
            return;
        }

        this.list.current.scrollToOffset(
            this.scrollOffset + amount,
            this.scrollOffset + amount,
            false
        );

        requestAnimationFrame(() => {
            this.moveList(amount);
        });
    };

    move = ([y]) => {
        if (y + 100 > this.flatlistHeight) {
            if (!this.scrolling) {
                this.scrolling = true;
                this.moveList(20);
            }
        } else if (y < 100) {
            if (!this.scrolling) {
                this.scrolling = true;
                this.moveList(-20);
            }
        } else {
            this.scrolling = false;
        }
        this.updateOrder(y);
    };


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
        const { dragging, dataProvider, draggingIdx } = this.state;



        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 50
        };
        return(
            <SafeAreaView style={{ flex: 1 }}>
                <Animated.Code>
                    {() =>
                        cond(
                            eq(this.gestureState, State.BEGAN),
                            call([this.offY], this.start)
                        )
                    }
                </Animated.Code>
                <Animated.Code>
                    {() =>
                        cond(
                            or(
                                eq(this.gestureState, State.END),
                                eq(this.gestureState, State.CANCELLED),
                                eq(this.gestureState, State.FAILED),
                                eq(this.gestureState, State.UNDETERMINED)
                            ),
                            call([], this.reset)
                        )
                    }
                </Animated.Code>
                <Animated.Code>
                    {() =>
                        cond(
                            eq(this.gestureState, State.ACTIVE),
                            call([this.offY], this.move)
                        )
                    }
                </Animated.Code>
                {dragging ? (
                    <Animated.View
                        style={{
                            top: this.y,
                            position: "absolute",
                            width: "100%",
                            zIndex: 99,
                            elevation: 99
                        }}
                    >
                        {this._rowRenderer(
                            -1,
                            dataProvider.getDataForIndex(draggingIdx),
                            -1,
                            -1,
                            true
                        )}
                    </Animated.View>
                ) : null}
                <View
                    ref={this.listContainer}
                    style={{ flex: 1 }}
                    onLayout={e => {
                        this.flatlistHeight = e.nativeEvent.layout.height;
                        this.listContainer.current.measureInWindow((_x, y) => {
                            this.topOffset = y;
                        });
                    }}
                >
                    <RecyclerListView
                        ref={this.list}
                        style={{ flex: 1 }}
                        onScroll={e => {
                            this.scrollOffset = e.nativeEvent.contentOffset.y;
                        }}
                        layoutProvider={this._layoutProvider}
                        dataProvider={dataProvider}
                        rowRenderer={this._rowRenderer}
                    />
                </View>
            </SafeAreaView>
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
            //contentActions.getAllContent(1,dispatch);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerCart2);




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
