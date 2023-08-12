import { View, Text, TouchableOpacity, Image } from "react-native";
import Currency from "react-currency-formatter";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemInBacket,
  deleteItemInBacket,
  selectBacketItemWithId,
} from "../redux/bucketReducer";

const DishRow = ({ id, name, description, price, image }) => {
  const [pressed, setPressed] = useState(false);
  // const [items, setItems] = useState(0);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBacketItemWithId(state, id));
  const addItemInBacketHandler = () => {
    // if (items.length < 0) return null;
    dispatch(
      addItemInBacket({
        id,
        name,
        description,
        price,
        image,
      })
    );
  };
  const deleteItemInBacketHandler = () => {
    if (!items.length > 0) return null;
    dispatch(deleteItemInBacket({ id }));
  };
  

  return (
    <>
      <TouchableOpacity
        onPress={() => setPressed(!pressed)}
        className={`bg-white border py-2 px-4 border-gray-100 shadow ${
          pressed == true && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1">
            <Text className="text-md mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="INR" />
            </Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4 rounded"
            />
          </View>
        </View>
      </TouchableOpacity>
      {pressed && (
        <View className="bg-white px-3">
          <View className="flex-row items-center space-x-2 pt-1 pb-2">
            <TouchableOpacity onPress={deleteItemInBacketHandler}>
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={30}
              />
            </TouchableOpacity>
            <Text>{items.length > 0 ? items.length : 0}</Text>
            <TouchableOpacity onPress={addItemInBacketHandler}>
              <PlusCircleIcon color={"#00CCBB"} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
