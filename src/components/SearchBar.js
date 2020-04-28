import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import { Feather } from '@expo/vector-icons';

const SearchBar = (props) => {
    return(
        <View style={styles.backgroundStyle}>
            <TextInput
                // autoCapitalize={false}
                autoCorrect={false}
                style={styles.inputStyle} 
                placeholder="Keyword" 
                value={props.term}
                onChangeText={props.onTermChange}
                // onEndEditing={props.onTermSubmit}
                // onChangeText={newTerm => props.onTermChange(newTerm)}
                // onEndEditing={() => props.onTermSubmit()}
            />
            <TextInput 
                autoCorrect={false}
                placeholder="Location"
                style={styles.inputStyleTwo}
                value={props.location}
                onChangeText={props.onLocationChange}
            />
            <TouchableOpacity onPress={Keyboard.dismiss} onPressIn={props.onTermSubmit}>
                <Feather name="search" style={styles.iconStyle} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        // backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        marginBottom: 10,
    },
    inputStyle: {
        fontSize: 18,
        marginHorizontal: 5,
        flex: 1,
    },
    inputStyleTwo: {
        fontSize: 18,
        marginLeft: 5,
        flex: 1,
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15,
    },
});

export default SearchBar;