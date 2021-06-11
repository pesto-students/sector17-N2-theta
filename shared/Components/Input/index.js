import InputStyle from "./Style";
const Input = (props) => {
  return (
    <InputStyle>
        <input
          type={props.type}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          required={props.required}
        />
    </InputStyle>
  );
};

export default Input;
