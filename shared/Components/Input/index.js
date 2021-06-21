import InputStyle from "./Style";

const Input = (props) => (
    <InputStyle>
        <input
          type={props.type}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          required={props.required}
          value={props.value}
          onChange={props.onChange}
        />
    </InputStyle>
  );

export default Input;
