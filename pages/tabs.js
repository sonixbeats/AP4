import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./home";
import musicslist from "./musicslist";
import Share from "./share";
import Events from "./events";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Accueil") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Évènements") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Partage") {
            iconName = focused ? "share" : "share-outline";
          } else if (route.name === "Musiques") {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          } else {
            iconName = focused ? "help-sharp" : "help-sharp";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: 
        {
          backgroundColor: '#181818',
          borderTopColor: '#181818',
        }
      })}
    >
      <Tab.Screen
        name="Accueil"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Musiques"
        component={musicslist}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Partage"
        component={Share}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Évènements"
        component={Events}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
