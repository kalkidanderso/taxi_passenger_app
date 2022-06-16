import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
// import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

// import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";

// import FormData from 'FormData';

var formData = new FormData();

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    phone: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    } else if (inputs.phone.length !== 10 || !inputs.phone.startsWith("09")) {
      handleError("Please input the correct phone number", "phone");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    //   const bodys = {
    //     name: "Alem Girma",
    //     email: "alem@email.com",
    //     password: "alem@123",
    //     phoneNumber: "09177419",
    //     profileImage: "ereeee",
    //     city: "Addis Ababa",
    //     address: "Bole, Addis Ababa, Ethiopia"
    // }
    // formData.append("name", "Alex Girma");
    // formData.append("email", "alem@email.com");
    // formData.append("password", "alem@123");
    // formData.append("phoneNumber", "09177419");
    // formData.append("profileImage", "ereeee");
    // formData.append("city", "Addis Ababa");
    // formData.append("address", "Bole, Addis Ababa, Ethiopia");

    // let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Basic ');

    //   fetch('http://localhost:5000/api/passengers', {
    //     method: 'POST',
    //     headers:headers,
    //     body: JSON.stringify(bodys)
    // }).then((res) => {
    //   res.json()
    //   console.log(res)
    // }).catch((err) => console.log(err))
    //   setLoading(true);
    //   setTimeout(() => {
    //     try {
    //       setLoading(false);
    //       AsyncStorage.setItem('userData', JSON.stringify(inputs));

    navigation.navigate("LoginScreen");
    //     } catch (error) {
    //       Alert.alert('Error', 'Something went wrong');
    //     }
    //   }, 3000);
    // };
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
          marginTop: 60,
          marginLeft: 30,
        }}
      >
        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
          Taxi Dispatcher Passenger's App
        </Text>
        {/* <LocalTaxiIcon /> */}
        <View style={{ marginVertical: 20 }}>
          {/* <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          /> */}

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="0987645..."
            error={errors.phone}
          />
          {/* <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
           <Input
            onChangeText={text => handleOnchange(text, 'confirmationPassword')}
            onFocus={() => handleError(null, 'confirmationPassword')}
            iconName="lock-outline"
            label="Confirmation Password"
            placeholder="Confirm password"
            error={errors.confirmationPassword}
            password
          />
            <Input
            onChangeText={text => handleOnchange(text, 'city')}
            onFocus={() => handleError(null, 'city')}
            iconName="city"
            label="City"
            placeholder="Enter your city name"
            error={errors.city}
          />
            <Input
            onChangeText={text => handleOnchange(text, 'address')}
            onFocus={() => handleError(null, 'address')}
            iconName="address"
            label="Address"
            placeholder="Enter your Address"
            error={errors.address}
          /> */}
          <Button title="Get Started" onPress={validate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
