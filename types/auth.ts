import { Models } from 'react-native-appwrite';

export type User = Models.User<Models.Preferences>;
export type LoginFormData = {
    email: string;
    password: string;
}

export type RegisterFormData = {
    name: string;
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    isLoadingUser: boolean;
    login: (data: LoginFormData) => Promise<string|null>;
    register: (data: RegisterFormData) => Promise<string|null>;
    logout: () => Promise<void>;
}