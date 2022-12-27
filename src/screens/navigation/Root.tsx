import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { enableScreens } from "react-native-screens";
import Home from "screens/Home";
import ViewPhotos from "screens/ViewPhotos";
import TakePhoto from "screens/TakePhoto";
import { RootParamList } from "screens/navigation/types";

enableScreens();

const Stack = createStackNavigator<RootParamList>();

export default function Navigation(): JSX.Element {
  return (
    <NavigationContainer<RootParamList>>
      <Stack.Navigator>
        <Stack.Screen name="Photos" component={Home} />
        <Stack.Screen name="View Photos" component={ViewPhotos} />
        <Stack.Screen name="Take a Photo" component={TakePhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
