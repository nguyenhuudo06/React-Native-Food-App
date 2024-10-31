import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
      <Stack.Screen name="(auth)/welcome" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/forgotPassword" options={{ headerShown: false }} />
      
      <Stack.Screen name="(account)/address" options={{ headerShown: false }} />
      <Stack.Screen name="(account)/order" options={{ headerShown: false }} />
      <Stack.Screen name="(account)/personaInfor" options={{ headerShown: false }} />
      <Stack.Screen name="(account)/reviews" options={{ headerShown: false }} />
      <Stack.Screen name="(account)/wishlist" options={{ headerShown: false }} />

    </Stack>
  );
}
