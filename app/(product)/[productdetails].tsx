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
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";
import { router } from "expo-router";
import BackButton from "@/components/Material/BackButton";
import { callProductDetail } from "@/services/api-call";
import Checkbox from "expo-checkbox";

const images = [
  {
    name: "image 1",
    url: "https://www.abilities.ca/wp-content/uploads/2022/04/Food.jpg",
  },
  {
    name: "image 2",
    url: "https://images.ctfassets.net/mmptj4yas0t3/7hy6BRZTRBpGIDLNe82Sq8/4f0e5ccb2eb84e2d9a4f29b081a2dd5e/cc-health-trends.jpg?w=750&h=423&fl=progressive&q=50&fm=jpg",
  },
];

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
  const [selectedOptions, setSelectedOptions] = useState({});
  console.log(selectedOptions);

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
      setProductDetails(responseData);
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
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.carouselContainer}>
          <Carousel
            style={styles.carousel}
            showsControls={false}
            dotStyle={styles.dotStyle}
            activeDotStyle={[styles.dotStyle, styles.activeDotStyle]}
          >
            {images.map((img) => (
              <Image
                style={styles.image}
                source={{ uri: img.url }}
                key={img.name}
              />
            ))}
          </Carousel>
        </View>
        <View style={{ padding: Spacing }}>
          <View>
            <Text>{productDetails?.dishName}</Text>
            <Text>{productDetails?.availableQuantity}</Text>
            <Text>{productDetails?.description}</Text>

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
                        value={selectedOptions[optionGroup?.optionGroupId]?.includes(optionSelection.optionSelectionId) ? true : false}
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
});
