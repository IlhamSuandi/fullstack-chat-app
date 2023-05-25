import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import PlusIcon from "react-native-vector-icons/FontAwesome";
// import { chat } from "./ chat";
import { useIsFocused } from "@react-navigation/native";
import { SocketProvider, socket } from "../context/chatContext";
import axios, { all } from "axios";

const data: { username: string }[] = [
  //   { username: "ilham" },
  //   { username: "suandi" },
  //   { username: "ardi" },
  //   { username: "winata" },
  //   { username: "maysa" },
];

type Props = NativeStackScreenProps<RootStackParamList, "home">;

function UserMessages({
  props,
  item,
  lastChat,
  chat,
}: {
  props: Props;
  item: { username: string };
  lastChat: string;
  chat: any;
}) {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        marginVertical: 4,
        justifyContent: "center",
      }}
      onPress={() => {
        props.navigation.navigate("chatScreen", { name: item.username });
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Avatar.Image size={40} source={require("../assets/profile.png")} />
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>{item.username}</Text>
          <Text numberOfLines={1} style={{ fontSize: 12, maxWidth: "40ch" }}>
            {lastChat}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 12,
            paddingRight: 10,
            position: "absolute",
            right: 10,
          }}
        >
          {chat.length !== 0
            ? new Date(chat[chat.length - 1]?.date).toLocaleTimeString()
            : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Home(props: Props) {
  const [lastChat, setLastChat] = React.useState("");
  const { chat, setChat, username } = React.useContext(SocketProvider);
  const [allUsers, setAllUsers] = React.useState<{ username: string }[]>([]);

  React.useEffect(() => {
    axios.post(`http://10.5.0.7:5000/users`, { username }).then((response) => {
      setAllUsers(response.data.users);
    });

    socket.on("chat-message", (data) => {
      setLastChat(data.message);
      setChat((prev: any) => [...prev, data]);
      console.log(data);
    });
  }, [socket]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <FlatList
          data={allUsers}
          renderItem={({ item }) => {
            return (
              <UserMessages
                props={props}
                item={item}
                lastChat={lastChat}
                chat={chat}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      <Button
        style={{
          maxWidth: 60,
          maxHeight: 60,
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          backgroundColor: "grey",
          borderRadius: 50,
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        <PlusIcon name="plus" color="white" size={20} />
      </Button>
    </View>
  );
}
