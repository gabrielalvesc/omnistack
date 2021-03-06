import React, { useState, useEffect } from 'react';
import { Text, AsyncStorage, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../../assets/logo.png'

export default function List({ navigation }) {

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray)
        })
    }, [])

    function logout() {
        AsyncStorage.clear()
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView >
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>


            {/* <TouchableOpacity onPress={logout}>
                <Text>Sair</Text>
            </TouchableOpacity> */}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    }
})