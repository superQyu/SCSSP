import styled from 'styled-components';

interface Props {
  styles?: any;
  label: string|React.ReactNode;
  subLabel?: string | React.ReactNode;
}

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
  font-weight: bold;
  font-size: 16px;
  font-family: 微软雅黑;

  &::before {
    content: '';
    display: block;
    margin-right: 4px;
    width: 7px;
    height: 17px;
    background: #3662ec;
    border-radius: 9px;
  }
`;
export default ({ styles, label, subLabel }: Props) => {
  return (
    <>
      <Div style={{ ...styles }}>
        {label} <span>{subLabel}</span>
      </Div>
    </>
  );
};
