import { FlatList, Button } from 'react-native';
import TaskItem from '../components/Task/TaskItem';
import styled from 'styled-components/native';

const TasksScreen = ({ route, navigation }) => {
  const { score, tasks } = route.params || {};

  return (
    <Container>
      <ScoreText>Current Score: {score}</ScoreText>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
      <Button title="Back to Game" onPress={() => navigation.goBack()} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const ScoreText = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

export default TasksScreen;
