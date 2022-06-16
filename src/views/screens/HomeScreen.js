import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "../components/Button";
const HomeScree = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState("Kalkidan Derso");
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    // const userData = await AsyncStorage.getItem('userData');
    // if (userData) {
    // setUserDetails(JSON.parse(userData));
    setUserDetails("This is the detail page");
    // }
  };

  const logout = () => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );
    navigation.navigate("LoginScreen");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Welcome {userDetails?.fullname}
      </Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScree;
