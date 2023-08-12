import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestorentCard from "./RestorentCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description, featuredCategory }) => {
  const [featuredData, setFeturedData] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured" && _id==$id]{
      ...,
      resturents[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      }
    }[0]`,
        { id }
      )
      .then((data) => {
        setFeturedData(data?.resturents);
      });
  }, []);



  return (
    <View key={id}>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-md">{title}</Text>
        <ArrowRightIcon color="#00CCBB" size={20} />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 9,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {featuredData?.map((resturent) => (
          <RestorentCard
            key={resturent?._id}
            id={resturent?._id}
            imgUrl={resturent?.image}
            title={resturent?.name}
            rating={resturent?.rating}
            genra={resturent?.genra}
            address={resturent?.address}
            short_description={resturent?.short_description}
            dishes={resturent?.dishes}
            long={resturent?.long}
            lat={resturent?.lat}
          />
          
        
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
