import React from "react";
import theme from "../../../styles/theme"
import * as contentActions from "../../../redux/actions/contentActions";
import {Text, View,Image,FlatList,ScrollView,TouchableOpacity, Dimensions} from 'react-native';
import Entypo from "react-native-vector-icons/Entypo"
import styles from "./styles";
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import FastImage from 'react-native-fast-image'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ProgressBar from 'react-native-progress/Bar';
import {CustomCachedImage, ImageCache} from 'react-native-img-cache';
import LazyImage from "react-lazy-progressive-image";
//import ProgressiveImage from 'react-native-progressive-image'
import ScrollableTabView, { DefaultTabBar }  from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
//import { TabView, SceneMap } from 'react-native-tab-view';
import FlatlistPagination from './Asd';
import { TabView, SceneMap, TabViewAnimated } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import {AppRegistry} from 'react-native';
import App from '../../../../App';
import {name as appName} from '../../../../app';
import Home from './Home'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
// import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import TrackerCart from '../TrackerView/TrakerCart';
import { fromLeft } from 'react-navigation-transitions';
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Basic from '../TrackerView/sortableList'
import RecycleTestComponent from '../TrackerView/sortable';
import TrackerCart2 from '../TrackerView/TrakerCartV3';


AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
import Example from '../TrackerView/example'

import HomeFeed from "../HomeFeed/HomeFeed";



const Component = () => {
    return (
        <View><Text>hello</Text></View>
    );
}

const RootStack = createStackNavigator(
    {
        Home: {
            screen:Home,
            navigationOptions: {
                header: null,
            },
        },
        // HomeFeed:{
        //     screen:HomeFeed,
        //     navigationOptions: {
        //         header: null,
        //     },
        //
        // },
        Cart:{
            screen:TrackerCart,
            navigationOptions: {
                header: null,
            },
        },

    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

const tabRootStack = createMaterialTopTabNavigator({
        Home: RootStack,
        Cart : TrackerCart2,
        // Details : RootStack
    },
    {
        initialRouteName: 'Home',
        swipeEnabled:true,
        lazy:true,
        headerMode: 'none',
        tabBarPosition:'bottom',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
)




const AppContainer = createAppContainer(tabRootStack);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


// const MySwitch = createAnimatedSwitchNavigator(
//     {
//         Home: HomeFeed,
//
//     },
//     {
//         // The previous screen will slide to the bottom while the next screen will fade in
//         transition: (
//             <Transition.Together>
//                 <Transition.Out
//                     type="slide-bottom"
//                     durationMs={400}
//                     interpolation="easeIn"
//                 />
//                 <Transition.In type="fade" durationMs={500} />
//             </Transition.Together>
//         ),
//     }
// );



const FirstRoute = () => (
    <View style={[{height:height-50,width:width}, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[{height:height-50,width:width}, { backgroundColor: '#673ab7' }]} >
        <HomeFeed />
    </View>
);

const initialLayout = { width: Dimensions.get('window').width };

const LazyPlaceholder = ({ route }) => (
    <View style={{height:100,width:400}}>
        <Text>Loading {route.title}…</Text>
    </View>
);




class AppContent extends React.Component {
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
            backgroundColor:"red",
            index: 0,
            routes: [
                { key: 'first', title: 'bal' },
                { key: 'second', title: 'banmkl' },
            ],
        };
        // this.state = {
        //    content:"Hello",
        //     page:0,
        //     url:"https://unsplash.it/400/400?image=1",
        //     dummt:[
        //         {
        //             "id": "",
        //             "price": "3v00.00",
        //             "imageUrl": "https://source.unsplash.com/random/200",
        //             "name": "pukah"
        //
        //         },
        //         {
        //             "id": "",
        //             "price": "3f00.00",
        //             "imageUrl": "https://source.unsplash.com/random/300",
        //             "name": "pukah"
        //
        //         },
        //         {
        //             "id": "",
        //             "price": "3200.00",
        //             "imageUrl": "https://source.unsplash.com/random/400",
        //             "name": "pukah"
        //
        //         },
        //         {
        //             "id": "",
        //             "price": "3200.00",
        //             "imageUrl": "https://source.unsplash.com/random/500",
        //             "name": "pukah"
        //
        //         },
        //         {
        //             "id": "",
        //             "price": "3200.00",
        //             "imageUrl": "https://source.unsplash.com/random",
        //             "name": "pukah"
        //
        //         }
        //     ]
        // }

        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;

    }


    renderDrawer = () => {
        return (
            <View>
                <Text>I am in the drawer!</Text>
            </View>
        );
    };

    // static getDerivedStateFromProps(nextProp, prevState) {
    //     return {
    //         // examID: nextProp.navigation.state.params.id
    //         viewType: nextProp.viewType !== prevState.viewType ? nextProp.viewType : prevState.viewType
    //     }
    //
    // }

    _handleIndexChange = index => this.setState({ index });

    _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

    componentDidMount(){
        this.props.getDummyData(this.state.page);
    }
    _renderTab = props => {
        //const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View>
            </View>

        );
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;
            case '2':
                return <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
            default:
                return null;
        }
    };


    _renderRows = ({item, index, separators})=>{

        if(this.state.showList){
            console.log("e bhai true to");
            return(
                <View style={{justifyContent:'center',marginBottom:10}}>
                    <Text style={{backgroundColor:'blue',color:'white',padding:10,width:Dimensions.get('window').width}}>
                        {item.name}
                    </Text>
                </View>
            )
        }
        else{
            console.log("e bhai false to");
            return(
                <View style={{justifyContent:'center',marginBottom:10}}>
                    <Text style={{backgroundColor:'green',color:'white',padding:10,width:Dimensions.get('window').width}}>
                        {item.name}
                    </Text>
                </View>
            )
        }
        };


    onMomentumScrollBegin = () => { this.onEndReachedCalledDuringMomentum = false; }


    static getDerivedStateFromProps(nextProp, prevState) {
        return {
            content : nextProp.content !== prevState.content ? nextProp.content : prevState.content,
            viewType: nextProp.viewType !== prevState.viewType ? nextProp.viewType : prevState.viewType
        }
    }
    render(){
        const config = {
            velocityThreshold: 0,
            directionalOffsetThreshold: 80
        };

        console.log("asd leh answer "+this.state.showList);
        console.log("<<<< chicku  = "+this.state.viewType );


        return (


            <AppContainer />
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

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);

