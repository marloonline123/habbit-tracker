import { Account, Client, TablesDB } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
export const HABBITS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_HABBITS_COLLECTION_ID!;

export const tableDb = new TablesDB(client);