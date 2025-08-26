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
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function App() {
  const [input, setInput] = useState("");
  const [goals, setGoals] = useState([]);
  // let lastTap = null;

  const handle = () => {
    if (input.trim() === "") return;
    setGoals((curr) => [...curr, { text: input }])
    setInput("")
  }

  const toggleCompleted = (index) => {
    setGoals((curr) =>
      curr.map((goal, i) =>
        i === index ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (index) => {
    setGoals((curr) => curr.filter((_, i) => i !== index));
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles2.container2}>
          <BlurView intensity={70} tint="dark" style={styles2.blurWrapper}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Add your Goal"
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={styles2.inputGlass}
            />
          </BlurView>
          <TouchableOpacity onPress={handle} style={styles2.button}>
            <Text style={styles2.text}>Add Goal</Text>
          </TouchableOpacity>
        </View>
        <View style={style3.container3}>
          <Text style={style3.text3}>List of your Goals</Text>
          <ScrollView style={{ maxHeight: 600 }}>
            {goals.map((goal, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => toggleCompleted(index)}
                onLongPress={() => deleteGoal(index)}
                delayLongPress={400} // long press timing
              >
                <LinearGradient
                  colors={['#6a11cb', '#2575fc']} // Gradient colors
                  style={[
                    { borderRadius: 10, marginBottom: 10 },
                    style3.goalItem,
                    goal.completed && style3.completedGoal
                  ]}
                >
                  <Text
                    style={[
                      style3.goalText,
                      goal.completed && style3.completedText,
                    ]}
                  >
                    {goal.text}
                  </Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
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
    backgroundColor: '#000000ff', // Dark theme background
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
});

const styles2 = StyleSheet.create({
  blurWrapper: {
    flex: 1,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    overflow: 'hidden',           // important for rounded blur edges
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)', // subtle frosted border
    backgroundColor: 'rgba(255,255,255,0.04)', // tiny tint
    marginRight: 0,
    // soft shadow (Android + iOS)
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  inputGlass: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent', // keep transparent because blur wrapper gives the look
  },
  button: {
    backgroundColor: '#6a11cb',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#3A3AFF', // Vibrant button color
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
    shadowColor: '#000', // Shadow for depth
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
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
    color: '#E0E0E0', // Light gray for contrast
    fontWeight: 'bold',
  },
  goalItem: {
    width: 350,
    marginBottom: 10,
    borderRadius: 10,
    // backgroundColor: '#1E1E1E',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 1,
    borderColor: 'transparent', // We'll overlay gradient for border
  },
  goalText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#AAAAAA',
  },
});
