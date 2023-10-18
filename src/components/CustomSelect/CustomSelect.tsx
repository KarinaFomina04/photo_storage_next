import React, {FC, useState} from 'react';
import style from './CustomSelect.module.css'

const CustomSelect:FC<any> = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={style.customSelect}>
            <div className={style.selectedValue} onClick={toggleSelect}>
                {value}
                <i className={`arrow ${isOpen ? 'up' : 'down'}`}></i>
            </div>
            {isOpen && (
                <ul className={style.options}>
                    {options.map((option: string, index: number) => (
                        <li key={index} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomSelect;