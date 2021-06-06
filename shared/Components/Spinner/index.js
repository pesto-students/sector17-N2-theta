import { Spinner as SpinnerStyle, SpinnerWrapper, SpinnerText } from "./Style";

const Spinner = ({ text }) => (
  <SpinnerWrapper>
    <SpinnerStyle withText={!!text} />
    {!!text && <SpinnerText>{text}</SpinnerText>}
  </SpinnerWrapper>
);

export default Spinner;
