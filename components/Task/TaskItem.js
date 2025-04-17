import styled from 'styled-components/native'

const TaskItem = ({ task }) => {
  return (
    <TaskContainer completed={task.completed}> 
      <TaskText>{task.title} ({task.current}/{task.required})</TaskText>
       <TaskIndicator>{task.completed ? '✓' : '✗'}</TaskIndicator>
    </TaskContainer>
  );
};

const TaskContainer = styled.View`
  flex-direction:row;
  justify-content:space-between;
  padding: 15px;
  margin: 10px 0;
  background-color: ${props => props.completed ? '#d4edda' : '#e0e0e0'};
  border-radius: 5px;
`

const TaskText = styled.Text`
  font-size: 16;
`
 const TaskIndicator = styled.Text`
  font-weight: bold;
 `

export default TaskItem;