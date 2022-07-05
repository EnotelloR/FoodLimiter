import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as StoreManager from "../store/StoreManager"

export const FoodAdder = ({navigation}) => {
    const [name, setName] = useState("");
    const [calories, setCalories] = useState();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();

    async function addNewFood(e) {
        let food = {
            "name": name,
            "calories": calories,
            "description": description,
            "image": image
        }
        await StoreManager.createFood(food);
        navigation.goBack();
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Название блюда</Text>
            <TextInput style={styles.input}
                       value={name}
                       placeholder="Введите название блюда:"
                       onChangeText={name => setName(name)}/>
            <Text>Описание блюда</Text>
            <TextInput style={styles.input}
                       value={description}
                       placeholder="Введите описание блюда:"
                       onChangeText={description => setDescription(description)}/>
            <Text>Калории в блюде</Text>
            <TextInput style={styles.input}
                       value={calories}
                       keyboardType='numeric'
                       placeholder="Введите количество калорий:"
                       onChangeText={calories => setCalories(calories)}/>
            <Text>Фотография блюда (не обязательна)</Text>
            <View style={styles.uploadHandler}>
                <Button color={'#8641f4'} title={"Загрузить изображение"} onPress={pickImage} />
                {image &&
                    <Text>Фотография загружена!</Text>
                }
            </View>
            <View style={styles.buttonHandler}>
                <Button color={'#8641f4'} onPress={addNewFood} title='Создать блюдо'/>
            </View>
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
    input: {
        borderColor: '#8641f4',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        width: 250,
        marginBottom: 20,
        padding: 4,
    },
    buttonHandler: {
        marginBottom: 20,
    },
    uploadHandler:{
        marginBottom: 20,
    },
});

