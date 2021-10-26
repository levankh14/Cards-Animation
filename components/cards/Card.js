import React, { useEffect } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  withDecay,
} from "react-native-reanimated";
import { withBouncing } from "react-native-redash";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = 100;
const CARD_HEIGHT = (16 / 10.7) * CARD_WIDTH;

const Card = ({ index, isToggled, card }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const bottom = useSharedValue(100);
  const rotate = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      rotate.value = withSpring(0);
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.startX;
      translateY.value = event.translationY + ctx.startY;
    },

    onEnd: ({ velocityX, velocityY }) => {
      translateY.value = withBouncing(
        withDecay(
          {
            velocity: velocityY * 2,
          },
          () => {
            // translateY.value = withTiming(0, { duration: 1000 });
            translateY.value = withSpring(0);
          }
        ),
        -height + 200,
        100 // optionally define boundaries for the animation,
      );

      translateX.value = withBouncing(
        withDecay(
          {
            velocity: velocityX * 2,
          },
          () => {
            // translateX.value = withTiming(6, { duration: 1000 });
            translateX.value = withSpring(6);
          }
        ),
        -width / 2 + 50,
        width / 2 - 50 // optionally define boundaries for the animation
      );
    },
  });
  useEffect(() => {
    translateX.value = withSpring(isToggled.value * (index - 1) * 40);
    rotate.value = withSpring(
      isToggled.value * 0.1 + (Math.PI / 10) * isToggled.value * (index - 1)
    );
  }, [isToggled.value]);

  const style = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,

      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate.value}rad` },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View key={index} style={[styles.overlay, style]}>
        <Image resizeMode="contain" style={styles.cards} source={card} />
      </Animated.View>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    justifyContent: "center",
  },
  cards: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
});
export default Card;
