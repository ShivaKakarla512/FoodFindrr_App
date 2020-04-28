import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {

    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('Dallas');
    const [searchApi, results, errorMessage] = useResults();

    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price;
        });
    };

    return(
        // <View style={{flex: 1}}>
        <>
            <SearchBar 
                term={term} 
                location={location}
                onLocationChange={setLocation}
                onTermChange={setTerm} 
                onTermSubmit={() => searchApi(term, location)}
                // onTermChange={newTerm => setTerm(newTerm)} 
                // onTermSubmit={() => searchApi()}
            />
            {errorMessage ? alert(errorMessage) : null}
            {/* <Text>We have found {results.length} results</Text> */}
            <ScrollView>
                <ResultsList 
                    results={filterResultsByPrice('$')} 
                    title="Cost Effective" 
                    // navigation={props.navigation}
                />
                <ResultsList 
                    results={filterResultsByPrice('$$')} 
                    title="Bit Pricier" 
                    // navigation={props.navigation}
                />
                <ResultsList 
                    results={filterResultsByPrice('$$$')} 
                    title="Big Spender" 
                    // navigation={props.navigation}
                />
                <ResultsList 
                    results={filterResultsByPrice('$$$$')} 
                    title="Rolling in Dough" 
                    // navigation={props.navigation}
                />
            </ScrollView>
        </>
        // </View>
    );
};

const styles = StyleSheet.create({});

SearchScreen.navigationOptions = {
    title: 'Restaurant Search',
};

export default SearchScreen;