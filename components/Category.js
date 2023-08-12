import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient from "../sanity";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    sanityClient.fetch(`*[_type == "category"]`).then((data) => {
      setCategoryData(data);
    });
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 5,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categoryData?.map((cat) => (
        <CategoryCard imgUrl={cat?.image} title={cat?.name} />
      ))}
    </ScrollView>
  );
};

export default Category;
