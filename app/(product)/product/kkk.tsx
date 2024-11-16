import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Carousel from "pinar";
import Spacing from "@/constants/Spacing";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";
import { router } from "expo-router";
import BackButton from "@/components/Material/BackButton";
import { callProductDetail } from "@/services/api-call";
import Checkbox from "expo-checkbox";
import { formatCurrency } from "@/utils/currency";

const height = Dimensions.get("window").height;

interface ImageOption {
  imageId: string;
  imageUrl: string;
}

interface DishDetail {
  categoryId: string;
  categoryName: string;
  description: string;
  dishId: string;
  dishName: string;
  images: ImageOption[];
  listOptions: {
    optionGroupId: string;
    optionGroupName: string;
    options: {
      optionSelectionId: string;
      optionName: string;
      additionalPrice: string;
    }[];
  }[];
  longDescription: string;
  offerPrice: number;
  price: number;
  status: string;
  thumbImage: string;
  rating: number;
  slug: string;
  availableQuantity: number;
}

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<DishDetail | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: { name: string; price: number; optionSelectionId: string }[];
  }>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [carouselImgs, setCarouselImgs] = useState([]);
  const [availableQuantity, setAvailableQuantity] = useState<number>(1);

  const handleInputChange = (text) => {
    // Lọc chỉ cho phép nhập số
    const numericValue = text.replace(/[^0-9]/g, "");
    setQuantity(numericValue);
  };

  const incrementQuantity = () => {
    if (quantity >= availableQuantity) return;
    setQuantity((prevCount) => prevCount + 1);
  };

  const decrementQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prevCount) => prevCount - 1);
  };

  const fetchProductDetails = async () => {
    try {
      const responseProductDetails = await callProductDetail(
        "0cab16a8-f8b6-400e-a411-43b2d6e80672"
      );

      if (
        responseProductDetails.status < 200 ||
        responseProductDetails.status >= 300
      ) {
        throw new Error(
          "Request failed with status " + responseProductDetails.status
        );
      }

      const responseData = await responseProductDetails.data;
      const responseDataImgs = await responseProductDetails.data.images;
      setProductDetails(responseData);
      setCarouselImgs([responseData.thumbImage, ...responseDataImgs]);
      setAvailableQuantity(responseData?.availableQuantity || 1);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const sortedOptions = useMemo(() => {
    const options = productDetails?.listOptions || [];
    return [...options].sort((a, b) => {
      if (a.optionGroupName.toLowerCase() === "size") return -1;
      if (b.optionGroupName.toLowerCase() === "size") return 1;
      return 0;
    });
  }, [productDetails]);

  const handleOptionChange = (
    optionGroupId: string,
    optionSelectionId: string,
    isSizeGroup: boolean
  ) => {
    if (isSizeGroup) {
      // Nếu là nhóm "Size", chỉ cho phép chọn 1 lựa chọn duy nhất
      setSelectedOptions({
        ...selectedOptions,
        [optionGroupId]: [optionSelectionId],
      });
    } else {
      // Nếu không phải nhóm "Size", có thể chọn hoặc bỏ chọn

      setSelectedOptions((prevState) => {
        const updatedState: any = { ...prevState };

        if (!updatedState[optionGroupId]) {
          updatedState[optionGroupId] = [];
        }

        if (updatedState[optionGroupId]?.includes(optionSelectionId)) {
          updatedState[optionGroupId] = updatedState[optionGroupId].filter(
            (id: string) => id !== optionSelectionId
          );
        } else {
          updatedState[optionGroupId].push(optionSelectionId);
        }
        return updatedState;
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <BackButton />
        <View style={styles.carouselContainer}>
          <Carousel
            style={styles.carousel}
            showsControls={false}
            dotStyle={styles.dotStyle}
            activeDotStyle={[styles.dotStyle, styles.activeDotStyle]}
          >
            {carouselImgs?.map((img, index) => (
              <Image
                style={styles.image}
                source={
                  carouselImgs
                    ? { uri: img }
                    : "../../../assets/images/avatart-template.jpg"
                }
                key={index}
              />
            ))}
          </Carousel>
        </View>

        <View style={{ padding: Spacing }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: Spacing,
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                borderColor: Colors.gray,
                borderWidth: 1,
                borderRadius: Spacing * 0.8,
                minHeight: 40,
                minWidth: 90,
              }}
            >
              <Text
                style={{ color: Colors.primary, fontFamily: "outfit-medium" }}
              >
                {productDetails?.categoryName}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary_10,
                borderRadius: "50%",
                padding: Spacing,
              }}
            >
              <AntDesign
                name="hearto"
                size={Spacing * 2}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          
          <View>
            <Text
              style={{
                fontSize: FontSize.large,
                fontFamily: "outfit-medium",
                marginBottom: Spacing,
              }}
            >
              {productDetails?.dishName}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: Spacing,
              }}
            >
              <FontAwesome
                name="star-half-empty"
                size={Spacing * 1.6}
                color={Colors.primary}
              />
              <Text
                style={{
                  marginHorizontal: Spacing * 0.4,
                  fontSize: FontSize.small,
                  fontFamily: "outfit-bold",
                  color: Colors.gray,
                }}
              >
                4.8 Rating
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: Spacing,
              }}
            >
              <Text
                style={{
                  marginHorizontal: Spacing * 0.4,
                  fontSize: FontSize.small,
                  fontFamily: "outfit-bold",
                }}
              >
                {formatCurrency(productDetails?.offerPrice)} VND
              </Text>
              <Text
                style={{
                  marginHorizontal: Spacing * 0.4,
                  fontSize: FontSize.small,
                  fontFamily: "outfit-medium",
                  textDecorationLine: "line-through",
                  color: Colors.primary,
                }}
              >
                {formatCurrency(productDetails?.price)} VND
              </Text>
            </View>

            {sortedOptions.map((optionGroup) => (
              <View key={optionGroup?.optionGroupName}>
                <View style={{ marginVertical: Spacing }}>
                  <Text
                    style={{
                      fontFamily: "outfit-medium",
                      fontSize: FontSize.medium,
                    }}
                  >
                    Select {optionGroup?.optionGroupName}{" "}
                    {optionGroup?.optionGroupName.toLocaleLowerCase() !==
                      "size" && (
                      <Text style={{ fontFamily: "outfit-regular" }}>
                        (Optional)
                      </Text>
                    )}
                  </Text>
                </View>
                {optionGroup?.options.map((optionSelection) => (
                  <TouchableOpacity
                    key={optionSelection.optionSelectionId}
                    onPress={() => {
                      handleOptionChange(
                        optionGroup.optionGroupId,
                        optionSelection.optionSelectionId,
                        optionGroup.optionGroupName.toLowerCase() === "size"
                      );
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: Spacing * 0.4,
                      paddingHorizontal: Spacing,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Checkbox
                        value={
                          selectedOptions[optionGroup?.optionGroupId]?.includes(
                            optionSelection.optionSelectionId
                          )
                            ? true
                            : false
                        }
                        color={true ? Colors.primary : Colors.gray}
                        onValueChange={() => {}}
                        style={{ marginRight: Spacing }}
                      />
                      <Text style={{ fontFamily: "outfit-regular" }}>
                        {optionSelection?.optionName}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontFamily: "outfit-regular" }}>
                        + {optionSelection?.additionalPrice} VND
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            <View>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: FontSize.medium,
                  marginVertical: Spacing,
                }}
              >
                Select Quantity (Available: {productDetails?.availableQuantity})
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={decrementQuantity}
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
                <TextInput
                  maxLength={4}
                  onChangeText={handleInputChange}
                  keyboardType="numeric"
                  numberOfLines={1}
                  value={quantity}
                  style={{
                    fontFamily: "outfit-medium",
                    width: 50,
                    paddingHorizontal: Spacing * 0.4,
                    textAlign: "center",
                  }}
                />
                <TouchableOpacity
                  onPress={incrementQuantity}
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

              <TouchableOpacity style={styles.signInButton}>
                <Text style={styles.signInText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1,
  },
  carouselContainer: {
    height: (height - 20) / 2.5,
    marginHorizontal: Spacing,
    marginTop: Spacing,
    borderRadius: 20,
    overflow: "hidden",
  },
  carousel: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  dotStyle: {
    width: 30,
    height: 3,
    backgroundColor: "silver",
    marginHorizontal: 3,
    borderRadius: 3,
  },
  activeDotStyle: {
    backgroundColor: "white",
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
    padding: Spacing * 1.6,
    backgroundColor: Colors.primary,
    marginTop: Spacing * 2,
    borderRadius: Spacing,
  },
  signInText: {
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.white,
    fontSize: FontSize.medium,
  },
});
