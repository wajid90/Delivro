import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { MapPinIcon, StarIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestorentCard = ({
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
}) => {
  const navigation = useNavigation();
  console.log("this is the :-" + genra);

  return (
    <TouchableOpacity
      className="mr-2 bg-white shadow"
      onPress={() =>
        navigation.navigate("Restaurent", {
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
      }
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="w-64 h-36 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-md pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={18} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> - {genra}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={16} />
          <Text className="text-xs text-gray-500">Nearby -{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestorentCard;
