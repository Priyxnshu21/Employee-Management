import { StyleSheet, Text, View } from 'react-native'; // Ensure View is imported
import { Redirect } from 'expo-router';

export default function Index() {
  return (
    // Wrap the content that needs styling within a <View> component
    <View style={Styles.container}>
      <Redirect href="/(home)" />
       <Text> hello </Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});