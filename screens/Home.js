import React, {Component} from "react";
import {View, Text, Stylesheet, Image, TouchableOpacity} from "react-native";
import {Header, AirbnbRating, Icon} from "react-native-elements";
import {RFValue} from "react-native-responsive-fontsize";
import {axios} from "axios";

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state = {
            movieDetails : {}
        };
    }

    componentDidMount(){
        this.getMovie();
  }

  timeConvert(num){
    var hours = Math.floor(num/60);
    var minutes = num %60;
    return `${hours} hrs ${minutes} mins`;
  }
  
  getMovie = () => {
    const url = "http://localhost:5000/get-movie";
    axios
    .get(url)
    .then(response => {
        let details = response.data.data;
        details["duration"] = this.timeConvert(details.duration);
        this.setState({movieDetails : details});
    })
    .catch(error =>{
        console.log(error.message);
    });
  };
  likedMovie = () => {
    const url = "http://localhost:5000/liked-Movie";
    axios
    .post(url)
    .then(response => {
        this.getMovie();
    })
    .catch(error => {
        console.log(error.message);
    });
  };
  

  unlikedMovie = () => {
    const url = "http://localhost:5000/unliked-Movie";
    axios
    .post(url)
    .then(response => {
        this.getMovie();
    })
    .catch(error => {
        console.log(error.message);
    });
  };

  notWatched = () => {
    const url = "http://localhost:5000/did-not-Watched";
    axios
    .post(url)
    .then(response => {
        this.getMovie();
    })
    .catch(error => {
        console.log(error.message);
    });
  };

  render(){
    const{movieDetails} = this.state;
    if(movieDetails.poster_link){
        const{
            poster_link,
            title,
            release_data,
            duration,
            overview,
            rating
        } = movieDetails;

       
        return (
            <View style = {styles.container}>
                <View style = {styles.headerContainer}>
                    <Header 
                    centerComponent = {{
                        Text : "movie Recommended",
                        style : styles.headerTitle
                            
                         }}
                            
                        rightComponent = {{
                            icon : "search", 
                            color : "#fff"
                         }}
                         backgroundColor = {"#d500f9"}
                         containerStyle = {{
                            flex : 1,
                            }}

                      />      
                </View>

                <View style = {styles.subConatiner}>
                    <View style = {styles.subTopContainer}>
                        <Image style = {styles.posterImage}
                            source = {{uri : poster_link}} 
                        />
                       
                    </View>
                    <View style = {styles.subBottomContainer}>
                        <View style = {styles.upperBottomContainer}>
                            <Text style = {styles.title}>{title}</Text>
                            <Text style = {styles.subTitle}>{subTitle}</Text>

                        </View>
                        <View style = {styles.middleBottomContainer}>
                            <View style = {{flex : 0.3}}>
                                <AirbnbRating
                                count = {10}
                                reviews = {["", "", "", ""]}
                                defaultRating = {rating}
                                isDisabled = {True}
                                size = {RFValue(25)}
                                StarcontainerStyle = {{margintop : -30}}
                                />
                            </View>

                            <View style = {{flex : 0.7, padding : 15}}>
                                <Text style = {styles.overview}>{overview}</Text>
                            </View>
                        </View>

                        <View style = {styles.lowerBottomContainer}>
                            <View style = {styles.iconButtonContainer}>

                                
                                <TouchableOpacity onPress = {this.likedMovie}>
                                    <Icon
                                    reverse
                                    name = {"check"}
                                    type = {"entypo"}
                                    size = {RFValue(30)}
                                    color = {"#76ff03"}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress = {this.unlikedMovie}>
                                    <Icon 
                                    reverse
                                    name = {"check"}
                                    type = {"entypo"}
                                    size = {RFValue(30)}
                                    color = {"#ff1744"}/>
                                </TouchableOpacity>
                            </View>

                            <View style = {styles.buttonContainer}>
                                <TouchableOpacity
                                style = {styles.button}
                                onPress = {this.notwatched}>
                                    <Text style = {styles.buttonText}>Did not watch</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
  }
}
