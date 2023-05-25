import { Dimensions, Text, View } from "react-native";
import { SocketProvider } from "../context/chatContext";
import React from "react";

type ItemProps = { from: string; message: string; date: Date };

export default function ChatBubble(props: ItemProps) {
  const { from, message, date } = props;
  const { width } = Dimensions.get("screen");
  const { username } = React.useContext(SocketProvider);
  return (
    <View
      style={
        from === username
          ? {
              width: width,
              paddingRight: 20,
              alignItems: "flex-end",
            }
          : {
              width: width,
              paddingLeft: 20,
              alignItems: "flex-start",
            }
      }
    >
      <Text
        style={
          from === username
            ? {
                borderWidth: 1,
                maxWidth: "94vw",
                width: "fit-content",
                padding: 10,
                textAlign: "right",
                borderRadius: 10,
                borderBottomRightRadius: 0,
                backgroundColor: "lime",
                borderColor: "lime",
              }
            : {
                borderWidth: 1,
                maxWidth: "60vw",
                width: "fit-content",
                padding: 10,
                textAlign: "left",
                borderRadius: 10,
                borderBottomLeftRadius: 0,
              }
        }
      >
        {message}
      </Text>
      <Text style={{ marginBottom: 10, fontSize: 10, marginTop: 2 }}>
        {new Date(date).toLocaleString()}
      </Text>
    </View>
  );
}
