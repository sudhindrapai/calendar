import {FC} from 'react';

interface ButtonProps {
    type:"button" | "submit" | "reset";
    size:string;
    onBtnClick:(e:React.MouseEvent<HTMLElement>) => any,
    children: React.ReactNode;
}

const Button:FC<ButtonProps> = (props) => {
    const {children, size, type, onBtnClick} = props
    return <button type={type} onClick={onBtnClick}>
        {children}
    </button>
};

export default Button