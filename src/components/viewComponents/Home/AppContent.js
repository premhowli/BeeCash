import React from "react";
import theme from "../../../styles/theme"
import {Text, View,Image,FlatList,ScrollView,TouchableOpacity, Dimensions} from 'react-native';
import { connect } from "react-redux";
import { TabView, SceneMap, TabViewAnimated } from 'react-native-tab-view';
import {AppRegistry} from 'react-native';
import App from '../../../../App';
import {name as appName} from '../../../../app';
import Home from './Home'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Details from '../TrackerView/Details';
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Tracker from '../TrackerView/Tracker';
import Login from '../User/index';


AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));

import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';



const RootStack = createStackNavigator(
    {
        Home: {
            screen:Home,
            navigationOptions: {
                header: null,
            },
        },
        Cart:{
            screen:Details,
            navigationOptions: {
                header: null,
            },
        },
        Login:{
            screen:Login,
            navigationOptions: {
                header: null,
            },
        }

    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

const CartStack = createStackNavigator(
    {
        Track: {
            screen:Tracker,
            navigationOptions: {
                header: null,
            },
        },
        Details:{
            screen:Details,
            navigationOptions: {
                header: null,
            },
        },

    },
    {
        initialRouteName: 'Track',
        headerMode: 'none',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    }
);



const tabRootStack = createMaterialTopTabNavigator({
        Home: {
            screen:RootStack,
            navigationOptions: {
                tabBarLabel:"Home",
                tabBarIcon: ({focused, tintColor }) => (
                    <AntDesign name="home" size={20} color={tintColor?tintColor:"#000000"}/>
                )
            },
        },
        Cart :{
            screen:CartStack,
            navigationOptions: {
                tabBarLabel:"Home",
                tabBarIcon: ({focused, tintColor }) => (
                    <SimpleLineIcons name="location-pin" size={20} color={tintColor?tintColor:"#000000"}/>
                )
            }
        } ,

        // Details : RootStack
    },
    {
        initialRouteName: 'Home',
        swipeEnabled:true,
        lazy:true,
        headerMode: 'none',
        tabBarPosition:'bottom',
        showLabel:false,
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
        tabBarOptions:{
            showLabel:false,
            showIcon:true,
            activeTintColor:theme.colors.statusBarColor,
            inactiveTintColor:"#000000",
            style:{
                backgroundColor:"#ffffff",

            },
            indicatorStyle: {
                backgroundColor: theme.colors.statusBarColor,
                top: 0,
            }
        }
    }
);

const globalStack = createStackNavigator({
    Login:{
        screen:Login,
        navigationOptions: {
            header: null,
        },
    },
    Dashboard:{
        screen:tabRootStack,
        navigationOptions: {
            header: null,
        },
    }
},{
    initialRouteName: 'Login',
    headerMode: 'none',
    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
    },
});




const AppContainer = createAppContainer(globalStack);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
            showList:true,
            backgroundColor:"red",
            index: 0,
            routes: [
                { key: 'first', title: 'bal' },
                { key: 'second', title: 'banmkl' },
            ],
        };

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


    componentDidMount(){
        this.props.getDummyData(this.state.page);
    }




    static getDerivedStateFromProps(nextProp, prevState) {
        return {
        }
    }
    render(){
        const config = {
            velocityThreshold: 0,
            directionalOffsetThreshold: 80
        };
        return (
            <AppContainer />
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};


const mapDispatchToProps = (dispatch) => {

    return {
        getDummyData:()=>{

        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);

