import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setResturant } from "../redux/resturentReducer";

const RestaurentScreen = () => {
  const navigation = useNavigation();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genra,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setResturant({
        id,
        imgUrl,
        title,
        rating,
        genra,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);
  return (
    <>
      <BasketIcon />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-40 bg-gray-300 p-4"
          />
          <TouchableOpacity
            className="absolute top-10 left-3 bg-white rounded-full p-2"
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-2">
            <Text className="text-xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={20} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> - {genra}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="green" opacity={0.5} size={20} />
                <Text className="text-xs text-gray-500">
                  Near By - {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-400 mt-1 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-1 p-4 border border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.5} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food Gat Energy
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="pb-24">
          <Text className="px-4 pt-6 mb-3 font-bold text-md">Menu</Text>
          {dishes?.map((dish) => (
            <DishRow
              key={dish?._id}
              id={dish?._id}
              name={dish?.name}
              description={dish?.short_description}
              price={dish?.price}
              image={dish?.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurentScreen;
