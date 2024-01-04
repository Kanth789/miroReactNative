import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import axios from "axios";
import {
  FOOTER_HEADING_ONE,
  FOOTER_HEADING_TWO,
  USERDEATILS,
} from "../constants/UI";

const FollowersScreen = ({ navigation, route }) => {
  const { login, routeParams, followerAvatar, follower } = route.params;
  const [userProfileData, setUserProfileData] = useState();
  const [loading, setLoading] = useState(false);
  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/users/${login}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        setUserProfileData(userData);
        setLoading(false);
      } else {
        setLoading(false);

        console.error("Error fetching user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (routeParams) {
      getUserData();
    }
  }, [routeParams]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View>
            <Ionicons
              name="arrow-back"
              size={26}
              color="black"
              onPress={() => navigation.goBack()}
              style={{ marginHorizontal: 10, marginBottom: 6 }}
            />
          </View>
          <View style={{ marginHorizontal: 10, flex: 1 }}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                border: "1px solid grey",
                marginHorizontal: 5,
                padding: 10,
                marginVertical: 10,
              }}
            >
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {follower
                    ? `Followed by ${routeParams}`
                    : `Following ${routeParams}`}
                </Text>
                {loading ? (
                  <View>
                    <ActivityIndicator />
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        display: "block",
                        marginHorizontal: "auto",
                        width: 200,
                        marginTop: 10,
                      }}
                    >
                      <Image
                        source={{ uri: userProfileData?.avatar_url }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                      />
                      <View style={styles.userInfoWrapper}>
                        <Text style={styles.userInfoLabel}>
                          {USERDEATILS.USERID}:{" "}
                        </Text>
                        <Text>{userProfileData?.login}</Text>
                      </View>
                      <View style={styles.userInfoWrapper}>
                        <Text style={styles.userInfoLabel}>
                          {USERDEATILS.NAME}:{" "}
                        </Text>
                        <Text>{userProfileData?.name}</Text>
                      </View>

                      <View style={styles.userInfoWrapper}>
                        <Text style={styles.userInfoLabel}>
                          {USERDEATILS.LOCATION}:{" "}
                        </Text>
                        <Text>
                          {userProfileData?.location
                            ? userProfileData?.location
                            : "United States"}
                        </Text>
                      </View>
                      <View style={styles.userInfoWrapper}>
                        <Text style={styles.userInfoLabel}>
                          {USERDEATILS.PUBLICREPO}:{" "}
                        </Text>
                        <Text>{userProfileData?.public_repos}</Text>
                      </View>
                      <View style={styles.userInfoWrapper}>
                        <Text style={styles.userInfoLabel}>
                          {USERDEATILS.PUBLICGISTS}:{" "}
                        </Text>
                        <Text>{userProfileData?.public_gists}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {follower ? (
              <LottieView
                source={require("../../assets/Animation - 1704300509402.json")}
                autoPlay
                loop
                style={{ height: 100, alignSelf: "center" }}
              />
            ) : (
              <LottieView
                source={require("../../assets/Animation - 1704347383982.json")}
                autoPlay
                loop
                speed={2}
                style={{ height: 100, alignSelf: "center" }}
              />
            )}

            <View
              style={{
                backgroundColor: "white",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                marginVertical: 10,
                borderTopLeftRadius: 34,
                borderBottomLeftRadius: 34,
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
                  source={{ uri: followerAvatar }}
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                />
                <Text style={styles.profileName}>{routeParams}</Text>
              </View>
            </View>
            <View style={styles.footerContentWrapper}>
              <Text style={styles.footerHeadingone}>{FOOTER_HEADING_ONE}</Text>
              <Text style={styles.footerHeadingTwo}>{FOOTER_HEADING_TWO}</Text>
              <AntDesign name="heart" size={30} color="red" />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  userInfoLabel: {
    fontWeight: "bold",
    fontSize: 15,
  },
  profileName: {
    fontWeight: "300",
    fontSize: 12,
    marginLeft: 10,
  },
  userInfoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  footerHeadingone: {
    fontSize: 30,
    fontWeight: "bold",
    color: "grey",
  },
  footerHeadingTwo: {
    fontSize: 20,
    fontWeight: "300",
    color: "grey",
  },
  footerContentWrapper: {
    padding: 20,
    top: "25%",
  },
});

export default FollowersScreen;
