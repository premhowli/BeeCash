import React, {Component, createRef} from 'react';
import {View, Text, Dimensions, SafeAreaView} from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from "react-native-reanimated";

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

/***
 * To test out just copy this component and render in you root component
 */
export default class RecycleTestComponent extends React.Component {


    constructor(args) {
        super(args);

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        this.arr = [

            {"id":2,"name":"chal",color:"#e3a256"},
            {"id":3,"name":"zxde",color:"#a3c216"},
            {"id":4,"name":"tal",color:"#b31256"},
            {"id":5,"name":"bvbfhal",color:"#c302f6"},
            {"id":6,"name":"lao",color:"#03a256"},
            {"id":7,"name":"fyht",color:"#b3b2b6"},
            {"id":8,"name":"ke re",color:"#afa256"},
            {"id":9,"name":"vgyu",color:"#a3b25f"},
            {"id":10,"name":"bhai",color:"#e0e216"},
            {"id":11,"name":"nvbg",color:"#f3a0ff"}



        ]

        this.state = {
            FlatListItems: [
                {name: 'Patrick star'},
                {name: 'Gallileo'},
                {name: 'Einsten'},
                {name: 'Peterson'},
                {name: 'Schwarzenneger'},
                {name: 'Dostoyevsky'},
                {name: 'Patrick star'},
                {name: 'Gallileo'},
                {name: 'Einsten'},
                {name: 'Peterson'},
                {name: 'Schwarzenneger'},
                {name: 'Dostoyevsky'},
            ],
            dragging: false,
            draggingIdx: -1,
            dataProvider: dataProvider.cloneWithRows(this.arr)
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
                dim.height = 200;
            }
        );

        // this._rowRenderer = this._rowRenderer.bind(this);
        // this.arr = [{"id":0,"name":"bal"},
        //     {"id":1,"name":"bal"},
        //
        //     {"id":2,"name":"bal"},
        //     {"id":3,"name":"bal"},
        //     {"id":4,"name":"bal"},
        //     {"id":5,"name":"bal"},
        //     {"id":6,"name":"bal"},
        //     {"id":7,"name":"bal"},
        //     {"id":8,"name":"bal"},
        //     {"id":9,"name":"bal"},
        //     {"id":10,"name":"bal"},
        //     {"id":11,"name":"bal"},
        //
        //
        //
        // ]
        //
        // //Since component should always render once data has changed, make data provider part of the state
        // this.state = {
        //     dataProvider: dataProvider.cloneWithRows(this.arr)
        // };
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
        console.log("<<<< num 5");
        //You can return any view here, CellContainer has no special significance
        console.log("<<<<<< bal 5 = nope = "+nope+" index "+index+" draggingIdx "+this.state.draggingIdx);
        // if(this.state.draggingIdx)
        return (

                <View style={{
                    paddingVertical: 16,
                    paddingHorizontal:5,
                    height:180,
                    backgroundColor: nope ? "#f2f2f2" : data.color,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:'space-between',
                    alignItems: "center",
                    // opacity: nope ? 0 : 1
                }}

                >


                    <View style={{flex:9}}>
                    <Text style={{ fontSize: 32 }}> {JSON.stringify(data)}</Text>
                    </View>
                    <View style={{flex:1,height:'100%'}}>
                    {
                        nope ?
                            <View style={{backgroundColor:'green'}}>
                                <Text style={{ fontSize: 32 }}>@</Text>
                            </View>
                            :
                            <PanGestureHandler
                                maxPointers={1}
                                onGestureEvent={this.onGestureEvent}
                                onHandlerStateChange={this.onGestureEvent}
                            >
                                <Animated.View style={{
                                    flexDirection: 'row', justifyContent: 'space-between',
                                    height:'100%',

                                    backgroundColor: nope ? "#f2f2f2" : 'red',
                                }}>
                                    <Text style={{ fontSize: 32 }}>@</Text>
                                </Animated.View>

                            </PanGestureHandler>

                    }
                    </View>
                </View>


        );
    }
    y: Animated.Node<number>;
    offY = new Value(0);
    gestureState = new Value(-1);
    onGestureEvent: any;
    rowHeight = 200;
    currIdx = -1;
    scrollOffset = 0;
    lastScrollOffset = -1;
    flatlistHeight = -1;
    topOffset = 0;
    scrolling = false;

    start = ([y]) => {
        this.currIdx = this.yToIndex(y);
        console.log("<<<< num 1");
        console.log("<<<< choco 1 = "+this.currIdx);
        this.setState({ dragging: true, draggingIdx: this.currIdx });
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
        console.log("<<<<<< bal 4 ="+JSON.stringify(this.state.dataProvider.getAllData()));
        console.log("<<<< num 2");
        this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows(
                this.state.dataProvider.getAllData()
            ),
            dragging: false,
            draggingIdx: -1,
        });
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
        console.log("<<<< num 3");
    };

    updateOrder = y => {
        const newIdx = this.yToIndex(y);
console.log("<<<<<< bal 6 newIdx ="+newIdx+" this.currIdx = "+this.currIdx+" draggingIdx = "+this.state.draggingIdx)
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
        console.log("<<<< num 4");
    };




    render() {
        const { dragging, dataProvider, draggingIdx } = this.state;
        console.log("<<<<<< bal = "+JSON.stringify(this.state.dataProvider));
        console.log("<<<<<< bal 3 = "+draggingIdx);
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
                            backgroundColor:'green',
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
                        // drag={this.state.draggingIdx}
                        style={{ flex: 1 }}
                        onScroll={e => {
                            this.scrollOffset = e.nativeEvent.contentOffset.y;
                        }}
                        layoutProvider={this._layoutProvider}
                        dataProvider={this.state.dataProvider}
                        rowRenderer={this._rowRenderer} />
                </View>
        </SafeAreaView>
        );
    }
}
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
