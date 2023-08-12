import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const PreparingOrderScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        className="flex-1 bg-gray-100"
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      ></View>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
