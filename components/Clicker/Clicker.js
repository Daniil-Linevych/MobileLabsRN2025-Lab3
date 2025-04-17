import styled from 'styled-components/native'

const Clicker = ({ size = 100 }) => {
  return (
    <ClickerObject size={size}/>
  );
};

const ClickerObject = styled.View`
  background-color: #3498db;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  width: ${(props)=>props.size}px;
  height: ${(props)=>props.size}px;
`;

export default Clicker;