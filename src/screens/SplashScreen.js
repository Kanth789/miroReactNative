import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { FOOTER_HEADING_ONE, FOOTER_HEADING_TWO } from "../constants/UI";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
        <LottieView
          source={require("../../assets/Animation - 1704341901933.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <View style={{marginHorizontal:10,paddingBottom:15}}>
        <Text style={styles.footerHeadingone}>{FOOTER_HEADING_ONE}</Text>
        <Text style={styles.footerHeadingTwo}>
          {FOOTER_HEADING_TWO}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'skyblue'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    height: 100,
    alignSelf: "center",
  },
  footerHeadingone: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  footerHeadingTwo: {
    fontSize: 20,
    fontWeight: "300",
    color: "white",
  },
});

export default SplashScreen;
