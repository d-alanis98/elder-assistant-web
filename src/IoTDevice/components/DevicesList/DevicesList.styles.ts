import styled from 'styled-components';
//Components
import TouchableIcon from '../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
import ButtonWithIcon from '../../../Shared/components/Layout/Buttons/ButtonWithIcon/ButtonWithIcon';
//Theme utils
import ThemeUtils from '../../../Shared/utils/Theme/ThemeUtils';

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
    icon: 'cog',
    size: 24,
}))`
    width: 40px;
`;


export const DeviceRefreshButton = styled(TouchableIcon).attrs(props => ({
    ...(props as Object),
    icon: 'redo',
    size: 15
}))`${({ theme }) => `
    width: 30px;
    height: 30px;
    padding: 5px;
    align-self: flex-end;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme) };
    border-radius: 20px;
    margin-right: 10px;
    margin-bottom: 10px;
`}`;