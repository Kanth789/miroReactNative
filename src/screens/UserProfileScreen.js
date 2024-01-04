import axios from "axios";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UNITED_STATES, USERDEATILS } from "../constants/UI";
import { ScrollView } from "react-native-gesture-handler";

const UserProfileScreen = ({ route, navigation }) => {
  const [userProfileData, setUserProfileData] = useState();
  const [loading, setLoading] = useState(true);
  const [followersLoading, setFollowersLoading] = useState(true);
  const [followersData, setFollowersData] = useState([]);
  const [followingLoading, setFollowingLoading] = useState(true);
  const [followingData, setFollowingData] = useState([]);
  const [clikedOnFollowers, setClickedOnFollowers] = useState();
  const [clickedOnFollowing, setClickedOnFollowing] = useState();
  const [refreshing, setRefreshing] = useState(false);


  const getUserData = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${route.params}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        setLoading(false);
        setUserProfileData(userData);
      } else {
        console.error("Error fetching user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params) {
      getUserData();
    }
  }, [route.params]);

  const onClickOnFollowers = async (value) => {
    const url = `https://api.github.com/users/${value}/followers`;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (response.status === 200) {
        setFollowersLoading(false);
        const userData = response.data;
        setFollowersData(userData);
      } else {
        console.error("Error fetching user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    } finally {
      setFollowersLoading(false);
    }
  };

  const onClickOnFollowing = async (value) => {
    const url = `https://api.github.com/users/${value}/following`;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (response.status === 200) {
        const userData = response.data;
        setFollowingLoading(false);
        setFollowingData(userData);
      } else {
        console.error("Error fetching user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    } finally {
      setFollowingLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getUserData();
    setRefreshing(false);
  };

  const renderFollowersCards = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Followers", {
            login: item?.login,
            routeParams: route.params,
            followerAvatar: userProfileData?.avatar_url,
            follower: clikedOnFollowers,
            following: clickedOnFollowing,
          })
        }
      >
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
              source={{ uri: item?.avatar_url }}
              style={{ width: 60, height: 60, borderRadius: 50 }}
            />
            <Text style={{ marginLeft: 10 }}>{item?.login}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const FollowersCardSkeleton = () => {
    return (
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
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              backgroundColor: "#ddd",
            }}
          />
          <View style={{ marginLeft: 10, width: 100, height: 20, backgroundColor: "#ddd" }} />
        </View>
      </View>
    );
  };
  

  const renderUserProfileSkeleton = () => {
    return (
      <View style={styles.container}>
        <View style={styles.avatarSkeleton} />
        <View style={styles.infoSkeleton}>
          <Text style={styles.skeletonText} />
          <Text style={styles.skeletonText} />
          <Text style={styles.skeletonText} />
          <Text style={styles.skeletonText} />
          <Text style={styles.skeletonText} />
          <Text style={styles.skeletonText} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.skeletonButton, { marginRight: 5 }]} />
            <TouchableOpacity style={styles.skeletonButton} />
          </View>
        </View>
      </View>
    );
  };

  

  const renderUserProfileDataCard = () => {
    return (
      <View
        style={{
          display: "block",
          marginHorizontal: "auto",
          width: 200,
        
        }}
      >
        <Image
          source={{ uri: userProfileData?.avatar_url }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>{USERDEATILS.USERID}: </Text>
          <Text>{userProfileData?.login}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>{USERDEATILS.NAME}: </Text>
          <Text>{userProfileData?.name}</Text>
        </View>

        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>{USERDEATILS.LOCATION}: </Text>
          <Text>
            {userProfileData?.location
              ? userProfileData?.location
              : UNITED_STATES}
          </Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>{USERDEATILS.PUBLICREPO}: </Text>
          <Text>{userProfileData?.public_repos}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>{USERDEATILS.PUBLICGISTS}: </Text>
          <Text>{userProfileData?.public_gists}</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
          <TouchableOpacity
            onPress={() => {
              setClickedOnFollowers(true);
              onClickOnFollowers(userProfileData?.login);
              setClickedOnFollowing(false);
            }}
            style={{
              backgroundColor: "orange",
              borderRadius: 10,
              paddingHorizontal: 6,
              paddingVertical: 8,
              marginRight: 5,
              borderWidth: clikedOnFollowers ? 2 : 0, 
              borderColor: clikedOnFollowers ? "black" : "transparent",
            }}
          >
            <Text>
              {USERDEATILS.FOLLOWERS}: {userProfileData?.followers}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setClickedOnFollowers(false);
              setClickedOnFollowing(true);
              onClickOnFollowing(userProfileData?.login);
            }}
            style={{
              backgroundColor: "blue",
              borderRadius: 10,
              paddingHorizontal: 6,
              paddingVertical: 8,
              borderWidth: clickedOnFollowing ? 2 : 0, 
              borderColor: clickedOnFollowing ? "black" : "transparent",
            }}
          >
            <Text style={{ color: "white" }}>
              {USERDEATILS.FOLLOWING}: {userProfileData?.following}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  const renderFollowersCardsWithSkeleton = () => {
    
  
    return <FollowersCardSkeleton />;
  };

  const renderFollwersAndFollowingCardWrapper = () => {
    return (
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          border: "1px solid grey",
          marginHorizontal: 20,
          padding: 10,
          marginVertical: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {clickedOnFollowing ? USERDEATILS.FOLLOWING : USERDEATILS.FOLLOWERS}
          </Text>
          {(followersLoading && clikedOnFollowers) ||
          (followingLoading && clickedOnFollowing) ? (
            <View>
              {renderFollowersCardsWithSkeleton()}
            </View>
          ) : (
            <View>
              {followersData.length > 0 && clikedOnFollowers && (
                <FlatList
                  data={followersData}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => renderFollowersCards(item)}
                  contentContainerStyle={{ columnGap: 10 }}
                  style={{ marginHorizontal: 5 }}
                  showsVerticalScrollIndicator={false}
                />
              )}
              {followingData.length > 0 && clickedOnFollowing && (
                <FlatList
                  data={followingData}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => renderFollowersCards(item)}
                  contentContainerStyle={{ columnGap: 10 }}
                  style={{ marginHorizontal: 5 }}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          )}
        </View>
      </View>
   
    );
  };

  return (
    <SafeAreaView>
      <ScrollView 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
      <View>
        <Ionicons
          name="arrow-back"
          size={26}
          color="black"
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: 10, marginBottom: 6 }}
        />
      </View>
      {loading ? (
        <View
        >
          {renderUserProfileSkeleton()}
        </View>
      ) : (
        <View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              border: "1px solid grey",
              marginHorizontal: 20,
              padding: 40,
            }}
          >
            {renderUserProfileDataCard()}
          </View>
          {(clikedOnFollowers || clickedOnFollowing) &&
            renderFollwersAndFollowingCardWrapper()}
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userInfoLabel: {
    fontWeight: "bold",
    fontSize: 15,
  },
  userInfoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 20,
  },
  avatarSkeleton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd", 
    marginRight: 15,
  },
  infoSkeleton: {
    flex: 1,
  },
  skeletonText: {
    width: "80%",
    height: 15,
    backgroundColor: "#ddd", 
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  skeletonButton: {
    width: "40%",
    height: 30,
    backgroundColor: "#ddd", 
    borderRadius: 5,
  },
  followerAndFollowingWrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    border: "1px solid grey",
    marginHorizontal: 20,
    padding: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 10,
  },
  flatListContainer: {
    columnGap: 10,
    marginHorizontal: 5,
  },
});

export default UserProfileScreen;
