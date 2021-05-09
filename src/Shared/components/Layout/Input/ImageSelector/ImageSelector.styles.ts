import styled from 'styled-components';
//Props
import { ImageProps } from './ImageSelector';

export const ImageSelectorContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 10px;
`;

export const ImageSelectorOption = styled.div<ImageProps>`${({ 
    selected,
    numberOfOptions,
    selectedBorderWidth,
    selectedBorderColor,
}) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    text-align: center;
    width: ${ getImageWidth(numberOfOptions) }px;
    height: auto;
    border: ${ selected 
        ? `${ selectedBorderWidth || 2 }px solid ${ selectedBorderColor || 'rgba(0,0,0,0.1)' }` 
        : 'transparent' 
    };
    border-radius: 7px;
    margin-right: 10px;
    background-color: ${ selected
        ? 'rgba(0,0,0,0.07)'
        : 'transparent'
    };
`}`

export const ImageSelectorAsset = styled.img`
    width: 100%;
    height: 150px;
    aspect-ratio: 1;
    object-fit: contain;
`



const getImageWidth = (numberOfOptions:  number) => Math.floor(document.body.clientWidth / numberOfOptions) - 50;