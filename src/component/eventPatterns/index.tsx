import React, {FC, useState} from 'react';
import './eventPatterns.scss'
interface PatternProps {
    patternType?: "PATTERN1" | "PATTERN2" | "PATTERN3" | "PATTERN4",
    title:string;
    onPatternChange:(pattern:string) => void
}

const Patters:FC <PatternProps> = (props) => {
    const {title,onPatternChange} = props;
    const [patternValue, setPatternValue] = useState("PATTERN1");

    const updatePatternValueHandler = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setPatternValue(event.target.value);
        onPatternChange(event.target.value);
    }

    return <div className='patternWrapper'>
        <form>
            <label htmlFor='selectPattern'>
                Select Pattern
            </label>
            <select id="selectPattern" onChange={updatePatternValueHandler}>
                <option value={"PATTERN1"}> PATTERN 1</option>
                <option value={"PATTERN2"}>PATTERN2</option>
                <option value={"PATTERN3"}>PATTERN3</option>
                <option value={"PATTERN4"}>PATTERN4</option>
            </select>
        </form>
        <div className={patternValue}>{title}</div>
    </div>
};

Patters.defaultProps = {
    title: "Title on calendar"
}

export default Patters