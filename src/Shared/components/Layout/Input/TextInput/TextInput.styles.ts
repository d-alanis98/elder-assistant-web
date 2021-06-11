import styled from 'styled-components';
//Theme
import ThemeUtils from '../../../../utils/Theme/ThemeUtils';

const TextInput = styled.input`${({ theme }) => `
    height: 60px;
    color: ${ theme.fontColor };
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.05) };
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 20px;
    border: none;
    &:focus {
        outline: none;
        border: 1px solid rgba(0,0,0,0.2);
    }
`}`;

export default TextInput;