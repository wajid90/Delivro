import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectBasketTotal } from "../redux/bucketReducer";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const { items } = useSelector((state) => state.backet);

  const total = useSelector((state) => selectBasketTotal(state));
  const navigation = useNavigation();

  return (
    <View className="absolute bottom-5 w-full z-10">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Basket", {
            items,
          })
        }
        className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 rounded-lg">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg bg-transparent py-1 px-2">
          View Basket
        </Text>
        <Text className="text-md text-white font-extrabold py-2">
          <Currency quantity={total} currency="INR" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
