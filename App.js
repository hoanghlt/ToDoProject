import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modelIsVisible, setModalIsVisible] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentEnteredGoals => [...currentEnteredGoals, {text: enteredGoalText, id: Math.random().toString()}]);
    endAddGoalHandler();
  };

  function deleteGoalItem(id) {
    setCourseGoals(currentEnteredGoals => {
      return currentEnteredGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style='auto'/>
      <View style={styles.appContainer}>
        <Button title='Add New Goal' color='#5e0acc' onPress={startAddGoalHandler}/>
        <GoalInput visible={modelIsVisible} addGoal={addGoalHandler} cancelGoal={endAddGoalHandler}/>
        <View style={styles.goalContainer}>        
          <FlatList data={courseGoals} renderItem={(itemData) => {
            return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalItem}/>;
          }}
          keyExtractor={(item, index) => {
            return index;
          }}
          alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16    
  },  
  goalContainer: {
    flex: 5
  }
});
