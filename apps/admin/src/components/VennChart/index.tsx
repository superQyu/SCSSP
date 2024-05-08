import styled from 'styled-components';

interface Props {
  styles: any;
  value: number;
  size: number;
}

export default ({ styles, value, size }: Props) => {
  const Div = styled.div``;
  const CustomDiv = styled(Div)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${size}px;
    height: ${size}px;
    color: #fff;
    font-size: 45px;
    font-weight: 700;
    border-radius: 50%;
    opacity: 0.67;
  `;

  return (
    <>
      <CustomDiv style={styles}> {value}</CustomDiv>
    </>
  );
};
