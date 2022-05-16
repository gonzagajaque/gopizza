import React, { useState, useEffect } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert, View } from 'react-native';
import {
    Container,
    DeleteLabel,
    Header,
    Title,
    PickImageButton,
    Upload
} from './styles';
import { ButtonBack } from '../../components/ButtonBack';
import { Photo } from '../../components/Photo';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { InputPrice } from '../../components/InputPrice';

export function Product() {
    const [image, setImage] = useState('');

    async function handlePickerImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });

            if(result.cancelled) {
                setImage(result.uri);
            }
        }
    }

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Header>
                <ButtonBack />
                <Title>Cadastrar</Title>
                <TouchableOpacity>
                    <DeleteLabel>Deletar</DeleteLabel>
                </TouchableOpacity>
            </Header>
            <Upload>
                <Photo uri={image} />
                <PickImageButton
                    title="Carregar"
                    type="secondary"
                    onPress={handlePickerImage}
                />
            </Upload>
            <InputPrice size='P' />
            <InputPrice size='M' />
            <InputPrice size='G' />
        </Container>
    );
}