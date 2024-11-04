import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Formik } from "formik";
import * as Yup from "yup";
import { callLogin, callProfile } from "@/services/api-call";
import Toast from "react-native-toast-message";
import { isLoading } from "expo-font";
import { setAccessToken } from "@/utils/axios-instance";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice/authSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password is at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const statecontent = useSelector((state) => state.auth)
  console.log(statecontent)

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);

    try {
      const responseLogin = await callLogin(email, password);

      if (responseLogin.status < 200 || responseLogin.status >= 300) {
        throw new Error("Request failed with status " + responseLogin.status);
      }

      setAccessToken(responseLogin.data.accessToken);

      const responseProfile = await callProfile();

      if (responseProfile.status < 200 || responseProfile.status >= 300) {
        throw new Error("Request failed with status " + responseProfile.status);
      }

      dispatch(login(responseProfile.data))

      Toast.show({
        type: "success",
        text1: "Login successful!",
        text2: "You have logged into your account.",
        onPress: () => Toast.hide(),
      });

      setLoading(false);

        router.push("../(tabs)/home");
    } catch (error) {
      console.error(error);

      Toast.show({
        type: "error",
        text1: "Login failed!",
        text2: error.response?.data?.errors.error || "Somthing wrong!",
        onPress: () => Toast.hide(),
      });

      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.paddingView}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Login here</Text>
              <Text style={styles.welcomeText}>
                Welcome back you've been missed!
              </Text>
            </View>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                handleLogin(values.email, values.password);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor={Colors.darkText}
                      style={styles.input}
                      onChangeText={(text) =>
                        handleChange("email")(text.trim())
                      }
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    <View style={styles.showError}>
                      {touched.email && errors.email && (
                        <Text style={{ color: "red" }}>{errors.email}</Text>
                      )}
                    </View>

                    <TextInput
                      placeholder="Password"
                      placeholderTextColor={Colors.darkText}
                      secureTextEntry
                      style={styles.input}
                      onChangeText={(text) =>
                        handleChange("password")(text.trim())
                      }
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    <View style={styles.showError}>
                      {touched.password && errors.password && (
                        <Text style={{ color: "red" }}>{errors.password}</Text>
                      )}
                    </View>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() => router.push("./forgotPassword")}
                    >
                      <Text style={styles.forgotPasswordText}>
                        Forgot your password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.signInText}>
                      {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        " Sign in"
                      )}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <TouchableOpacity
              onPress={() => router.push("./register")}
              style={styles.createAccountButton}
            >
              <Text style={styles.createAccountText}>Create new account</Text>
            </TouchableOpacity>
            <View style={styles.paddingView}>
              <Text style={styles.continueText}>Or continue with</Text>
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons
                    name="logo-google"
                    color={Colors.text}
                    size={Spacing * 2}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome5
                    name="facebook-square"
                    color={Colors.text}
                    size={Spacing * 2}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push("../(tabs)/home")}
              style={styles.createAccountButton}
            >
              <Text style={styles.createAccountText}>Go to home page</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  paddingView: {
    padding: Spacing * 2,
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: "outfit-bold",
    marginVertical: Spacing * 3,
  },
  welcomeText: {
    fontFamily: "outfit-medium",
    fontSize: FontSize.large,
    maxWidth: "60%",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: Spacing * 3,
  },
  showError: {
    height: 20,
  },
  input: {
    fontFamily: "outfit-regular",
    fontSize: FontSize.small,
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginTop: Spacing,
  },
  forgotPasswordText: {
    fontFamily: "outfit-regular",
    color: Colors.primary,
    fontSize: FontSize.small,
    alignSelf: "flex-end",
  },
  signInButton: {
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
  },
  signInText: {
    fontFamily: "outfit-medium",
    textAlign: "center",
    color: Colors.onPrimary,
    fontSize: FontSize.large,
  },
  createAccountButton: {
    padding: Spacing,
  },
  createAccountText: {
    fontFamily: "outfit-medium",
    textAlign: "center",
    color: Colors.text,
    fontSize: FontSize.small,
  },
  continueText: {
    fontFamily: "outfit-medium",
    textAlign: "center",
    color: Colors.primary,
    fontSize: FontSize.small,
  },
  socialButtonsContainer: {
    marginTop: Spacing,
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    padding: Spacing,
    backgroundColor: Colors.gray,
    borderRadius: Spacing / 2,
    marginHorizontal: Spacing,
  },
});
