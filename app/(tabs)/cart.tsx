import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import React from "react";
import ProductList from "@/components/Product/ProductList";
import BackButton from "@/components/Material/BackButton";
import FontSize from "@/constants/FontSize";
import Spacing from "@/constants/Spacing";
import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/currency";

const Cart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <BackButton />
        <View style={styles.spacing}>
          <View>
            <Text style={styles.titlePage}>Cart</Text>
          </View>
          {/* Product */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: Spacing,
              paddingVertical: Spacing * 1.4,
              marginBottom: Spacing,
              borderRadius: Spacing * 0.8,
              backgroundColor: Colors.white,
              shadowOffset: { width: 10, height: 10 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <View
              style={{
                borderRadius: Spacing * 0.8,
                marginRight: Spacing,
                overflow: "hidden",
              }}
            >
              <Image
                style={{ width: 62, height: 62 }}
                source={{
                  uri: "https://file.aiquickdraw.com/imgcompressed/img/compressed_8e8ea79b9bb6e05c09646b1691571ad5.webp",
                }}
                resizeMode="cover"
              />
            </View>
            <View style={{ flex: 1, marginRight: Spacing }}>
              <Text numberOfLines={1} style={{ width: "100%", fontFamily: "outfit-medium" }}>
                Chicken Burger
              </Text>
              <Text numberOfLines={1} style={{ width: "100%", fontFamily: "outfit-medium", color: Colors.gray }}>
                Burger Factory LTD
              </Text>
              <Text numberOfLines={1} style={{ width: "100%", fontFamily: "outfit-bold", color: Colors.primary }}>
                VND {formatCurrency(20000)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  styles.changeQuantity,
                  { backgroundColor: Colors.primary_10 },
                ]}
              >
                <AntDesign
                  name="minus"
                  size={FontSize.medium}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "outfit-medium",
                    width: 48,
                    paddingHorizontal: Spacing * 0.4,
                    textAlign: "center",
                  }}
                >
                  10
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.changeQuantity,
                  { backgroundColor: Colors.primary },
                ]}
              >
                <AntDesign
                  name="plus"
                  size={FontSize.medium}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              padding: Spacing,
              paddingTop: Spacing * 1.6,
              borderRadius: Spacing * 0.8,
              backgroundColor: Colors.primary,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.white,
                padding: Spacing * 0.6,
                borderRadius: 30,
                marginBottom: Spacing * 2,
                flexDirection: "row",
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  paddingHorizontal: Spacing,
                  color: Colors.primary,
                  fontFamily: "outfit-medium",
                }}
                placeholder="Coupon code"
              />
              <TouchableOpacity>
                <Text
                  style={{
                    paddingHorizontal: Spacing * 1.5,
                    paddingVertical: Spacing * 0.6,
                    borderRadius: Spacing * 3,
                    backgroundColor: Colors.primary,
                    color: Colors.white,
                    fontFamily: "outfit-medium",
                  }}
                >
                  Apply
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: Spacing * 0.4,
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontSize: FontSize.medium,
                  fontFamily: "outfit-medium",
                }}
              >
                Sub-Total
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: FontSize.medium,
                  fontFamily: "outfit-regular",
                }}
              >
                {formatCurrency(10000)} VND
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: Spacing * 0.4,
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontSize: FontSize.medium,
                  fontFamily: "outfit-medium",
                }}
              >
                Discount
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: FontSize.medium,
                  fontFamily: "outfit-regular",
                }}
              >
                {formatCurrency(3000)} VND
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: Spacing * 0.4,
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontSize: FontSize.large,
                  fontFamily: "outfit-bold",
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: FontSize.large,
                  fontFamily: "outfit-bold",
                }}
              >
                {formatCurrency(7000)} VND
              </Text>
            </View>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInText}>Check out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "#fff",
  },
  titlePage: {
    fontSize: FontSize.xLarge,
    fontFamily: "outfit-bold",
  },
  spacing: {
    padding: Spacing,
  },
  changeQuantity: {
    width: 26,
    height: 26,
    borderRadius: Spacing * 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInButton: {
    padding: Spacing * 2,
    backgroundColor: Colors.white,
    marginTop: Spacing * 2,
    borderRadius: Spacing,
    shadowColor: Colors.white,
  },
  signInText: {
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.primary,
    fontSize: FontSize.large,
  },
});
