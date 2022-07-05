import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput, Alert} from 'react-native';
import * as StoreManager from "../store/StoreManager"
import {Picker} from "@react-native-picker/picker";

export default function Registration({navigation}) {

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [gender, setGender] = useState("f");
    const [lifestyle, setLifestyle] = useState(1.2);


    const calories = useMemo(() => {
        return gender === "f" ?
            ((447.6+9.2*weight+3.1*height-4.3*age)*lifestyle).toFixed(1)
            :
            ((88.36+13.4*weight+4.8*height-5.7*age)*lifestyle).toFixed(1)
    }, [weight, height, age, lifestyle, gender])

    const createUserHandler = useCallback(async () => {
        let user = {
            "name": name,
            "calories": calories
        }
        await StoreManager.createUser(user);
        Alert.alert(
            "Вы прошли регистрацию",
            `По нашим подчётам вам необходимо употреблять ежедневно ${calories} калорий`,
            [
                { text: "OK", onPress: () => navigation.navigate('Меню') }
            ]
        );
    }, [calories, name, navigation])

    return (
        <View style={styles.container}>
            <Text>Введите своё имя:</Text>
            <TextInput style={styles.input}
                       value={name}
                       placeholder="Введите имя"
                       onChangeText={name => setName(name)}/>
            <Text>Выберите свой пол:</Text>
            <View style={styles.pickerHandler}>
                <Picker
                    selectedValue={gender}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                    <Picker.Item label="Мужской" value="m" />
                    <Picker.Item label="Женский" value="f" />
                </Picker>
            </View>
            <Text>Введите свой возраст:</Text>
            <TextInput style={styles.input}
                       value={age.toString()}
                       keyboardType='numeric'
                       placeholder="Введите возраст"
                       onChangeText={age => setAge(Number (age))}/>
            <Text>Введите свой рост:</Text>
            <TextInput style={styles.input}
                       value={height.toString()}
                       keyboardType='numeric'
                       placeholder="Введите рост в см."
                       onChangeText={height => setHeight(Number (height))}/>
            <Text>Введите свой вес:</Text>
            <TextInput style={styles.input}
                       value={weight.toString()}
                       keyboardType='numeric'
                       placeholder="Введите вес в кг."
                       onChangeText={weight => setWeight(Number (weight))}/>
            <Text>Выберите примерный образ жизни:</Text>
            <View style={styles.pickerHandler}>
                <Picker
                    selectedValue={lifestyle}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => setLifestyle(itemValue)}
                >
                    <Picker.Item label="Сидячий образ жизни без нагрузок" value="1.2" />
                    <Picker.Item label="Тренировки 1-3 раза в неделю" value="1.375" />
                    <Picker.Item label="Занятия 3-5 дней в неделю" value="1.55" />
                    <Picker.Item label="Интенсивные тренировки 6-7 раз в неделю" value="1.725" />
                    <Picker.Item label="Спортсмены, выполняющие упражнения чаще, чем раз в день"  value="1.9" />
                </Picker>
            </View>
            <View style={styles.buttonHandler}>
                <Button color={"#8641f4"} onPress={createUserHandler} title='Определить норму калорий.'/>
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
    input: {
        borderColor: '#8641f4',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        width: 250,
        marginBottom: 20,
        padding: 4,
    },
    pickerHandler: {
        borderColor: '#8641f4',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        height: 60,
        marginBottom: 20,
    },
    buttonHandler: {
        marginBottom: 40,
    }
});
