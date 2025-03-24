import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function DashBoard() {
    const [campaigns, setCampaigns] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        if (isFocused) {
            fetchCampaigns();
        }
    }, [isFocused]);

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get('http://192.168.0.216:8080/api/campaign', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCampaigns(response.data.data);
        } catch (error) {
            console.error('Error al obtener las campañas', error);
        }
    };

    const renderCampaign = ({ item }) => (
        <TouchableOpacity style={styles.campaign} onPress={() => console.log('Donar a:', item.nombre)}>
            <Image source={{ uri: item.image }} style={styles.campaignImage} />
            <Text style={styles.campaignTitle}>{item.nombre}</Text>
            <Text style={styles.campaignDescription}>{item.descripcion}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={campaigns}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCampaign}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text>No hay campañas disponibles.</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#AFCCD0',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    campaign: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        marginBottom: 10,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    campaignTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    campaignDescription: {
        fontSize: 14,
        marginTop: 4,
    },
    campaignImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
});
