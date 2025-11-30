import { useAuthContext } from '@/context/AuthProvider'
import { DATABASE_ID, HABBITS_COLLECTION_ID, tableDb } from '@/lib/appwrite'
import { HabitForm } from '@/types/habits'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { ID } from 'react-native-appwrite'
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const emptyState = {
    name: '',
    description: '',
    frequency: 'daily'
}

const AddHabit = () => {
    const { user } = useAuthContext();
    const router = useRouter();
    const [data, setData] = useState<HabitForm>(emptyState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleSubmit = async () => {        
        if (isLoading) return;

        if (!user) {
            setError('You are not Authenticated');
            return router.replace('/login');
        }

        if (!data.name || !data.frequency || data.name.length < 5 || data.frequency.length < 3) {
            setError('Name & Frequency fields are required and must not be less than 5 charchters');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await tableDb.createRow(
                DATABASE_ID,
                HABBITS_COLLECTION_ID,
                ID.unique(),
                {user_id: user?.$id, ...data}
            );

            console.log('response: ', response);
            
            if (response) {
                setSuccess('Your Habbit have been added successfully');
                setData(emptyState);
            }
        } catch (error: any) {
            if (error instanceof Error) {
                setError(error.message);
                return;
            }
            return 'There was an error adding the habit';
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        }
    }, [success])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.container}>
                    <Text variant='headlineLarge' style={styles.name}>!Add New Habit</Text>

                    { success && <Text variant='bodyLarge' style={{ textAlign: 'center', color: 'green' }}>{success}</Text>}
                    <View style={styles.formContainer}>
                        <TextInput
                            label='Name'
                            mode='outlined'
                            placeholder='10 Minutes Workout'
                            value={data.name}
                            onChangeText={(text) => setData((prev) => ({...prev, name: text}))}
                        />
                        <TextInput
                            label='Description'
                            mode='outlined'
                            placeholder='workout for 10 minutes every morning'
                            value={data.description}
                            onChangeText={(text) => setData((prev) => ({...prev, description: text}))}
                        />

                        <SegmentedButtons
                            value={data.frequency}
                            onValueChange={(value) => setData((prev) => ({...prev, frequency: value}))}
                            buttons={[
                                { value: 'daily', label: 'Daily' },
                                { value: 'weekly', label: 'Weekly' },
                                { value: 'monthly', label: 'Monthly' },
                            ]}
                        />
                        
                        {error && <Text style={{ color: 'red' }}>{error}</Text>}

                        <Button style={{ marginTop: 20 }} mode='contained' onPress={handleSubmit} loading={isLoading}>Submit</Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    name: {
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    formContainer: {
        gap: 10
    }
})

export default AddHabit