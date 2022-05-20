import React, { useRef } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    View,
    ScrollView,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';
import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    return (

        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                enabled
            >

                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <Container >
                        <Image source={logoImg} />

                        <View>
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={(data) => { console.log(data) }}>
                            <Input
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                autoCapitalize="words"
                                returnKeyType='next'
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus()
                                }}
                            />

                            <Input
                                ref={emailInputRef}
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCorrect={false}
                                returnKeyType='next'
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                            />

                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => formRef.current?.submitForm()}
                            />

                            <Button onPress={() => formRef.current?.submitForm()}>
                                Cadastrar
                            </Button>
                        </Form>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSignIn onPress={() => { navigation.goBack() }}>
                <Icon name='arrow-left' size={20} color='#FFF' />
                <BackToSignInText>
                    Voltar para login
                </BackToSignInText>
            </BackToSignIn>
        </>
    )
}

export default SignUp;