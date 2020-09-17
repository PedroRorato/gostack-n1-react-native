import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get('tasks').then(response => {
            setTasks(response.data);
        });
    }, []);

    const handleAddTask = async () => {
        
        const response = await api.post('/tasks', { title: 'Novo Projeto' });

        const newTask = response.data;
        setTasks([...tasks, newTask ]);

    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={tasks}
                    keyExtractor={task => task.id}
                    renderItem={({ item }) => (
                        <Text style={styles.task}>{item.title}</Text>
                    )}
                />

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleAddTask}
                >
                    <Text style={styles.buttonText}>Adicionar Projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',


    },
    task: {
        color: '#fff',
        fontSize: 30,
    },
    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});