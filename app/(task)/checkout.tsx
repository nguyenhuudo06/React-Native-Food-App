import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import BackButton from "@/components/Material/BackButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { callAddress } from "@/services/api-call";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Spacing from "@/constants/Spacing";
import Colors from "@/constants/Colors";
import Checkbox from "expo-checkbox";
import FontSize from "@/constants/FontSize";
import { router } from "expo-router";

interface Coupon {
  couponId: string;
  couponCode: string;
  description: string;
  status: string;
  discountPercent: number;
  maxDiscount: number;
  minOrderValue: number;
  availableQuantity: number;
  startDate: string;
  expirationDate: string;
}

interface AppliedCoupon extends Coupon {
  discountAmount: number;
}

interface Address {
  id: string;
  street: string;
  city: string;
  country: string;
  postalCode: number;
  state: string;
  addressType: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string | null;
  userId: string;
  commune: string;
  district: string;
}

interface OrderSummary {
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  appliedCoupon: {
    couponId: string;
    couponCode: string;
    discountAmount: number;
  } | null;
}

interface DeliveryResponse {
  from: string;
  to: string;
  distance: string;
  fee: string;
  duration: string;
}

const Checkout = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const userId = useSelector((state: RootState) => state.auth.user_id);
  const userName = useSelector((state: RootState) => state.auth.user_name);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const cartItems = useSelector((state: RootState) => state.order.carts);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BANKING">("COD");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null
  );

  // console.log(cartItems);
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.detail.price * item.quantity,
      0
    );
  };
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
    return subtotal - discount;
  };

  const checkoutItems = cartItems.map((cart) => ({
    dishId: cart.dishId,
    quantity: cart.quantity,
    dishOptionSelectionIds: Object.values(cart.selectedOptions).map(
      (option) => option.optionSelectionId
    ),
  }));
  // console.log(checkoutItems);

  const fetchAddresses = async (userId: string | null) => {
    try {
      const responseState = await callAddress(userId);
      if (responseState.status < 200 || responseState.status >= 300) {
        throw new Error("Request failed with status " + responseState.status);
      }

      const addressList =
        responseState.data._embedded.addressByUserIdResponseList.flatMap(
          (item) => item.addresses
        );
      setAddresses(addressList);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    fetchAddresses(userId);
  }, []);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const formatPrice = (price: number) => {
    return Math.round(price).toLocaleString("vi-VN");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <BackButton />
        <View style={styles.spacingContainer}>
          <View>
            <Text style={styles.titlePage}>Checkout</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("../(account)/address")}
            style={{
              backgroundColor: Colors.primary_10,
              padding: Spacing * 0.4,
              paddingHorizontal: Spacing,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: Spacing * 0.8,
              marginBottom: Spacing,
            }}
          >
            <AntDesign
              name="plus"
              size={FontSize.small}
              color={Colors.primary}
            />
            <Text
              style={{ fontFamily: "outfit-medium", marginLeft: Spacing * 0.8 }}
            >
              Create new address
            </Text>
          </TouchableOpacity>

          {addresses.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleAddressSelect(item.id)}
            >
              <View style={styles.addressContainer}>
                <View style={styles.addressHeader}>
                  <Checkbox
                    value={selectedAddress === item.id}
                    onValueChange={() => handleAddressSelect(item.id)}
                  />
                  <View style={styles.addressTypeContainer}>
                    <FontAwesome name="home" size={14} color="#3498db" />
                    <Text style={styles.addressTypeText}>
                      {item?.addressType.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.addressDetailsContainer}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={styles.userText}>
                      {userName}{" "}
                      <Text style={styles.phoneText}>
                        ( {item?.phoneNumber} )
                      </Text>
                    </Text>
                    <Text numberOfLines={1} style={styles.streetText}>
                      <Text style={styles.regularText}>{item?.street}</Text>
                    </Text>
                    <Text numberOfLines={2} style={styles.cityText}>
                      <Text style={styles.regularText}>
                        {item?.commune}, {item?.state}, {item?.city},{" "}
                        {item?.country}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={[styles.spacingContainer, { paddingHorizontal: Spacing * 2 }]}
        >
          <Text style={{ fontFamily: "outfit-medium" }}>Payment method</Text>
          <TouchableOpacity
            onPress={() => setPaymentMethod("COD")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: Spacing,
            }}
          >
            {paymentMethod == "COD" ? (
              <MaterialIcons
                name="radio-button-checked"
                size={Spacing * 2}
                color={Colors.primary}
              />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={Spacing * 2}
                color={Colors.gray}
              />
            )}
            <Text style={{ marginLeft: Spacing, fontFamily: "outfit-regular" }}>
              Cash on delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPaymentMethod("BANKING")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: Spacing,
            }}
          >
            {paymentMethod == "BANKING" ? (
              <MaterialIcons
                name="radio-button-checked"
                size={Spacing * 2}
                color={Colors.primary}
              />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={Spacing * 2}
                color={Colors.gray}
              />
            )}
            <Text style={{ marginLeft: Spacing, fontFamily: "outfit-regular" }}>
              VNPay
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.spacingContainer}>
          <View
            style={{
              padding: Spacing,
              paddingTop: Spacing * 1.6,
              borderRadius: Spacing * 0.8,
              backgroundColor: Colors.white,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <View
              style={{
                paddingVertical: Spacing * 0.4,
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.small,
                  fontFamily: "outfit-bold",
                  marginBottom: Spacing,
                }}
              >
                Total Cart
              </Text>
              <View
                style={{
                  borderColor: Colors.gray,
                  borderWidth: 1,
                  marginBottom: Spacing,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-regular",
                    marginBottom: Spacing,
                  }}
                >
                  Sub-Total:
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-regular",
                    marginBottom: Spacing,
                  }}
                >
                  {formatPrice(calculateSubtotal())} VND
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-regular",
                    marginBottom: Spacing,
                  }}
                >
                  Distance:
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-regular",
                    marginBottom: Spacing,
                  }}
                >
                  0 VND
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-regular",
                    marginBottom: Spacing,
                  }}
                >
                  Duration (About):
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-regular",
                    marginBottom: Spacing,
                  }}
                >
                  0 VND
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-regular",
                    marginBottom: Spacing,
                  }}
                >
                  Delivery:
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-regular",
                    marginBottom: Spacing,
                  }}
                >
                  0 VND
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-regular",
                    marginBottom: Spacing,
                  }}
                >
                  Discount:
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-regular",
                    marginBottom: Spacing,
                  }}
                >
                  {appliedCoupon ? formatPrice(appliedCoupon.discountAmount) : 0} VND
                </Text>
              </View>
              <View
                style={{
                  borderColor: Colors.gray,
                  borderWidth: 1,
                  marginBottom: Spacing,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-bold",
                    marginBottom: Spacing,
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.small,
                    fontFamily: "outfit-bold",
                    marginBottom: Spacing,
                  }}
                >
                  {formatPrice(calculateTotal())} VND
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => router.push("../(task)/checkout")}
            >
              <Text style={styles.signInText}>Place Orlder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

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
    marginBottom: Spacing,
  },
  spacingContainer: {
    padding: Spacing,
  },
  addressContainer: {
    backgroundColor: Colors.addressGray,
    borderRadius: Spacing * 0.8,
    padding: Spacing,
    marginBottom: Spacing,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing * 0.6,
    marginBottom: Spacing,
  },
  addressTypeContainer: {
    backgroundColor: Colors.primary_10,
    padding: Spacing * 0.4,
    paddingHorizontal: Spacing,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing * 0.4,
    borderRadius: Spacing * 0.8,
    flex: 1,
  },
  addressTypeText: {
    color: Colors.primary,
    fontFamily: "outfit-medium",
  },
  addressDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing,
    backgroundColor: Colors.white,
    borderRadius: Spacing * 0.8,
    padding: Spacing,
  },
  userText: {
    fontFamily: "outfit-medium",
  },
  phoneText: {
    fontFamily: "outfit-regular",
  },
  streetText: {
    fontFamily: "outfit-bold",
  },
  regularText: {
    fontFamily: "outfit-regular",
  },
  cityText: {
    fontFamily: "outfit-bold",
  },
  signInButton: {
    padding: Spacing * 1.6,
    backgroundColor: Colors.primary,
    marginTop: Spacing * 2,
    borderRadius: Spacing,
    shadowColor: Colors.white,
  },
  signInText: {
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.white,
    fontSize: FontSize.medium,
  },
});
