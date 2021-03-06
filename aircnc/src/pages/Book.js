import React, { useState } from 'react';
import { Alert, Text, SafeAreaView, StyleSheet, Platform, AsyncStorage, TextInput, TouchableOpacity } from 'react-native'

import api from '../services/api'

export default function Book({ navigation }) {
    const id = navigation.getParam('id');

    const [date, setDate] = useState('');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user')

        const response = await api.post(`/spots/${id}/bookings`,{
            date
        }, {
            headers: { user_id }
        })

        console.log(response)

        Alert.alert('Solicitação de reserva enviada')

        navigation.navigate('List')
    }


    function handleCancel() {
        navigation.navigate('List')
    }

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar ?"
                placeholderTextColor="#999"
                autoCapitalize='words'
                autoCorrect={false}
                value={date}
                onChangeText={date => setDate(date)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        margin: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    cancelButton: {
        height: 42,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10,
    },

    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})