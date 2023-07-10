import { FC } from "react";
import TextInput from "./TextInputElement";
import TextArea from "./textArea";
import './styles/formElementStyle.scss'
interface FormElementProps {
  elementType: string;
  value: string;
  id: string;
  label: string;
  type: string;
}

interface FormBuilderProps {
  formElements: FormElementProps[];
  onChangeTextInput: (value: string, id: string) => void;
}

const FormBuilder: FC<FormBuilderProps> = (props) => {
  const { formElements, onChangeTextInput } = props;

  let form = formElements.map((elementObj) => {
    let view = null;
    switch (elementObj.elementType) {
      case "TEXTINPUT":
        view = (
          <TextInput
            label={elementObj.label}
            id={elementObj.id}
            value={elementObj.value}
            type={elementObj.type}
            onValueChange={onChangeTextInput}
          />
        );
        break;
      case "TEXTAREA":
        view = (
          <TextArea
            label={elementObj.label}
            id={elementObj.id}
            value={elementObj.value}
            type={elementObj.type}
            onValueChange={onChangeTextInput}
          />
        );
        break;
    }
    return view;
  });
  return <>{form}</>;
};

export default FormBuilder;
