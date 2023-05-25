import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Button, Card, TextInput } from "react-native-paper";
import { SocketProvider } from "../context/chatContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "login">;

export default function Login(props: Props) {
  const { username, setUsername } = React.useContext(SocketProvider);
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  function submit() {
    axios
      .post(`http://10.5.0.7:5000/login`, { username, password })
      .then((e) => {
        if (e.status === 200) props.navigation.replace("home");
        else setError("email or password incorrect");
      })
      .catch((err) => setError("email or password incorrect"));
  }

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: Dimensions.get("screen").width - 50,
          alignItems: "center",
        }}
      >
        <Card.Title title="Login Page" />
        <TextInput
          mode="outlined"
          placeholder="username"
          activeOutlineColor="grey"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholderTextColor="grey"
          style={{ borderRadius: 20, marginBottom: 10 }}
          value={username}
          onChangeText={(text) => {
            setError("");
            setUsername(text);
          }}
        />
        <TextInput
          mode="outlined"
          secureTextEntry={true}
          placeholder="password"
          activeOutlineColor="grey"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholderTextColor="grey"
          style={{ borderRadius: 20 }}
          value={password}
          onChangeText={(text) => {
            setError("");
            setPassword(text);
          }}
        />
        <Text style={{ color: "red", paddingTop: 5 }}>{error}</Text>
        <Button style={{ marginVertical: 20 }} onPress={submit}>
          <Text style={{ fontSize: 18 }}>Login</Text>
        </Button>
      </Card>
    </View>
  );
}
