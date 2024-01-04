import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import SearchScreen from "./SearchScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { HOME_PAGE_MAIN_HEADING } from "../constants/UI";

const HomeScreen = ({ navigation }) => {
  const [usersData, setUserData] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users`, {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: "Bearer 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",
        },
      });

      if (response.status === 200) {
        const userData = response.data;
        setUserData(userData);
      } else {
        console.error("Error fetching user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const renderUserCard = (item) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("UserProfile",item?.login)}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius:34,
            marginVertical: 10,
            border:'1px solid black',
            padding:10
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item?.avatar_url }}
              style={{ width: 60, height: 60, borderRadius: 50 }}
            />
            <Text style={{ marginLeft: 10 }}>{item?.login}</Text>            
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={{ marginHorizontal: 5}}>
        <Text style={{fontSize:24,marginHorizontal:10,fontWeight:"bold"}}>{HOME_PAGE_MAIN_HEADING}</Text>
        <SearchScreen navigation={navigation}/>
        <FlatList
          data={usersData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderUserCard(item)}
          contentContainerStyle={{ paddingHorizontal: 10 }} 
          
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
