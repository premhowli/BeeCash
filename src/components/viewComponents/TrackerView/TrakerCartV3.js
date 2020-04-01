import React, {Component, createRef} from 'react';
import {View, Text, Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from "react-native-reanimated";
import Image from 'react-native-image-progress';
import theme from '../../../styles/theme';
import {CustomCachedImage} from 'react-native-img-cache';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as contentActions from '../../../redux/actions/contentActions';
import { connect } from "react-redux";
import {HomeFeed} from '../HomeFeed/HomeFeed';

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

let containerCount = 0;

class CellContainer extends React.Component {
    constructor(args) {
        super(args);
        this._containerId = containerCount++;
    }
    render() {
        return <View {...this.props}>{this.props.children}<Text>Cell Id: {this._containerId}</Text></View>;
    }
}

const { cond, eq, add, call, set, Value, event, or } = Animated;

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

const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
});

/***
 * To test out just copy this component and render in you root component
 */
class RecycleTestComponent extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            dataProvider: [],
            content:[],
            draggingIdx:-1,
            dragging:false,
            //content: props.content
        }

        let { width } = Dimensions.get("window");

        this.onGestureEvent = event([
            {
                nativeEvent: {
                    absoluteY: this.offY,
                    state: this.gestureState
                }
            }
        ]);

        this.y = add(this.offY, new Value(-this.rowHeight / 2));



        //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
        //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP


        //Create the layout provider
        //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
        //Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
        //If you need data based check you can access your data provider here
        //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
        //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
        this._layoutProvider = new LayoutProvider(
            index => {
                return ViewTypes.FULL;
            },
            (type, dim) => {
                dim.width = width;
                dim.height = 250;
            }
        );

    }

    componentDidMount(){
        //this.props.getCon();
        if(!this.state.dataProvider){
            this.props.getCon();
        }

    }

    static getDerivedStateFromProps(nextProp, prevState) {
        console.log("<<<< leh bal 1 "+prevState.content);
        //console.log("<<<< leh bal 2 "+nextProp.dataProvider);


        if(!nextProp.dataProvider){
           return;
        }

        try{
            dataProvider.cloneWithRows(nextProp.dataProvider);
            //console.log("<<<< leh bal 2 "+nextProp.dataProvider);

        }
        catch(e){
            console.log("<<<< leh bal 20 exception = "+e.message)
        }

        try{
            dataProvider.cloneWithRows(prevState.dataProvider)
            console.log("<<<< leh bal 3 "+prevState.dataProvider);
        }
        catch(e){
            console.log("<<<< leh bal 3 exception = "+e.message)
        }





        return {
            dataProvider : dataProvider.cloneWithRows(nextProp.dataProvider) !== dataProvider.cloneWithRows(prevState.dataProvider)
                ? dataProvider.cloneWithRows(nextProp.dataProvider) : dataProvider.cloneWithRows(prevState.dataProvider),
            dragging: nextProp.dragging !== prevState.dragging ? nextProp.dragging : prevState.dragging,
            draggingIdx : nextProp.draggingIdx !== prevState.draggingIdx ? nextProp.draggingIdx : prevState.draggingIdx
        }

    }







    _generateArray(n) {
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = {id:i,name:'bal'};
        }
        return arr;
    }

    //Given type and data return the view component
    _rowRenderer = (type, data, index, _, nope)=> {
        return (

                <TouchableOpacity
                    style={{

                    height:230,
                    marginHorizontal:10,
                    backgroundColor: nope ? "#f2f2f2" : "#dddddd",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius:5,
                        marginVertical:10,
                    justifyContent:'space-between',
                    alignItems: "center",
                    // opacity: !nope && index ===this.state.draggingIdx ? 0 : 1
                }}
                    onPress={()=>{
                        console.log("<<<< dudu");
                        this.props.navigation.navigate('Details');
                    }}





                >


                    <View style={{flex:7,flexDirection:'row'}}>
                        <CustomCachedImage
                            component={Image}
                            source={{ uri: data.imageUrl}}
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
                            <TouchableOpacity style={{position:'absolute',
                                right:5,
                                top:5,
                                width:40,
                                height:40,
                                borderRadius:25,
                                backgroundColor:'#000000aa',

                                justifyContent:'center',
                                alignItems:'center'
                                }}
                                onPress={()=>{
                                    this.props.deleteItem(data.id);
                                }}
                            >

                            <MaterialCommunityIcons color={"#ffffff"} name={'delete'} size={25} />
                            </TouchableOpacity>

                        </CustomCachedImage>
                        {/*<Text style={{ fontSize: 32 }}> {data.name}</Text>*/}
                    </View>
                    <View style={{flex:3,height:'100%',width:"100%"}}>

                        <View style={{flex:1,justifyContent:'center',paddingHorizontal:10}}>
                            <Text style={{fontSize:15,fontWeight:'bold'}}>{data.name}</Text>
                        </View>
                            <View style={{flex:1,
                                flexDirection:'row',
                                borderBottomLeftRadius:5,
                                justifyContent:'space-between'}}>
                                <View style={{flex:1,paddingLeft:10,justifyContent:'center'}}>
                                <Text>{data.location}</Text>
                                </View>
                            <View style={{flexDirection:'row',
                                position:'absolute',
                                right:5,
                                justifyContent:'flex-end',
                                alignItems:'center'}}>
                            <PanGestureHandler
                                maxPointers={1}
                                onGestureEvent={this.onGestureEvent}
                                onHandlerStateChange={this.onGestureEvent}
                            >
                                <Animated.View style={{
                                    height:'100%',
                                    borderRadius:5,
                                }}>
                                    <View style={{flex:1,
                                        borderBottomRightRadius:5,
                                        justifyContent:'center',
                                        width:40,
                                        alignItems:'center'}}>
                                        <FontAwesome5 name={'grip-lines'} size={25} />
                                    </View>


                                </Animated.View>

                            </PanGestureHandler>
                            </View>
                            </View>




                    </View>
                </TouchableOpacity>


        );
    }
    y: Animated.Node<number>;
    offY = new Value(0);
    gestureState = new Value(-1);
    onGestureEvent: any;
    rowHeight = 250;
    currIdx = -1;
    scrollOffset = 0;
    lastScrollOffset = -1;
    flatlistHeight = -1;
    topOffset = 0;
    scrolling = false;

    start = ([y]) => {
        console.log("<<<< num 1 = "+JSON.stringify(this.currIdx));
        this.currIdx = this.yToIndex(y);
        // console.log("<<<< num 1");
        //console.log("<<<< choco 1 = "+this.currIdx);

        this.props.changeDragValues(true,this.currIdx);

        //this.setState({ dragging: true, draggingIdx: this.currIdx });
    };

    yToIndex = (y: number) =>
        Math.min(
            this.state.dataProvider.getSize() - 1,
            Math.max(
                0,
                Math.floor((y + this.scrollOffset - this.topOffset) / this.rowHeight)
            )
        );

    listContainer = React.createRef();
    list = React.createRef();

    reset = ([y]) => {
        // console.log("<<<<<< bal 4 ="+JSON.stringify(this.state.dataProvider.getAllData()));
        // console.log("<<<< num 2");
        //this.props.changeData(this.state.dataProvider.getAllData());


        this.props.changeAllValues(false,-1,this.state.dataProvider.getAllData());


        // this.setState((prevState)=>{
        //  //console.log("<<<<<< bal 6 = "+JSON.stringify(this.state.dataProvider.getAllData()));
        //     return(
        //         {
        //             dataProvider: this.state.dataProvider.cloneWithRows(
        //                 this.state.dataProvider.getAllData()
        //             ),
        //             dragging: false,
        //             draggingIdx: -1,
        //         });
        // },()=>{
        //     console.log("<<<<<< bal 6 2 = "+JSON.stringify(this.state.dataProvider.getAllData()));
        //     this.props.changeData(
        //         this.state.dataProvider.getAllData()
        //     );
        // });

        // this.props.changeData(
        //     this.state.dataProvider.getAllData()
        // );
        this.scrolling = false;

        //this.updateOrder(y);
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

    updateOrder = y => {
        const newIdx = this.yToIndex(y);
//console.log("<<<<<< bal 6 newIdx ="+newIdx+" this.currIdx = "+this.currIdx+" draggingIdx = "+this.state.draggingIdx)
        if (this.currIdx !== newIdx) {

            // this.props.changeData(
            //
            // );
            // this.props.changeDraggingIdx(newIdx);


            this.props.changeForMove(newIdx,immutableMove(
                this.state.dataProvider.getAllData(),
                this.currIdx,
                newIdx
            ));
            this.currIdx = newIdx;

            // this.setState({
            //     dataProvider: this.state.dataProvider.cloneWithRows(
            //         immutableMove(
            //             this.state.dataProvider.getAllData(),
            //             this.currIdx,
            //             newIdx
            //         )
            //     ),
            //     draggingIdx: newIdx
            // });

        }
        console.log("<<<< num 4");
    };




    render() {
        const { dragging, dataProvider, draggingIdx } = this.state;
        console.log("<<<<<< bal = "+JSON.stringify(this.state.dataProvider));
        console.log("<<<<<< bal 3 = "+draggingIdx);
        let e=0;
        if(draggingIdx != -1){
            e=2;
        }
        else{
            e=3;
        }

        return(

            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>




                    {
                        dataProvider ?
                        <View style={{ flex: 1 }}>
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
                                        ),
                                        call([this.offY], this.reset)
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
                                        backgroundColor:'transparent',
                                        zIndex: 99,
                                        elevation: 99
                                    }}
                                >
                                    <View style={{width:'100%',height:'100%',alignItems:'center'}}>
                                        {this._rowRenderer(
                                            -1,
                                            dataProvider.getDataForIndex(draggingIdx),
                                            -1,
                                            -1,
                                            true
                                        )}
                                    </View>
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
                                {
                                    this.state.dataProvider &&
                                    this.state.dataProvider._data &&
                                    this.state.dataProvider._data.length > 0?
                                        <RecyclerListView
                                            canChangeSize={true}
                                            ref={this.list}
                                            // drag={this.state.draggingIdx}
                                            style={{ flex: 1 }}
                                            onScroll={e => {
                                                this.scrollOffset = e.nativeEvent.contentOffset.y;
                                            }}
                                            layoutProvider={this._layoutProvider}
                                            dataProvider={this.state.dataProvider}
                                            renderAheadOffset = {e}
                                            rowRenderer={this._rowRenderer} />
                                        :
                                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                            <Text>Oops!!! you haven't added any event to track.</Text>
                                        </View>

                                }

                            </View>
                        </View>
                            :
                            <View>
                            </View>
                    }
                </View>
        </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataProvider:state.contentReducer.contentDataStore[state.contentReducer.currentLoggedInUser],
        viewType : state.contentReducer.viewType,
        dragging : state.contentReducer.dragging,
        draggingIdx : state.contentReducer.draggingIdx,
        //allContent : state.contentReducer.
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        changeData:(arr)=>{
            contentActions.changeAllContent(arr,dispatch);
        },
        getCon:()=>{
            contentActions.getCon(dispatch);
        },
        changeDraggingIdx:(value)=>{
            contentActions.changeDraggingIdx(value,dispatch);
        },
        changeDragging:(value)=>{
            contentActions.changeDragging(value,dispatch);
        },
        changeDragValues:(dragging,draggingIdx)=>{
            contentActions.changeValues(dragging,draggingIdx,dispatch);
        },
        changeAllValues:(dragging,draggingIdx,content)=>{
            contentActions.changeAllValues(dragging,draggingIdx,content,dispatch)
        },
        changeForMove:(draggingIdx,content)=>{
            contentActions.changeForMove(draggingIdx,content,dispatch);
        },
        deleteItem:(id)=>{
            contentActions.deleteItemFromTracker(id,dispatch)
        }

        // getDummyData:()=>{
        //     console.log("DP called");
        //     contentActions.getAllContent(1,dispatch);
       // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecycleTestComponent);
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
