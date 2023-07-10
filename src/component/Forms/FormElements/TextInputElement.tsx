import React, {FC} from 'react';
import './styles/formElementStyle.scss'

interface TextInputProps {
    value:string;
    id:string;
    label: string;
    type: string;
    onValueChange: (value:string,id:string) => void
}

const TextInputElement:FC<TextInputProps> = (props) => {
    const {value, id, label, type, onValueChange} = props;

    const handleOnValueChange = (event: React.ChangeEvent <HTMLInputElement>) => {
        onValueChange(event.target.value,id);
    }

    return <div className='ElementWrapper'>
    <label htmlFor={id}>{label}</label>
    <input type={type} value={value} id={id} onChange={handleOnValueChange} />
    </div>
};

export default TextInputElement