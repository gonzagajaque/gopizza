import React, { useState, useCallback } from 'react';
import {
    Container,
    Header,
    Greeting,
    GreetingEmoji,
    GreetingText,
    MenuHeader,
    MenuItemsNumber,
    Title,
    NewProductButton
} from './styles';
import happyEmoji from '../../../src/assets/happy.png';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { TouchableOpacity, Alert, FlatList } from 'react-native';
import { Search } from '../../components/Search';
import { ProductCard, ProductProps } from '../../components/ProductCard';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export function Home() {
    const [pizzas, setPizzas] = useState<ProductProps[]>([]);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState('');

    const { COLORS } = useTheme();
    const navigation = useNavigation();

    function fetchPizzas(value: string) {
        const formattedValue = value.toLowerCase().trim();
        firestore()
            .collection('pizzas')
            .orderBy('name_insensitive')
            .startAt(formattedValue)
            .endAt(`${formattedValue}\uf8ff`)
            .get()
            .then(response => {
                const data = response.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                }) as ProductProps[];

                setPizzas(data);
            })
            .catch(() => Alert.alert('Erro ao buscar pizzas'));
    }

    function handleSearch() {
        fetchPizzas(search);
    }

    function handleSearchClear() {
        setSearch('');
        fetchPizzas('');
    }

    function handleOpen(id: string) {
        navigation.navigate('product', { id });
    }

    function handleAdd() {
        //@ts-ignore
        navigation.navigate('product', {});
    }


    useFocusEffect(
        useCallback(() => {
            fetchPizzas('');
        }, [])
    );

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
            <Search
                onChangeText={setSearch}
                value={search}
                onSearch={handleSearch}
                onClear={handleSearchClear} />
            <MenuHeader>
                <Title>Cardápio</Title>
                <MenuItemsNumber>{pizzas.length}</MenuItemsNumber>
            </MenuHeader>
            <FlatList
                data={pizzas}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductCard
                        data={item}
                        onPress={() => handleOpen(item.id)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24
                }}
            />
            <NewProductButton
                title='Cadastrar Pizza'
                type='secondary'
                onPress={handleAdd}
            />
        </Container>
    );
}