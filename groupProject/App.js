import React, { useState,useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
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

function Bookingscreen({ navigation }) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleBookAppointment = () => {
    // Validate date and time input
    if (!date || !startTime || !endTime) {
      Alert.alert('Please enter date, start time, and end time.');
      return;
    }

    // Validate time format (half hours and full hours)
    const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):(00|30)$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      Alert.alert("Invalid time format. Enter time in HH:mm format with full hours or half hours.");
      return;
    }

    // Ensure start and end times are only half hours and full hours
    const startMinutes = Number(startTime.split(':')[1]);
    const endMinutes = Number(endTime.split(':')[1]);

    if (startMinutes % 30 !== 0 || endMinutes % 30 !== 0) {
      Alert.alert('Start and end times must be in half-hour or full-hour increments.');
      return;
    }

    // Validate that start time is before end time
    const startTimeObj = new Date(`2000-01-01T${startTime}`);
    const endTimeObj = new Date(`2000-01-01T${endTime}`);

    const timeDifferenceInMilliseconds = endTimeObj - startTimeObj;
    const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

    if (timeDifferenceInHours < 1) {
      Alert.alert('There must be a minimum gap of 1 hour between start and end times.');
      return;
    }

    // Validate that the selected date is not in the past
    const currentDate = new Date();
    const selectedDate = new Date(`${currentDate.getFullYear()}-${date}T00:00:00`);

    if (selectedDate<currentDate) {
      Alert.alert('Selected date must be today or in the future.');
      return;
    }

    // Log the entered values
    console.log('Date:', date);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    // Perform additional logic if needed
  };
  return (
    <View style={styles.container}>
      <Text>Booking Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter date (MM-DD)"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter start time (HH:mm)"
        value={startTime}
        onChangeText={(text) => setStartTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter end time (HH:mm)"
        value={endTime}
        onChangeText={(text) => setEndTime(text)}
      />
      <Button title="Book Now" onPress={handleBookAppointment} />

      <Button
        title="Go to health and safety screen"
        onPress={() => navigation.navigate('Health')}
      />
      <Button
        title="Go to the blog post page"
        onPress={() => navigation.navigate('blog')}
      />
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
