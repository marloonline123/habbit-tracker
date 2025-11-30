import { account } from '@/lib/appwrite';
import { AuthContextType, LoginFormData, RegisterFormData, User } from '@/types/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { ID } from 'react-native-appwrite';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a AuthContextProvider');
    }
    return context;
};

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const getUser = async () => {
        setIsLoadingUser(true);
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoadingUser(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const login = async (data: LoginFormData) => {
        try {
            console.log('trylogin');
            
            await account.createEmailPasswordSession(data);
            await getUser();
            return null;
        } catch (error: any) {
            if (error instanceof Error) {
                return error.message;
            }
            return 'There was an error logging in';
        }
    }

    const register = async (data: RegisterFormData) => {
        try {
            await account.create({userId: ID.unique(), ...data});
            await login({email: data.email, password: data.password});
            return null;
        } catch (error: any) {
            if (error instanceof Error) {
                return error.message;
            }
            return 'There was an error registering';
        }
    }

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoadingUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
