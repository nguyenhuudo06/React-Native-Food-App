import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"; // Sử dụng router để điều hướng

const ForgotPassword = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View
          style={{
            padding: Spacing * 2,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xLarge,
                color: Colors.primary,
                fontFamily: "outfit-bold",
                marginVertical: Spacing * 3,
              }}
            >
              Welcome back!
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: FontSize.large,
                maxWidth: "60%",
                textAlign: "center",
              }}
            >
              Enter your email to change the password
            </Text>
          </View>
          <View style={{ marginVertical: Spacing * 3 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={Colors.darkText}
              style={{
                fontFamily: "outfit-regular",
                fontSize: FontSize.small,
                padding: Spacing * 2,
                backgroundColor: Colors.lightPrimary,
                borderRadius: Spacing,
                marginVertical: Spacing,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 3,
              marginTop: Spacing,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                textAlign: "center",
                color: Colors.onPrimary,
                fontSize: FontSize.large,
              }}
            >
              Send verify email
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20, 
              width: "100%",
            }}
          >
            <TouchableOpacity onPress={() => router.push("./login")}>
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  color: Colors.primary,
                  fontSize: FontSize.small,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("./register")}>
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  color: Colors.primary,
                  fontSize: FontSize.small,
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
