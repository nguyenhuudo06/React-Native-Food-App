import Spacing from "@/constants/Spacing";
import store from "@/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, { BaseToast } from "react-native-toast-message";
import { Provider } from "react-redux";

export default function RootLayout() {
  useFonts({
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          padding: Spacing,
          borderLeftWidth: 0,
          backgroundColor: "#0B192C",
          borderRadius: Spacing * 2,
          maxWidth: 300,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "medium",
          fontFamily: "outfit-regular",
          color: "#fff",
        }}
        text2Style={{
          fontSize: 16,
          fontFamily: "outfit-regular",
        }}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={{
          padding: Spacing,
          borderLeftWidth: 0,
          backgroundColor: "#0B192C",
          borderRadius: Spacing * 2,
          maxWidth: 300,
        }}
        contentContainerStyle={{ paddingHorizontal: Spacing }}
        text1Style={{
          fontSize: 16,
          fontWeight: "medium",
          fontFamily: "outfit-regular",
          color: "#fff",
        }}
        text2Style={{
          fontSize: 16,
          fontFamily: "outfit-regular",
        }}
      />
    ),
    warning: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "yellow" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 18,
          // fontWeight: "bold",
          fontFamily: "outfit-medium",
        }}
        text2Style={{
          fontSize: 16,
          fontFamily: "outfit-regular",
        }}
      />
    ),
  };

  return (
    <>
      <GestureHandlerRootView>
        <Provider store={store}>
          <Stack>
            <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
            <Stack.Screen
              name="(auth)/welcome"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/login"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/register"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/forgotPassword"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="(account)/address"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(account)/order"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(account)/personaInfor"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(account)/reviews"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(account)/wishlist"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="(product)/product/[productId]"
              options={{ headerShown: false }}
            />

            <Stack.Screen name="(test)/test" options={{ headerShown: false }} />

            <Stack.Screen
              name="(task)/checkout"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(task)/orderSuccess"
              options={{ headerShown: false }}
            />
          </Stack>

          <Toast config={toastConfig} />
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}
