import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { HOME_INPUT_FIELD_PLACEHOLDER, SEARCH } from "../constants/UI";

const SearchScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        navigation.navigate("UserProfile", userData?.login);
        setUsername("");
      } else if (response.status === 404) {
        navigation.navigate("NotFound");
      } else {
        console.error("Error fetching user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ marginHorizontal: 10 }}>
        <TextInput
          placeholder={HOME_INPUT_FIELD_PLACEHOLDER}
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={{
            height: 40,
            backgroundColor: "white",
            borderRadius: 6,
            marginBottom: 7,
            paddingHorizontal: 6,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "skyblue",
            borderRadius: 10,
            paddingHorizontal: 6,
            paddingVertical: 6,
          }}
          onPress={handleSearch}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold",fontSize:18 }}
          >
            {SEARCH}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
