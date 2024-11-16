import React, { useEffect, useState } from "react";
import { router, Slot } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Text, View } from "react-native";
import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";

const AccountLayout = () => {
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Tắt header ngay khi layout được mount  
    });
  }, [navigation]);

  useEffect(() => {
    setIsMounted(true); // Mark layout as mounted
  }, []);

  useEffect(() => {
    if (isMounted && userData && !userData.isAuthenticated) {
      router.replace("../(auth)/login");
    }
  }, [userData, isMounted]); // Ensure it runs after layout is mounted

  if (!isMounted) return null; // Don't render anything until layout is mounted

  return <Slot />;
};

export default AccountLayout;
