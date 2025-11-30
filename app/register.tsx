import { useAuthContext } from '@/context/AuthProvider';
import { RegisterFormData } from '@/types/auth';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

const Register = () => {
    const { register } = useAuthContext();
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (formData.name === '' || formData.email === '' || formData.password === '') {
            setError('All fields are required');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await register(formData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                <Text variant='headlineLarge' style={styles.title}>Create an account</Text>

                <TextInput
                    label="Name"
                    mode="outlined"
                    placeholder="John Doe"
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                <TextInput
                    label="Email"
                    mode="outlined"
                    placeholder="example@gmail.com"
                    autoCapitalize='none'
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    placeholder="••••••••"
                    autoCapitalize='none'
                    secureTextEntry
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                />

                {error && <Text style={{ color: 'red' }}>{error}</Text>}

                <View style={styles.buttonsContainer}>
                    <Button disabled={isLoading} onPress={handleRegister} mode="contained">
                        {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                    <Button>
                        <Link href="/login">Already have an account? Login</Link>
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    content: {
        padding: 20,
        width: '90%', // ✅ prevent full width stretching
        alignSelf: 'center',
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
        height: 50, // ✅ ensures consistent height
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: 'column',
        gap: 10,
    },
});

export default Register;
