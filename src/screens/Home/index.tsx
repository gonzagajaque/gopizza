import React from 'react';
import { Container, Header, Greeting, GreetingEmoji, GreetingText, MenuHeader, MenuItemsNumber, Title } from './styles';
import happyEmoji from '../../../src/assets/happy.png';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Search } from '../../components/Search';

export function Home() {
    const { COLORS } = useTheme();

    return (
        <Container>
            <Header>
                <Greeting>
                    <GreetingEmoji source={happyEmoji} />
                    <GreetingText>Ola, Admin</GreetingText>
                </Greeting>
                <TouchableOpacity>
                    <MaterialIcons name="logout" size={24} color={COLORS.TITLE} />
                </TouchableOpacity>
            </Header>
            <Search onSearch={() => { }} onClear={() => { }} />
            <MenuHeader>
                <Title>Cardápio</Title>
                <MenuItemsNumber>10 pizzas</MenuItemsNumber>
            </MenuHeader>

        </Container>
    );
}