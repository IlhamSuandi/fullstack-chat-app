import React from "react";
import { KeyboardAvoidingView, Pressable, View } from "react-native";
import { TextInput } from "react-native-paper";
import SendIcon from "react-native-vector-icons/FontAwesome";
import io from "socket.io-client";
import { SocketProvider, socket } from "../context/chatContext";

type chatType = {
  from: string;
  message: string;
  date: Date;
};

interface IProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  from: string;
}

export default function ChatInput(props: IProps) {
  const { message, setMessage, from } = props;
  const ref = React.useRef<any>(null);
  const { sendMessage, username } = React.useContext(SocketProvider);

  const send = () => {
    if (message !== "") {
      sendMessage(1, "ilham suandi", {
        from: username,
        message: message,
        date: new Date(),
      });
      setMessage("");
      ref.current?.focus();
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        padding: 10,
      }}
    >
      <View
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          gap: 10,
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <TextInput
          mode="outlined"
          ref={ref}
          placeholder="ketik pesan"
          activeOutlineColor="grey"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholderTextColor="grey"
          style={{ width: "80vw", backgroundColor: "transparent" }}
          multiline
          theme={{ roundness: 50 }}
          onChangeText={(value) => setMessage(value)}
          value={message}
          autoFocus
          blurOnSubmit={false}
          returnKeyType="done"
          onSubmitEditing={send}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Enter") {
              e.preventDefault();
              send();
            }
          }}
        />
        <Pressable disabled={message ? false : true} onPress={send}>
          <SendIcon name="send" color={message ? "black" : "grey"} size={28} />
        </Pressable>
      </View>
    </View>
  );
}
