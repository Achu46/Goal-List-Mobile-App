import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {
  const [input, setInput] = useState("");
  const [goals, setGoals] = useState([]);
  // let lastTap = null;

  const handle = () => {
    setGoals((curr) => [...curr, { text: input }])
    setInput("")
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles2.container2}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder='Add your Goal'
            style={styles2.input}
          />
          <TouchableOpacity onPress={handle} style={styles2.button}>
            <Text style={styles2.text}>Add Goal</Text>
          </TouchableOpacity>
        </View>
        <View style={style3.container3}>
          <Text style={style3.text3}>List of your Goals</Text>
          <ScrollView style={{ maxHeight: 300 }}>
            {goals.map((goal, index) => (
              <Text
                style={[
                  style3.goalText,
                  goal.completed && {
                    textDecorationLine: 'line-through',
                    color: 'gray',
                  },
                ]}
              >
                {goal.text}
              </Text>
            ))}
          </ScrollView>
        </View>
        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
});

const styles2 = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
  },
  text: {
    color: 'white',
    fontWeight: '500',
  },
});

const style3 = StyleSheet.create({
  container3: {
    width: '100%',
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
  },
  text3: {
    fontSize: 25,
    marginBottom: 10,
  },
  goalText: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    padding: 10
  },
});
