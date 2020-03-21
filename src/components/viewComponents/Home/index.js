import React from "react";
import theme from "../../../styles/theme"
import * as contentActions from "../../../redux/actions/contentActions";
import {Text, View,Image,FlatList,ScrollView,TouchableOpacity} from 'react-native';
import styles from "./styles";
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import FastImage from 'react-native-fast-image'
import ProgressBar from 'react-native-progress/Bar';
import {CustomCachedImage, ImageCache} from 'react-native-img-cache';
import LazyImage from "react-lazy-progressive-image";
//import ProgressiveImage from 'react-native-progressive-image'
import { connect } from "react-redux";
import FlatlistPagination from './Asd';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           content:"Hello",
            page:0,
            url:"https://unsplash.it/400/400?image=1",
            dummt:[
                {
                    "id": "",
                    "price": "3v00.00",
                    "imageUrl": "https://source.unsplash.com/random/200",
                    "name": "pukah"

                },
                {
                    "id": "",
                    "price": "3f00.00",
                    "imageUrl": "https://source.unsplash.com/random/300",
                    "name": "pukah"

                },
                {
                    "id": "",
                    "price": "3200.00",
                    "imageUrl": "https://source.unsplash.com/random/400",
                    "name": "pukah"

                },
                {
                    "id": "",
                    "price": "3200.00",
                    "imageUrl": "https://source.unsplash.com/random/500",
                    "name": "pukah"

                },
                {
                    "id": "",
                    "price": "3200.00",
                    "imageUrl": "https://source.unsplash.com/random",
                    "name": "pukah"

                }
            ]
        }
    }

    componentDidMount(){
        this.props.getDummyData(this.state.page);
    }

    _renderFlatList = ({item, index, separators}) => {
        console.log("<<<< render datan "+index+", = "+JSON.stringify(item));
        return (
            <TouchableOpacity key={index}
            style={{backgroundColor:"blue",width: 200, height: 200}}
            >

                <Image
                    key={index}
                    onLoad={()=>{
                        console.log("<<<< loaded render");
                    }}
                    progressiveRenderingEnabled={true}
                    style={{width: 50, height: 40}}
                    source={{uri: "https://via.placeholder.com/150/d32776"}}
                />
                <FastImage
                    style={{ width: 200, height: 200 }}
                    source={{
                        uri: "https://via.placeholder.com/150/d32776",
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                />


            </TouchableOpacity>
        );
    };
    onEndReached = ({ distanceFromEnd }) => {
        this.setState({
            page:this.state.page+1
        },()=>{
            this.props.getDummyData(this.state.page);
        });
        if(!this.onEndReachedCalledDuringMomentum){
            this.onEndReachedCalledDuringMomentum = true;
        }
    }

    onMomentumScrollBegin = () => { this.onEndReachedCalledDuringMomentum = false; }


    static getDerivedStateFromProps(nextProp, prevState) {
        return {
            content : nextProp.content !== prevState.content ? nextProp.content : prevState.content,
        }
    }
    render(){


        return (

            <FlatlistPagination />



            // <FlatList
            //     contentContainerStyle={{justifyContent:'center'}}
            //     initialNumToRender={30}
            //     maxToRenderPerBatch={15}
            //     //onEndReachedThreshold={0.1}
            //     //onMomentumScrollBegin={this.onMomentumScrollBegin}
            //     //onEndReached={this.onEndReached}
            //     windowSize={30}
            //     //pagingEnabled={true}
            //     onEndReachedThreshold={5}
            //     onEndReached={this.onEndReached.bind(this)}
            //     onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            //
            //
            //     updateCellsBatchingPeriod={50}
            //     showsVerticalIndicator={true}
            //     data={this.state.content}
            //     renderItem={this._renderFlatList.bind(this)}
            // />



           // {/*<View style={{flex:1}}>*/}
           //      {/*<View style={styles.container}>*/}
           //          {/*/!*<Image*!/*/}
           //              {/*/!*source={{ uri: 'https://source.unsplash.com/random'+'?time'+(new Date()).getTime() }}*!/*/}
           //              {/*/!*style={{ width: 200, height: 200 }}*!/*/}
           //              {/*/!*PlaceholderContent={<Text>hello</Text>}*!/*/}
           //
           //          {/*<View style={{width:300,*/}
           //              {/*height:200,*/}
           //              {/*borderRadius:10,*/}
           //              {/*justifyContent:"center",*/}
           //              {/*alignItems:"center",*/}
           //              {/*backgroundColor:'red'}}>*/}
           //              {/*<Text style={{position:"absolute",top:'45%',left:'45%'}}>hello</Text>*/}
           //
           //          {/*<CustomCachedImage*/}
           //              {/*//asfsggamcfvcdnmnmnb*/}
           //              {/*component={Image}*/}
           //              {/*source={{ uri: 'https://source.unsplash.com/random'+'?time'+(new Date()).getTime() }}*/}
           //              {/*indicator={ProgressBar}*/}
           //              {/*style={{*/}
           //                  {/*width: "100%",*/}
           //                  {/*height: "100%",*/}
                    //         {/*borderRadius:10,*/}
                    //     {/*}}/>*/}
                    // {/*</View>*/}
                    // {/*<ScrollView>*/}
                    // {/*<View style={{width:400}}>*/}
                    //     {/*{*/}
                    //         {/*this.state.content?*/}
                    //             {/*<FlatList*/}
                    //                 {/*contentContainerStyle={{justifyContent:'center'}}*/}
                    //                 {/*initialNumToRender={8}*/}
                    //                 {/*maxToRenderPerBatch={5}*/}
                    //                 {/*onEndReachedThreshold={0.1}*/}
                    //                 {/*//onMomentumScrollBegin={this.onMomentumScrollBegin}*/}
                    //                 {/*//onEndReached={this.onEndReached}*/}
                    //                 {/*windowSize={7}*/}
                    //                 {/*pagingEnabled={true}*/}
                    //                 {/*updateCellsBatchingPeriod={50}*/}
                    //                 {/*showsVerticalIndicator={true}*/}
                    //                 {/*data={this.state.content.slice(0,100)}*/}
                    //                 {/*renderItem={this._renderFlatList.bind(this)}*/}
                    //             {/*/>:*/}
                    //         {/*<View />*/}
                    //     {/*}*/}
                    //     {/*{*/}
                    //     {/*}*/}
                    //
                    // {/*</View>*/}
                    //
                    // {/*</ScrollView>*/}
                    //
                    // {/*<View style={{height:200,width:300,backgroundColor:'red'}}>*/}
                    // {/*<Image*/}
                    //     {/*key={new Date()}*/}
                    //     {/*onLoad={()=>{*/}
                    //         {/*console.log("<<<< loaded");*/}
                    //     {/*}}*/}
                    //     {/*progressiveRenderingEnabled={true}*/}
                    //     {/*style={{width: "100%", height: "100%"}}*/}
                    //     {/*source={{uri: 'https://source.unsplash.com/random'+'?time'+(new Date()).getTime(),cache: 'reload'}}*/}
                    // {/*/>*/}
                    // {/*</View>*/}
                    //

           //
           //      {/*</View>*/}
           // /*</View>*/
        );
    }
}

const mapStateToProps = (state) => {
    return {
        content:state.contentReducer.allContent,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

