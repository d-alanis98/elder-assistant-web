import styled from 'styled-components';
//Components
import TouchableIcon from '../../../Layout/Icons/TouchableIcon/TouchableIcon';
//Constants
import { layoutConstants } from '../../../Layout/Layout';
//Theme
import ThemeUtils from '../../../../utils/Theme/ThemeUtils';



export const HeaderItemContainer = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 0;
    padding: 1px;
    font-size: 1.65rem;
    @media (max-width: ${ layoutConstants.breakPoints.md }) {
        & > * {
            font-size: 1.45rem;
        }
    }
`;

interface HeaderItemContainerProps {
    active: Boolean;
}
export const HeaderItemIconContainer = styled.div`${({ 
    theme,
}) => `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    padding: 10px;
    &:hover {
        background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme) };
    }
    cursor: pointer;
`}`;

export const HeaderItemIcon = styled(TouchableIcon)<HeaderItemContainerProps>`${({ 
    theme,
    active,
}) => `
    cursor: pointer;
    color: ${ active ? theme.primaryColor : theme.secondaryFontColor };
`}`;

interface HeaderItemLabelProps {
    display?: boolean; 
}

export const HeaderItemLabel = styled.span<HeaderItemLabelProps>`${({ 
    theme,
    display
}) => `
    color: ${ theme.secondaryFontColor };
    cursor: pointer;
    margin-left: 0.5rem;
    display: ${ getDisplay(display) }
`}`;

const getDisplay = (display?: boolean) => display
    ? 'display: block'
    : `
        none;
        & > * {
            display: none;
        }
    `

