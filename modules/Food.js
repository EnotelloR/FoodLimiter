import React, {useState, useEffect, useMemo} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ScrollView,
    Image,
    Pressable,
} from 'react-native';
import foodIcon from '../assets/foodIcon.png';
import * as StoreManager from "../store/StoreManager"
import {useIsFocused} from "@react-navigation/native";



export const Food = ({navigation}) => {
    const [searchValue, setSearchValue] = useState("");
    const [foods, setFoods] = useState(null);

    const isFocused = useIsFocused();

    useEffect( () => {
        async function getFoods(){
            isFocused && await StoreManager.load("@food").then(foods => setFoods(foods));
        }
        getFoods();
    },[navigation, isFocused])

    function addNewFood() {
        navigation.navigate('Добавить блюдо')
    }

    const filteredArray = useMemo(() => {
        return (foods !== null) ?
            foods.filter(food => (searchValue === "" || food.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1))
        :
            [];
    }, [foods, searchValue])

    function openFoodItem(food){
        navigation.navigate("Блюдо", {food: food});
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchHandler}>
                <TextInput style={styles.input}
                           value={searchValue}
                           placeholder="Поиск"
                           onChangeText={searchValue => setSearchValue(searchValue)}/>
            </View>
            <Text>Выберите еду для внесения в список: </Text>
            <ScrollView style={styles.foodsHandler}>
                {filteredArray.map((food,index) =>
                    <View style={styles.foodBody} key={index}>
                        <Pressable onPress={() => openFoodItem(food)} underlayColor="white">
                            <View>
                                <View style={styles.foodHeader}>
                                    <View style={styles.imageHandler}>
                                        {food.image ?
                                            <Image
                                                style={styles.foodImage}
                                                source={{uri: food.image}}
                                            />
                                            :
                                            <Image
                                                style={styles.foodImage}
                                                source={foodIcon}
                                            />
                                        }
                                    </View>
                                    <Text style={styles.foodName}>{food.name}</Text>
                                </View>
                                <Text style={styles.foodCalories}>Калории на 100 грамм: {food.calories}</Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            </ScrollView>
            <View style={styles.buttonHandler}>
                <Button color={'#8641f4'} onPress={addNewFood} title='Добавить новое блюдо'/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#8641f4',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        width: 250,
        marginBottom: 20,
        padding: 4,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchHandler: {
        marginBottom: 40,
    },
    foodsHandler: {
        maxHeight: '50%',
    },
    foodBody: {
        backgroundColor: '#8641f4',
        borderRadius: 12,
        margin: 10,
        padding: 5,
        width: 250,
    },
    imageHandler: {
        borderStyle: "solid",
        borderRadius: 5,
        borderColor: "white",
        borderWidth: 1,
        margin: 5,
    },
    foodImage: {
        width: 60,
        height: 60,
    },
    foodHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    foodName: {
        fontSize: 22,
        color: '#fff',
    },
    foodCalories:{
        color: "white",
        fontSize: 16
    },
    buttonHandler: {
        marginBottom: 20,
    }
});

