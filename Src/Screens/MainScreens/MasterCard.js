import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  Entypo,
  Ionicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
// dimension

const { width, height } = Dimensions.get("window");

const widhtToDp = (number) => {
  let givenWidth = typeof number === "number" ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = (number) => {
  let givenheight = typeof number === "number" ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * givenheight) / 100);
};

const MasterCard = () => {
  return (
    <SafeAreaView style={styles.main__container}>
      {/* ---------------------------------Upper Container------------------------------- */}
      <View style={styles.upper__container}>
        <AntDesign name="arrowleft" style={styles.upper__icon__sty} />
        <Text style={styles.upper__txt__sty}>MasterCard</Text>
      </View>
      {/* -----------------------------Middle Container-------------------------- */}
      <View style={styles.middle__container}>
        <View style={styles.middle__partition}></View>
        <View style={styles.middle__CardDetail}>
          <FontAwesome
            name="cc-mastercard"
            style={styles.middle__CardIcon__sty}
          />
          <Text style={styles.middle__CardText__sty}> **** 2982</Text>
        </View>
        <View style={styles.card__exp__cont}>
          <Text style={styles.card__exp__txt}>Expiry date</Text>
          <Text style={styles.card__exp__txt1}>04/2024</Text>
        </View>
        <TouchableOpacity style={styles.card__edit__cont}>
          <Feather name="edit" style={styles.edit__icon} />
          <Text style={styles.card__edit__txt}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.middle__partition1}></View>
        {/* ----------------lower container-------------- */}
        <View style={styles.lower__remove}>
          <Entypo name="circle-with-cross" style={styles.lower__icon} />
          <Text style={styles.lower__txt}>Remove payment method</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MasterCard;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: "#f2f2f2",
    flex: 1,
  },
  upper__container: {
    marginTop: heightToDp("3%"),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: widhtToDp("5%"),
  },
  upper__icon__sty: {
    fontSize: widhtToDp("7%"),
  },
  upper__txt__sty: {
    marginLeft: widhtToDp("5%"),
    fontSize: widhtToDp("5%"),
  },
  middle__container: {
    paddingHorizontal: widhtToDp("3%"),
    marginTop: heightToDp("12%"),
  },
  middle__partition: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.23)",
    width: widhtToDp("90%"),
    alignSelf: "center",
  },
  middle__CardDetail: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: widhtToDp("5%"),
    marginTop: heightToDp("3%"),
  },
  middle__CardIcon__sty: {
    fontSize: widhtToDp("8%"),
  },
  middle__CardText__sty: {
    fontSize: widhtToDp("4.8%"),
    marginLeft: widhtToDp("2%"),
  },
  card__exp__cont: {
    marginTop: heightToDp("5%"),
    paddingHorizontal: widhtToDp("5%"),
  },
  card__exp__txt: {
    marginTop: heightToDp("1%"),
  },
  card__exp__txt1: {
    marginTop: heightToDp("1%"),
    fontSize: widhtToDp("4%"),
  },
  card__edit__cont: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: widhtToDp("5%"),
    marginTop: heightToDp("7%"),
  },
  edit__icon: {
    color: "#2E2C2CE8",
    fontSize: widhtToDp("6%"),
  },
  card__edit__txt: {
    fontSize: widhtToDp("4%"),
    marginLeft: widhtToDp("2%"),
  },
  middle__partition1: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.23)",
    width: widhtToDp("90%"),
    alignSelf: "center",
    marginTop: heightToDp("3%"),
  },
  lower__remove: {
    flexDirection: "row",
    paddingHorizontal: widhtToDp("5%"),
    marginTop: heightToDp("4%"),
  },
  lower__icon: {
    fontSize: widhtToDp("5%"),
    color: "red",
  },
  lower__txt: {
    color: "red",
    marginLeft: widhtToDp("5%"),
  },
});
