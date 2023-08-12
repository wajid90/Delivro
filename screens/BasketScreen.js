import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  Touchable,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectResturent } from "../redux/resturentReducer";
import {
  deleteItemInBacket,
  selectBacketItem,
  selectBasketTotal,
} from "../redux/bucketReducer";
import { TouchableOpacity } from "react-native";
import { XCircleIcon } from "react-native-heroicons/outline";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const resturant = useSelector((state) => selectResturent(state));
  const navigation = useNavigation();
  const items = useSelector(selectBacketItem);
  const [groupItemBaket, setGroupItemBacket] = useState([]);
  const total = useSelector((state) => selectBasketTotal(state));
  const dispatch = useDispatch();

  const deleteHandler = (key) => {
    dispatch(deleteItemInBacket({ id: key }));
  };
  useEffect(() => {
    const goupedItem = items.reduce(
      (result, item) => {
        (result[item.id] = result[item.id] || []).push(item);
        return result;
      },

      {}
    );
    setGroupItemBacket(goupedItem);
  }, [items]);
  console.log(groupItemBaket);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        className="flex-1 bg-gray-100"
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="p-5 border-b-xs border-[#00CCCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {resturant?.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-2 right-5"
          >
            <XCircleIcon color="#00CCBB" height={40} width={40} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://images.pexels.com/photos/1832016/pexels-photo-1832016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Delivery n 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.entries(groupItemBaket).map(([key, it]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{it.length} X</Text>
              <Image
                source={{ uri: urlFor(it[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{it[0]?.name}</Text>
              <Text className="text-gray-400">
                <Currency quantity={it[0]?.price} currency="INR" />
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => deleteHandler(key)}
                  className="text-[#00CCBB] text-xs"
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">SubTotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={total} currency="INR" />
            </Text>
          </View>
          <View className="flex-row justify-between py-2">
            <Text className="text-gray-400">Delivery Charge</Text>
            <Text className="text-gray-400">
              <Currency quantity={100} currency="INR" />
            </Text>
          </View>
          <View className="flex-row justify-between py-2">
            <Text className="font-extrabold">Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={total + 100} currency="INR" />
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-lg bg-[#00CCBB] p-4"
            onPress={() => navigation.navigate("PreparingOrderScreen")}
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
