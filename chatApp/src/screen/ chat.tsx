import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ChatInput from "../component/chatInput";
import ChatBubble from "../component/chatBubble";
import { SocketProvider } from "../context/chatContext";
import { useFocusEffect } from "@react-navigation/native";

export default function ChatScreen(props: any) {
  const [message, setMessage] = React.useState<string>("");
  const { chat } = React.useContext(SocketProvider);
  const [me, setMe] = React.useState<string>("");

  useFocusEffect(
    React.useCallback(() => {
      setMe(props.route.params.name);

      return () => me;
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {chat.length > 0 ? (
        <FlatList
          inverted
          data={chat}
          renderItem={({ item }) => (
            <ChatBubble
              message={item.message}
              from={item.from}
              date={item.date}
            />
          )}
          keyExtractor={(item, index) => item.message + index}
          contentContainerStyle={{ flexDirection: "column-reverse" }}
        />
      ) : (
        <View style={{ justifyContent: "center" }}>
          <Text>tidak ada pesan</Text>
        </View>
      )}
      <ChatInput message={message} setMessage={setMessage} from={me} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    height: "100% ",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
