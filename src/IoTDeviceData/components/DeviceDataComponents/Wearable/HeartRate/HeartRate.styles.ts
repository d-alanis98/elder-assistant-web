import styled from 'styled-components';
//Components
import Label from '../../../../../Shared/components/Layout/Labels/Label';
import LabelWithIcon from '../../../../../Shared/components/Layout/Labels/LabelWithIcon/LabelWithIcon';
import TouchableIcon from '../../../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
import { FlexColumn, FlexRow } from '../../../../../Shared/components/Layout/Containers/Flexbox.styles';
//Icons
import { faHeart } from '@fortawesome/free-solid-svg-icons';
//Theme
import ThemeUtils from '../../../../../Shared/utils/Theme/ThemeUtils';


export const HeartRateContainer = styled(FlexColumn)`
    align-items: center;
`;

export const HeartRateEntry = styled(FlexRow)`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.75rem;
`;

interface HeartRateIconProps {
    heartRateStatus: HeartRateStatus;
}

export const HeartRateIcon = styled(TouchableIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faHeart
    }))<HeartRateIconProps>`${({
        heartRateStatus
    }) => `
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 6rem; 
    color: ${ heartRateColorsDictionary[heartRateStatus].fontColor };
    border: 2px solid ${ heartRateColorsDictionary[heartRateStatus].backgroundColor };
    background-color: ${ heartRateColorsDictionary[heartRateStatus].borderColor };
    margin: 0.75rem auto; 
`}`;

export const HeartRateEntryEmphasis = styled(Label)<HeartRateIconProps>`
    font-size: 1.5rem;
    margin: 0.5rem 0;
    opacity: 0.9;
    font-weight: 500;
    color: ${({ 
        theme,
        heartRateStatus 
    }) => ThemeUtils.isDarkMode(theme)
        ? heartRateColorsDictionary[heartRateStatus].borderColor
        : heartRateColorsDictionary[heartRateStatus].fontColor 
    };
`;

export const HeartRateEntryTitle = styled(LabelWithIcon)
    .attrs(props => ({
        ...(props as Object),
        fontSize: '1.2rem'
    }))`
    font-weight: 700;
`;

export const HeartRateEntryText = styled(Label)`
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0.75rem 0;
    margin-right: 0.5rem;
`;

export const HeartRateSubText = styled(Label)`
    font-size: 0.9rem;
    opacity: 0.9;
`;


//Helpers
const heartRateColorsDictionary = {
    excellent: {
        fontColor: '#0f5132',
        borderColor: '#badbcc',
        backgroundColor: '#d1e7dd',
    },
    moderate: {
        fontColor: '#664d03',
        borderColor: '#ffecb5',
        backgroundColor: '#fff3cd',
    },
    outOfRange: {
        fontColor: '#842029',
        borderColor: '#f5c2c7',
        backgroundColor: '#f8d7da',
    }
}

type HeartRateStatus = keyof typeof heartRateColorsDictionary;



