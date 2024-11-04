import store from "@/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
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
        style={{ borderLeftColor: "green" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 18,
          fontWeight: "bold",
          fontFamily: "outfit-medium", // Font chữ tùy chỉnh cho tiêu đề
        }}
        text2Style={{
          fontSize: 16,
          fontFamily: "outfit-regular", // Font chữ tùy chỉnh cho nội dung
        }}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "red" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 18,
          fontWeight: "bold",
          fontFamily: "outfit-medium", // Font chữ tùy chỉnh cho tiêu đề
        }}
        text2Style={{
          fontSize: 16,
          fontFamily: "outfit-regular", // Font chữ tùy chỉnh cho nội dung
        }}
      />
    ),
  };

  return (
    <>
      <Provider store={store}>
        <Stack>
          <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
          <Stack.Screen
            name="(auth)/welcome"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
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
            name="(product)/productdetails"
            options={{ headerShown: false }}
          />
        </Stack>

        <Toast />
      </Provider>
    </>
  );
}
