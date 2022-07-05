import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image} from 'react-native';
import foodIcon from '../assets/foodIcon_black.png';
import * as StoreManager from "../store/StoreManager"

export const FoodItem = ({route, navigation}) => {

    const [grams, setGrams] = useState(100);
    const {food} = route.params;

    async function deleteFood() {
        await StoreManager.deleteItem("@food", food)
        navigation.goBack();
    }

    async function addEated() {
        let eated = {
            "food": food,
            "grams": grams,
            "date": new Date()
        }
        await StoreManager.createEated(eated)
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.foodHeader}>
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
                <Text style={styles.foodName}>{food.name}</Text>
            </View>
            <Text style={styles.foodDescription}>Описание: {food.description}</Text>
            {food.access !== "eated" ?
                <View>
                    <Text>Количество грамм: </Text>
                    <TextInput style={styles.inputOption}
                               value={grams.toString()}
                               keyboardType='numeric'
                               placeholder="Введите количество грамм: "
                               onChangeText={grams => setGrams(Number(grams))}/>
                </View>
                :
                <View>
                    <Text style={styles.foodDescription}>Количество калорий на 100 грамм: {food.calories}</Text>
                </View>
            }
            {food.access !== "eated" &&
                <View>
                    <View style={styles.buttonHandler}>
                        <Button color={'#8641f4'} onPress={addEated} title='Добавить в список съеденного'/>
                    </View>
                    <View style={styles.buttonHandler}>
                        <Button color={'#8641f4'} onPress={deleteFood} title='Удалить блюдо'/>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    foodImage: {
        width: 200,
        height: 200,
        borderRadius: 5,
        margin: 5,
    },
    foodHeader: {
        display: "flex",
        alignItems: "center",
    },
    foodName: {
        fontSize: 22,
        marginBottom: 20,
    },
    foodDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    inputOption: {
        borderColor: '#8641f4',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        width: 200,
        marginBottom: 20,
        padding: 4,
    },
    buttonHandler: {
        marginBottom: 20,
    }
});