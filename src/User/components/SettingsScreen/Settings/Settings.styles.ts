import styled from 'styled-components';
//Components
import Label from '../../../../Shared/components/Layout/Labels/Label';
import TextInput from '../../../../Shared/components/Layout/Input/TextInput/TextInput.styles';
import LabelWithIcon from '../../../../Shared/components/Layout/Labels/LabelWithIcon/LabelWithIcon';
import ThemeUtils from '../../../../Shared/utils/Theme/ThemeUtils';

export const SettingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.75rem 0;
`;

export const SettingTitle = styled(LabelWithIcon)
    .attrs(props => ({
        ...(props as Object),
        fontSize: '1.35rem'
    }))
`
    font-size: 2rem;
    margin-right: 0.5rem;
    margin-bottom: 0.8rem;
`;

export const SettingModifierContainer = styled.div`
    align-self: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const RadioButtonSetting = styled(TextInput)
    .attrs(props => ({
        ...(props as Object),
        type: 'radio'
    }))`
    margin: 0 0.35rem;
    width: 0.9rem;
    height: 0.9rem;
`;

export const SettingLabel = styled(Label)`
    font-size: 1.1rem;
    margin-right: 0.5rem;
`;

export const SettingLabelWithIcon = styled(LabelWithIcon)
    .attrs(props => ({
        ...(props as Object),
        fontSize: '1.1rem'
    }))`
    & * {
        cursor: pointer;
    }
`

export const SettingCard = styled.div`${({ theme }) => `
    display: flex;
    justify-content: flex-start;
    width: 90%;
    padding: 0.75rem 0.5rem;
    border-radius: 0.75rem;
    border: 1px solid ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.1) };
    cursor: pointer;
    & * {
        cursor: pointer;
    }
    &:hover {
        box-shadow: 1px 1px 5px ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.25) };
        transition: all 300ms;
    }
`}`