import React, { useState } from 'react';
//COmponents
import Label from '../../Labels/Label';
//Styled components
import { DateInputContainer } from './DateInput.styles';
//Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const DateInput: React.FC = () => {
    const [value, setValue] = useState();
    const [showDateInput, setShowInput] = useState(false);
    return (
        <>
            <DateInputContainer
                onClick = { () => setShowInput(prevState => !prevState) }
            >
                <DateValue 
                    value = { value }
                />
            </DateInputContainer>
        </>
    );
}

export default DateInput;


interface DateValueProps {
    value?: Date;
}

const DateValue: React.FC<DateValueProps> = ({ value }) => value
    ? <Label>{ value.toString() }</Label>
    : <SelectDateLabel />;


const SelectDateLabel = () => (
    <div
        style = {{ 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}
    >
        <FontAwesomeIcon
            icon = { faCalendar }
            size = '2x'
        />
        <Label
            style = {{ marginLeft: 10 }}
        >
            Seleccionar fecha
        </Label>
    </div>
)