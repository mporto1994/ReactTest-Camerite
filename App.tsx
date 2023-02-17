import MainRoutes from './src/Routes';
import "./App.css"
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
      <MainRoutes style={styles.global} />
  );
}

const styles = StyleSheet.create({
  global: {
    fontFamily: 'Inter sans-serif',
  },
});