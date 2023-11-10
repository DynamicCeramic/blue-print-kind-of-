import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const supportedURL = 'https://www.aberdeenceramicsstudio.com/';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to booking"
          onPress={() => navigation.navigate('Booking')}
        />
        <Button
          title="Go to health and safety screen"
          onPress={() => navigation.navigate('Health')}
        />
        <Button
          title="go to the blog post page"
          onPress={() => navigation.navigate('blog')}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>
          Welcome to Aberdeen ceramic and our{' '}
          <OpenURLButton url={supportedURL}>Website</OpenURLButton>
        </Text>
      </View>
    </View>
  );
}

function Bookingscreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Booking Screen</Text>
        <Button
          title="Go to health and safety screen"
          onPress={() => navigation.navigate('Health')}
        />
        <Button
          title="go to the blog post page"
          onPress={() => navigation.navigate('blog')}
        />
      </View>
    </View>
  );
}

function HealthScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to booking"
        onPress={() => navigation.navigate('Booking')}
      />
      <Button
        title="go to the blog post page"
        onPress={() => navigation.navigate('blog')}
      />
    </View>
  );
}

function BlogScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to booking"
        onPress={() => navigation.navigate('Booking')}
      />
      <Button
        title="Go to health and safety screen"
        onPress={() => navigation.navigate('Health')}
      />
    </View>
  );
}

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
          fontWeight: 'bold',
          fontSize: 30,
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Booking" component={Bookingscreen} />
        <Stack.Screen name="Health" component={HealthScreen} />
        <Stack.Screen name="blog" component={BlogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999ea2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
