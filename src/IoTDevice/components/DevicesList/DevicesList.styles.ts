import styled from 'styled-components';
//Components
import TouchableIcon from '../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
import ButtonWithIcon from '../../../Shared/components/Layout/Buttons/ButtonWithIcon/ButtonWithIcon';
//Theme utils
import ThemeUtils from '../../../Shared/utils/Theme/ThemeUtils';
//Icons
import { faCog, faRedo } from '@fortawesome/free-solid-svg-icons';

export const DevicesListContainer = styled.div`
    display: flex;
    width: 100%;
    align-self: center;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    margin: 5px;
`;

export const LinkDeviceButton = styled(ButtonWithIcon)`
    margin: 20px 0px;
    align-self: flex-end;
`;

export const DevicesListItem = styled.div`${({ theme }) => `
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.05) };
    padding: 20px 10px;
    border-radius: 25px;
    margin-bottom: 10px;
`}`;

export const DeviceName = styled.p`${({ theme }) => `
    color: ${ theme.fontColor };
    font-size: 18px;
    flex-grow: 1;
    text-align: justify;
`}`;


export const DeviceSettings = styled(TouchableIcon).attrs(props => ({
    ...(props as Object),
    icon: faCog,
}))`
    width: 40px;
    font-size: 24px;
`;


export const DeviceRefreshButton = styled(TouchableIcon).attrs(props => ({
    ...(props as Object),
    icon: faRedo,
}))`${({ theme }) => `
    width: 30px;
    height: 30px;
    padding: 0.5rem;
    font-size: 16px;
    align-self: flex-end;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme) };
    border-radius: 20px;
    margin-right: 10px;
    margin-bottom: 10px;

    &:hover {
        box-shadow: 1px 1px 5px ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.25) };
        transition: all 300ms;
    }
`}`;