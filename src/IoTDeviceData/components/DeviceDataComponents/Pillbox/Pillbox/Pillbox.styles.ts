import styled from 'styled-components';
//Components
import Label from '../../../../../Shared/components/Layout/Labels/Label';
//Theme
import ThemeUtils from '../../../../../Shared/utils/Theme/ThemeUtils';

export const PillBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
`;

export const PillboxRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

interface PillBoxSectionProps {
    active?: boolean;
}

export const PillboxSection = styled.div<PillBoxSectionProps>`${({ 
    theme,
    active 
}) => `
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ active 
        ? theme.successColor 
        : ThemeUtils.getThemedTranslucidBackground(theme) 
    };
    border-radius: 20px;
    margin: 1px;
`}`;

export const PillBoxSectionLabel = styled(Label).attrs(props => ({
    ...(props as Object),
    fontSize: 17,
}))`
    font-weight: 100;
    opacity: 0.75;
`;