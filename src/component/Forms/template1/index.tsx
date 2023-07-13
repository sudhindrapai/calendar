import React, { FC, useState } from "react";
import FormBuilder from "../FormElements";
import Button from "../Button/button";
import Patterns from '../../../component/eventPatterns';
import './template1.scss'
interface TemplateOneResponse {
  title: string,
  titleOnCal:string,
  place: string,
  description:string
  patternType:string
}

interface TemplateOneProps{
  onCreate:(obj:TemplateOneResponse) => void
}

let formElement = [
    {
      elementType: "TEXTINPUT",
      value: "",
      id: "title",
      label: "Event Title",
      type: "text",
    },
    {
        elementType: "TEXTINPUT",
        value: "",
        id: "titleOnCal",
        label: "Event Title on Calendar",
        type: "text",
      },
      {
        elementType: "TEXTINPUT",
        value: "",
        id: "place",
        label: "Event Place",
        type: "text",
      },
      {
        elementType: "TEXTAREA",
        value: "",
        id: "description",
        label: "Description",
        type: "text",
      },
  ];

const Template:FC<TemplateOneProps> = (props) => {
  const {onCreate} = props;
  const [formElements, setFormElements] = useState(formElement);
  const [selectedPattern, setSelectedPattern] = useState<string>("")

  const handleTextChange = (formValue:string,id:string) => {
    let updatedValues = formElements.map((element) => {
        return {
            ...element,
            value: element.id === id ? formValue : element.value
        }
    });
    setFormElements(updatedValues);
  };

  const createEvent = (event:React.FormEvent) => {
    event.preventDefault();

    let eventDetails = {} as any;

    for (let formObj of formElements) {
      eventDetails[formObj.id] = formObj.value;
    }
    eventDetails["patternType"] = selectedPattern;
    console.log(eventDetails,"eventDetails")
    onCreate(eventDetails)
  };

  const addPatternToView = (patternType:string) => {
    setSelectedPattern(patternType)
  }

  return <><form onSubmit={createEvent} >
    <FormBuilder formElements={formElements} onChangeTextInput={handleTextChange} />
  </form>
  <Patterns title={"Title on calendar"} onPatternChange={addPatternToView} />
  <div className="buttonSection">
  <Button type={"submit"} size="" onBtnClick={createEvent}>Create</Button>
  </div>
  </>
};

export default Template;
