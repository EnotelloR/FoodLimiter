import React, {useEffect, useMemo, useState} from 'react';
import {Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import * as StoreManager from "../store/StoreManager";
import foodIcon from "../assets/foodIcon_black.png";
import {useIsFocused} from "@react-navigation/native";


export const Eated = ({navigation}) => {
    const [eated, setEated] = useState([]);
    const [date, setDate] = useState(new Date());

    const isFocused = useIsFocused();

    useEffect( () => {
        async function getEated(){
            isFocused && await StoreManager.load("@eated").then(eated => setEated(eated));
        }
        getEated();
    },[navigation, isFocused])

    function openFoodItem(food) {
        food["access"] = "eated";
        navigation.navigate("Блюдо", {food: food});
    }

    const filteredEated = useMemo(() => {
        return (eated !== null) ?
            eated.filter(eatedItem => (new Date(eatedItem.date).toDateString() === date.toDateString()))
            :
            [];
    }, [eated, date])

    async function deleteFromEated(eatedItem) {
        await StoreManager.deleteItem("@eated", eatedItem).then(result => setEated(result));
    }

    const showDatepicker = () => {
        showMode('date');
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true
        })
    };

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.datePickerHandler}>
                <Button color={'#8641f4'} onPress={showDatepicker} title="Выбрать другую дату" />
                <Text style={styles.date}>За {date.toLocaleDateString()} вы употребили: </Text>
            </SafeAreaView>
            <ScrollView style={styles.optionsHandler}>
                {filteredEated.map((eatedItem,index) =>
                    <View key={index}>
                        <Pressable onPress={() => openFoodItem(eatedItem.food)} underlayColor="white">
                            <View style={styles.foodBody}>
                                <View style={styles.foodHeader}>
                                    {eatedItem.food.image ?
                                        <Image
                                            style={styles.foodImage}
                                            source={{uri: eatedItem.food.image}}
                                        />
                                        :
                                        <Image
                                            style={styles.foodImage}
                                            source={foodIcon}
                                        />
                                    }
                                    <Text style={styles.foodName}>{eatedItem.food.name}</Text>
                                </View>
                                <Text style={styles.foodCalories}>Количество съеденных калорий: {eatedItem.grams*eatedItem.food.calories/100}</Text>
                                <View>
                                    <Button color={'#8641f4'} title={"Удалить из списка"} onPress={() => deleteFromEated(eatedItem)} />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                )}
            </ScrollView>
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
    datePickerHandler: {
        marginBottom: 60,
    },
    date: {
        fontSize: 22,
        margin: 10,
    },
    foodBody: {
        width: 275,
    },
    foodImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    foodHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    foodName: {
        fontSize: 22,
    },
    foodCalories:{
        fontSize: 14
    },
    optionsHandler: {
        maxHeight: '50%',
    },
    buttonHandler: {
        marginBottom: 20,
    }
});

