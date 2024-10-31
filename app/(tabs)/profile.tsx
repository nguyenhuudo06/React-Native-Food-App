import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StatusBar,
} from "react-native";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import Spacing from "@/constants/Spacing";
import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";
import { router } from "expo-router";

const Profile = () => {
  const user = {
    name: "Nguyen Huu Do",
    username: "nguyenhuudo1206@gmail.com",
    profilePicture: require("../../assets/images/avatart-template.jpg"),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background-profile.jpg")}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0 }}
        imageStyle={{ opacity: 0.2 }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingBottom: 100 }}>
          <View style={styles.wrapContainer}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImageBackground}>
                <Image
                  source={user.profilePicture}
                  style={styles.profileImage}
                  resizeMode="contain"
                />
              </View>
              <TouchableOpacity
                style={styles.editIconContainer}
                // onPress={() => alert("Edit Profile Picture")}
              >
                <Ionicons name="camera" size={24} color="#007bff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}>{user.username}</Text>
          </View>
          <View
            style={{
              margin: Spacing,
              backgroundColor: "#fff",
              padding: Spacing,
              borderRadius: Spacing,
            }}
          >
            <Text>Account</Text>
            <TouchableOpacity
              onPress={() => router.push("../(account)/personaInfor")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: Spacing * 0.4,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name="user-tie" style={styles.icon} />
                <Text>Personal infor</Text>
              </View>
              <View>
                <EvilIcons name="arrow-right" style={styles.icon} />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => router.push("../(account)/address")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: Spacing * 0.4,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="location" style={styles.icon} />
                <Text>Address</Text>
              </View>
              <View>
                <EvilIcons name="arrow-right" style={styles.icon} />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => router.push("../(account)/order")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: Spacing * 0.4,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="shopping-bag" style={styles.icon} />
                <Text>Order</Text>
              </View>
              <View>
                <EvilIcons name="arrow-right" style={styles.icon} />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => router.push("../(account)/wishlist")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: Spacing * 0.4,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="heart" style={styles.icon} />
                <Text>Wishlist</Text>
              </View>
              <View>
                <EvilIcons name="arrow-right" style={styles.icon} />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => router.push("../(account)/reviews")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: Spacing * 0.4,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="star-half-empty" style={styles.icon} />
                <Text>Reviews</Text>
              </View>
              <View>
                <EvilIcons name="arrow-right" style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              margin: Spacing,
              backgroundColor: "#fff",
              borderRadius: Spacing,
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                textAlign: "center",
                padding: Spacing * 1.5,
                fontSize: FontSize.medium,
                fontFamily: "outfit-medium",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    zIndex: 1,
  },
  wrapContainer: {
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 20,
    paddingTop: Spacing * 2,
  },
  profileImageBackground: {
    width: 100,
    height: 100,
    borderRadius: 70,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.text,
  },
  divider: {
    width: "auto",
    height: 1,
    backgroundColor: "#ccc",
    marginLeft: 40,
    opacity: 0.5,
  },
  icon: {
    padding: Spacing * 0.8,
    fontSize: 20,
    color: "black",
  },
});

export default Profile;
