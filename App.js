import 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const App = () => {
  return (
    <NavigationContainer>
      <Container>
        <AppNavigator />
      </Container>
    </NavigationContainer>
  );
};

export default App;
