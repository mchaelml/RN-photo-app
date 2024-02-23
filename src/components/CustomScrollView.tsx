import { makeStyles } from "@src/Theme";
import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

interface ICustomScrollViewProps extends ScrollViewProps {}

const CustomScrollView = (props: ICustomScrollViewProps) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets)();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      decelerationRate="fast"
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
    >
      {props.children}
    </ScrollView>
  );
};

const useStyles = (insets: EdgeInsets) =>
  makeStyles(() => {
    return {
      container: {
        paddingBottom: insets.bottom ? insets.bottom : 0,
      },
    };
  });

export default CustomScrollView;
