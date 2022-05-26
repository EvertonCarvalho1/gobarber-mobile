import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from '../../hooks/auth';
import api from "../../services/api";

import {
    Container,
    Header,
    HeaderTitle,
    UserName,
    ProfileButton,
    UserAvatar,
    ProvidersList
} from "./styles";

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
};

const Dashboard: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([]);

    const { signOut, user } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data);
        });
    }, []);

    const navigateToProfile = useCallback(() => {
        navigation.navigate('Profile');
    }, [navigation]);

    const replaceLink = useMemo(() => {
        return user.avatar_url.replace('http://localhost:3333', 'http://192.168.15.89:3333');
    }, [user]);

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo, {'\n'}
                    <UserName>{user.name}</UserName>
                </HeaderTitle>

                <ProfileButton onPress={() => { navigateToProfile }}>
                    <UserAvatar source={{ uri: replaceLink }} />
                </ProfileButton>
            </Header>

            <ProvidersList
                data={providers}
                keyExtractor={(provider) => provider.id}
                renderItem={({ item }) => (
                    <UserName>{item.name}</UserName>
                )}
            />

        </Container>
    )
}

export default Dashboard;