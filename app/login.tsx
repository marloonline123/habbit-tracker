import { useAuthContext } from '@/context/AuthProvider';
import { LoginFormData } from '@/types/auth';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

const Login = () => {
    const { login } = useAuthContext();
    const router = useRouter();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (formData.email === '' || formData.password === '') {
            setError('All fields are required');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await login(formData);
            if (response) {
                setError(response);
                return;
            }
            router.replace("/(tabs)/habits");
        } catch (error: any) {
            console.log(error);

            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        >
            <View style={styles.content}>
                <Text variant='headlineLarge' style={styles.title}>Welcome Back!</Text>

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
                    <Button disabled={isLoading} onPress={handleLogin} mode="contained">
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                    <Button>
                        <Link href="/register">Don&apos;t have an account? Sign Up</Link>
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
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
        height: 50,
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: 'column',
        gap: 10,
    },
});

export default Login;
