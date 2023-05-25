import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./listChat";
import GroupChat from "./groupChat";
import ChatIcon from "react-native-vector-icons/Ionicons";
import GroupChatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileIcon from "react-native-vector-icons/FontAwesome";
import Profile from "./profile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "home">;
const Tab = createBottomTabNavigator();

export default function MyTab(props: Props) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "home") {
            iconName = focused ? "home" : "home-outline";
            return (
              <ChatIcon name={iconName as string} size={size} color={color} />
            );
          } else if (rn === "groupChat") {
            iconName = focused ? "account-group" : "account-group-outline";
            return (
              <GroupChatIcon
                name={iconName as string}
                size={size}
                color={color}
              />
            );
          } else if (rn === "profile") {
            iconName = focused ? "user" : "user-o";
            return (
              <ProfileIcon
                name={iconName as string}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="home"
        children={() => (
          <Home navigation={props.navigation} route={props.route} />
        )}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="groupChat"
        component={GroupChat}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
