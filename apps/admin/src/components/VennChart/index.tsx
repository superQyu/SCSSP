import styled from 'styled-components';

interface Props {
  styles: any;
  value: number;
  size: number;
}
const Div = styled.div``;
const CustomDiv = styled(Div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 45px;
  font-weight: 700;
  border-radius: 50%;
  opacity: 0.67;
`;

export default ({ styles, value, size }: Props) => {
  return (
    <>
      <CustomDiv style={{ ...styles, width: `${size}px`, height: `${size}px` }}> {value}</CustomDiv>
    </>
  );
};
