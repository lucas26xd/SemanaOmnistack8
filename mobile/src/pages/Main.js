import React, {useEffect, useState} from 'react'
import AsyncStorage from 'react-native-community/async-storage'
import {SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

import api from '../services/api'

import logo from '../assets/logo.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'

export default function Main({navigation}) {
    const id = navigation.getParam('user')
    const [users, setUsers] = useState([]) // Usado para setar no vetor de users retornados

    useEffect(() => {
        async function loadUser() { // Requisita ao backend a listagem dos outros devs
            const response = await api.get('/devs', {
                headers: {
                    user: id // Passando o id do dev que está pesquisando
                }
            })
            setUsers(response.data) // Ao setar no array os devs retornados, o React já renderiza novamente todos os componentes
        }

        loadUser()
    }, [id]) // O useEffect é executado sempre que o 'id' (neste caso) for alterado

    async function handleLike() { // Requisição de like do dev atual em outro ao backend
        const [user, ...rest] = users //Pega primeira posição do array e o restante do array
        await api.post(`/devs/${user._id}/likes`, null, {
            headers: {user: id}
        })

        setUsers(rest) // Retira o dev com like da tela
    }

    async function handleDislike() { // Requisição de dislike do dev atual em outro ao backend
        const [user, ...rest] = users //Pega primeira posição do array e o restante do array
        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: {user: id}
        })

        setUsers(rest) // Retira o dev com dislike da tela
    }

    async function handleLogout() {
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            <View style={styles.cardsContainer}>
                {users.length === 0 ? 
                    <Text style={styles.empty}>Acabou :(</Text> : 
                    (users.map((user, index) => {
                        <View style={[styles.card, {zIndex: users.length - index}]}>
                            <Image style={styles.avatar} source={{uri: user.avatar}}/>
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                            </View>
                        </View>
                        })
                    )
                }
            </View>

            {users.length > 0 && ( //o && é como se fosse um ternário, mas só com a parte verdadeira
                <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDislike}>
                    <Image source={dislike} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLike}>
                    <Image source={like} />
                </TouchableOpacity>
            </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    
    logo: {
        marginTop: 30,
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },

    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    avatar: {
        flex: 1,
        height: 300,
    },

    footer: {
        backgroundColor:  '#FFF',
        paddingHorizontal:20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    }
})