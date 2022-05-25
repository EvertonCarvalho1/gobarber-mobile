import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar } from "./styles";

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();

    const navigation = useNavigation();

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
        </Container>  
    )
}

export default Dashboard;