import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "./src/screen/ chat";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screen/listChat";
import { ChatProvider } from "./src/context/chatContext";
import MyTab from "./src/screen/home";
import Login from "./src/screen/login";

export type RootStackParamList = {
  login: undefined;
  home: undefined;
  chatScreen: { name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="home" component={MyTab} />
      <Stack.Screen
        name="chatScreen"
        component={ChatScreen}
        options={({ route }) => ({ title: route.params?.name })}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <ChatProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </ChatProvider>
  );
};

export default App;
