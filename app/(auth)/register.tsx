import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"; // Sử dụng router để điều hướng

const Register = () => {
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
              Create Account
            </Text>
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: FontSize.large,
                // maxWidth: "80%",
                textAlign: "center",
              }}
            >
              Create an account so you can explore all the exiting foods
            </Text>
          </View>
          <View style={{ marginVertical: Spacing }}>
            <TextInput
              placeholder="Name"
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
            <TextInput
              placeholder="Confirm Password"
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
          <TouchableOpacity
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing,
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
              Sign up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("./login")}
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
              Already have an account
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

export default Register;
