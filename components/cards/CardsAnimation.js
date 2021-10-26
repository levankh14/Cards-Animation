import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Card from "./Card";

const cards = [
  require("../../assets/card1.png"),
  require("../../assets/card2.png"),
  require("../../assets/card3.png"),
];

const CardsAnimation = () => {
  const [toggle, setToggle] = useState(true);

  const isToggled = useSharedValue(0);

  useEffect(() => {
    isToggled.value = toggle ? 1 : 0;
  }, [toggle]);

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        return (
          <Card card={card} index={index} isToggled={isToggled} key={index} />
        );
      })}

      <TouchableOpacity
        style={{ backgroundColor: "red" }}
        onPress={() => {
          setToggle(!toggle);
          console.log("dasdasd", toggle);
        }}
      >
        <Text>See Cards</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    bottom: 100,
  },
  cards: {
    height: 200,
    width: 200,
  },
});

export default CardsAnimation;
