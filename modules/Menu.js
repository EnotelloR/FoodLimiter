import React, {useEffect, useMemo, useState} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as StoreManager from "../store/StoreManager"
import { ProgressCircle } from 'react-native-svg-charts'
import {useIsFocused} from "@react-navigation/native";


export default function Menu({navigation})  {
    const [user, setUser] = useState(null);
    const [eated, setEated] = useState(null);

    const isFocused = useIsFocused();

    function loadFood() {
        navigation.navigate('Еда')
    }

    function loadEated() {
        navigation.navigate('Список съеденного')
    }

    useEffect( () => {
        async function downloadData(){
            if(isFocused) {
                await StoreManager.load("@user").then(async (user) => {
                    await setUser(user);
                    await StoreManager.load("@eated").then(eated => setEated(eated));
                    !(user !== null) && navigation.navigate("Регистрация")

                })
            }
        }
        downloadData();
    },[navigation, isFocused])

    const todayCalories = useMemo(() => {
        let todayCalories = 0;
        if(eated !== null && user !== null) {
            eated.filter(eatedItem => (new Date(eatedItem.date).toDateString() === new Date().toDateString()))
                .map(eatedItem => todayCalories += (eatedItem.grams / 100 * eatedItem.food.calories))
            return todayCalories;
        }
        else{
            return 0;
        }
    }, [user, eated])

    const todayProgress = useMemo(() => {
        return (eated !== null && user !== null) ?
            (todayCalories/user.calories).toFixed(2)
            :
            0.0;
    }, [user, eated])

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                {typeof todayProgress === "string" &&
                    <ProgressCircle style={{ height: 120, width: 100 }} progress={Number(todayProgress)} progressColor={'rgb(134, 65, 244)'} />
                }
                <Text>Вы употребили {todayCalories} калорий из {user !== null && user.calories} положеных! </Text>
            </View>
            <View style={styles.buttonHandler}>
                <Button color={"#8641f4"} title={"Список еды"} onPress={loadFood}/>
            </View>
            <View style={styles.buttonHandler}>
                <Button color={"#8641f4"} title={"Список съеденного"} onPress={loadEated}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: '30px',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonHandler: {
        marginBottom: 40,
    },
    chartContainer: {
        marginBottom: 40,
        alignItems: 'center',
    }
});
