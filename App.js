import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Food} from "./modules/Food";
import {FoodItem} from "./modules/FoodItem";
import {Eated} from "./modules/Eated";
import {FoodAdder} from "./modules/FoodAdder";
import Registration from './modules/Registration';
import Menu from './modules/Menu';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Меню"
              component={Menu}
          />
          <Stack.Screen
              name="Регистрация"
              component={Registration}
          />
          <Stack.Screen
              name="Еда"
              component={Food}
          />
          <Stack.Screen
              name="Блюдо"
              component={FoodItem}
          />
          <Stack.Screen
              name="Добавить блюдо"
              component={FoodAdder}
          />
          <Stack.Screen
              name="Список съеденного"
              component={Eated}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
