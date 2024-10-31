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

const Login = () => {
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
              Login here
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: FontSize.large,
                maxWidth: "60%",
                textAlign: "center",
              }}
            >
              Welcome back you've been missed!
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
            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors.darkText}
              secureTextEntry
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
          <View>
            <TouchableOpacity onPress={() => router.push("./forgotPassword")}>
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  color: Colors.primary,
                  fontSize: FontSize.small,
                  alignSelf: "flex-end",
                }}
              >
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 3,
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
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("./register")}
            style={{
              padding: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                textAlign: "center",
                color: Colors.text,
                fontSize: FontSize.small,
              }}
            >
              Create new account
            </Text>
          </TouchableOpacity>
          <View
            style={{
              padding: Spacing * 3,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                textAlign: "center",
                color: Colors.primary,
                fontSize: FontSize.small,
              }}
            >
              Or continute with
            </Text>
            <View
              style={{
                marginTop: Spacing,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-google"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-facebook"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-github"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
