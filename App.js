import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Index from './app/index'; // ✅ Correct import

export default function App() {
  return (
    <View style={styles.container}>
      <Index />  {/* ✅ Show your index.js content */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
