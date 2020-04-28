import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Dimensions, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

import yelp from '../api/yelp';

const ResultsShowScreen = (props) => {
    const [result, setResult] = useState(null);
    const id = props.navigation.getParam('id');
    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    };

    useEffect(() => {
        getResult(id);
    }, []);

    if (!result) {
        return null;
    }

    function check(string) {
        var num = (parseInt(string)/100);
        num = num.toFixed(2);
        if(num <= 12) {
            return (num + " AM");
        } else {
            return ((num - 12).toFixed(2) + " PM");
        }
    }

    function checkDay(day) {
        switch(day) {
            case 0:
                return 'Monday';
            case 1:
                return 'Tuesday';
            case 2:
                return 'Wednesday';
            case 3:
                return 'Thursday';
            case 4:
                return 'Friday';
            case 5:
                return 'Saturday';
            case 6:
                return 'Sunday';
        }
    }

    function store(start, end , day) {
        var data = [start, end, day];
        return data;
    }

    function hours(itemList) {
        return <FlatList
                    style={{marginLeft: 10,}} 
                    data={itemList}
                    keyExtractor={(item) => (item.day).toString()}
                    renderItem={({item}) => {
                        var start = check(item.start);
                        var end = check(item.end);
                        var day = checkDay(item.day);
                        return (
                            <Text>{day}: {start} to {end}</Text>
                        );
                    }}
                />
    }

    return(
        <>
            <Text style={styles.textStyle}>{result.name}</Text>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={result.photos}
              renderItem={({item}) => {
                return(
                    <Image 
                        style={styles.imageStyle}
                        source={{uri: item}}
                    />
                );
              }}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
            {result.hours[0].is_open_now ? <Text style={styles.textStyleThree}>Open</Text> : <Text style={styles.textStyleTwo}>Closed</Text>}
            <ScrollView style={styles.container}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Address: </Text>
                <Text style={{fontSize: 16, marginLeft: 10}}>
                    {result.location.display_address[0]}, {result.location.display_address[1]}, {result.location.display_address[2] ? result.location.display_address[2]: null}
                    {result.location.display_address[3] ? result.location.display_address[3]: null}
                </Text>
                <Text style={{fontSize: 16, marginLeft: 10}}>{result.display_phone}</Text>

                <Text style={{fontSize: 18, marginTop: 20, fontWeight: 'bold'}}>Hours: </Text>
                {hours(result.hours[0].open)}

                <Text style={{fontSize: 18, marginTop: 20, fontWeight: 'bold'}}>Categories: </Text>
                <FlatList 
                    data={result.categories}
                    keyExtractor={(item) => item.title}
                    renderItem={({item}) => {
                        return (
                            <Text style={{fontSize: 16, marginLeft: 10}}>{`\u2022 ${item.title}`}</Text>
                        );
                    }}
                />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
        alignSelf: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    textStyleTwo: {
        color: 'red',
        alignSelf: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    textStyleThree: {
        color: 'green',
        alignSelf: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    imageStyle: {
        width: 300,
        height: 200,
    },  
    container: {
        marginLeft: 15,
        marginVertical: 5,
    },
});

export default ResultsShowScreen;