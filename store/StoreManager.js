import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUser = async (user) => {
    try {
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
        console.log(e);
    }
}

export const createFood = async (food) => {
    try {
        const jsonArr = await AsyncStorage.getItem('@food')
        let parsedArr = JSON.parse(jsonArr);
        if(parsedArr !== null){
            food["ID"]=parsedArr.length;
            parsedArr.push(food)
            await AsyncStorage.setItem('@food', JSON.stringify(parsedArr))
        }
        else{
            food["ID"]=0
            let tempArr = []
            tempArr.push(food)
            await AsyncStorage.setItem('@food', JSON.stringify(tempArr));
        }
    } catch (e) {
        console.log(e);
    }
}

export const createEated = async (eated) => {
    try {
        const jsonArr = await AsyncStorage.getItem('@eated')
        let parsedArr = JSON.parse(jsonArr);
        if(parsedArr !== null){
            eated["ID"]=parsedArr.length;
            parsedArr.push(eated)
            await AsyncStorage.setItem('@eated', JSON.stringify(parsedArr))
        }
        else{
            eated["ID"]=0
            let tempArr = []
            tempArr.push(eated)
            await AsyncStorage.setItem('@eated', JSON.stringify(tempArr));
        }
    } catch (e) {
        console.log(e);
    }
}

// @user, @food, @eated
export const load = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
}

// @user, @food, @eated
export const update = async (key, newObject) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        let tempArr = JSON.parse(jsonValue)[newObject.ID] = newObject;
        await AsyncStorage.setItem(key, JSON.stringify(tempArr))
        return tempArr;
    } catch(e) {
        console.log(e);
    }
}
// @user, @food, @eated && object with ID
export const deleteItem = async (key, object) => {
    try {
        let tempArr = await load(key);
        tempArr = tempArr.filter(item => item.ID !== object.ID)
        await AsyncStorage.setItem(key, JSON.stringify(tempArr))
        return tempArr;
    } catch(e) {
        console.log(e);
    }
}