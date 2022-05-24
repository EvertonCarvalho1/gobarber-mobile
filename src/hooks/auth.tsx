import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
    id: string;
    avatar_url: string;
    name: string;
    email: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<void>; //quando transformamos o metodo em async, ele retorna um Promise<void>
    signOut(): void;
    updateUser(user: User): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

    const [data, setData] = useState<AuthState>({} as AuthState);

    useEffect(() => {

        async function loadStorageData(): Promise<void> {
            const token = await AsyncStorage.getItem('@GoBarber:token');
            const user = await AsyncStorage.getItem('@GoBarber:user');

            if (token && user) {
                setData({ token: token, user: JSON.parse(user) })
            }
        }
        loadStorageData()
    }, [])

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        })

        const { token, user } = response.data;

        await AsyncStorage.setItem('@GoBarber:token', token);
        await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

        //api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.removeItem('@GoBarber:token');
        await AsyncStorage.removeItem('@GoBarber:user');

        setData({} as AuthState);
    }, [])

    const updateUser = useCallback(async (user: User) => {
        await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))

        setData({
            token: data.token,
            user: user,
        });
    }, [setData, data.token]);

    //children => tudo que este componente receber como filho, vamos repassar depois pra algum lugar dentro do componente
    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
            {/* passamos o children pra que todos os filhos do AuthProvider sejam repassados como filhos do AuthContext.Provider */}
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context
}

export { AuthProvider, useAuth };

//Para cada contexto teremos um Hook




