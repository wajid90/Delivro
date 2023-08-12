import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Category from "../components/Category";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

export default function HomeScreen() {
  const [featuedData, setFeaturedData] = useState([]);
  const naviagate = useNavigation();
  useLayoutEffect(() => {
    naviagate.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"]{
          ...,
          resturents[]->{
            ...,
            dishes[]->
          }
        }`
      )
      .then((data) => {
        setFeaturedData(data);
      });
  }, []);
  return (
    <SafeAreaView>
      <View className="flex-row pt-7 pb-2 justify-between items-center px-2 bg-white">
        <View className="flex-row">
          <Image
            source={{
              uri: "https://th.bing.com/th/id/R.22c1919a63ed16abe57a5d50ffb26735?rik=9PKEml10pXvjJw&riu=http%3a%2f%2fhairstyleslife.com%2fwp-content%2fuploads%2f2017%2f01%2fPretty-mens-short-hairstyles-with-berads.jpg&ehk=dJAS2oGClujIyq7NgnG4kgcVVezDq8%2bE%2buamlT9WeSA%3d&risl=&pid=ImgRaw&r=0",
            }}
            className="w-8 h-8 rounded-full p-4 mr-1 bg-gray-300"
          />
          <View>
            <Text className="font-bold text-gray-400 text-xs">
              Deliver Now!
            </Text>
            <View className="flex-row">
              <Text className="font-bold text-s">Current Location</Text>
              <ChevronDownIcon size={20} color="#00CCBB" />
            </View>
          </View>
        </View>
        <UserIcon size={20} color="#00CCBB" />
      </View>
      <View className="flex-row items-center space-x-2 pb-2 px-2 bg-white">
        <View className="flex-row rounded items-center flex-1 space-x-2 bg-gray-200 p-2">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurent and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Category />

        {featuedData?.map((category) => (
          <FeaturedRow
          key={category?._id}
            id={category?._id}
            title={category?.name}
            description={category?.short_description}
            featuredCategory="featured"
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
