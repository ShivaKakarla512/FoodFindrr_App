import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

import ResultsDetail from '../components/ResultsDetail';

const ResultsList = (props) => {
    if(props.results.length == 0) {
        return null;
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{props.title}</Text>
            <FlatList 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={props.results}
                keyExtractor={(result) => result.id}
                renderItem={({ item }) => {
                    return(
                        <TouchableOpacity onPress={() => props.navigation.navigate('ResultsShow', {id: item.id, name: item.name})}>
                            <ResultsDetail result={item} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    container: {
        marginBottom: 10,
    },
});

export default withNavigation(ResultsList);