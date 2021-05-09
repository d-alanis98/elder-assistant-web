import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
//Props
import { DeviceDataWidgetProps } from './DeviceDataWidget';
//Theme
import { isDarkTheme } from '../../../Shared/components/Theme/constants/theme';
//Theme utils
import ThemeUtils from '../../../Shared/utils/Theme/ThemeUtils';
import { layoutConstants } from '../../../Shared/components/Layout/Layout';

/**
 * Constants
 */
const DEFAULT_ICON_SIZE     = 22;
const DEFAULT_BORDER_RADIUS = 25;
const DEFAULT_MARGIN_BOTTOM = 10;

/**
 * Components
 */
export const DeviceDataWidgetContainer = styled.div<DeviceDataWidgetProps>`${({ 
    theme,
    width,
    height, 
    borderRadius,
    marginBottom,
    backgroundColor
}) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    width: ${ width ? getDimensionWithUnits(width) : 'calc(50% - 2rem)' };
    height: ${ height ? getDimensionWithUnits(height) : 'auto' };
    background-color: ${ backgroundColor || ThemeUtils.getThemedTranslucidBackground(theme) };
    border-radius: ${ borderRadius || DEFAULT_BORDER_RADIUS }px;
    margin-bottom: ${ marginBottom || DEFAULT_MARGIN_BOTTOM }px;
    margin-right: 1.5rem;
    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        width: 100%;
        margin-right: 0;
    }
`}`;

export const DeviceDataWidgetTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 5px;
    margin-bottom: 5px;
`;

interface DeviceDataWidgetIconProps {
    iconSize?: number;
}

export const DeviceDataWidgetTitleIcon = styled(FontAwesomeIcon)<DeviceDataWidgetIconProps>`${({ 
    theme,
    iconSize 
}) => `
    color: ${ isDarkTheme(theme) ? theme.fontColor : '#777' };
    font-size: ${ iconSize || DEFAULT_ICON_SIZE }px;
`}`;


export const DeviceDataWidgetTitleText = styled(Label)`
    margin-left: auto;
    margin-right: auto;
    align-self: center;
    font-size: 1.45rem;
`;

//Helpers

const getDimensionWithUnits = (dimension: string | number) => typeof dimension === 'number'
    ? `${ dimension }px`
    : dimension;