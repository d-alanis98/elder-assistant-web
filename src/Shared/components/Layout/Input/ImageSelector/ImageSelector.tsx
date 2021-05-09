import React from 'react';
//Components
import Label from '../../Labels/Label';
//Styled components
import { ImageSelectorAsset, ImageSelectorContainer, ImageSelectorOption } from './ImageSelector.styles';


export interface ImageSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
    options: ImageSelectorOptionData[];
    selected: string;
    setSelected: (value: string) => void;
    imageProperties?: React.HTMLAttributes<HTMLImageElement>;
    selectedBorderWidth?: string | number;
    selectedBorderColor?: string | number;
}

export interface ImageProps {
    selected: boolean;
    numberOfOptions: number;
    selectedBorderWidth?: string | number;
    selectedBorderColor?: string | number;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
    options,
    selected,
    setSelected,
    imageProperties,
    selectedBorderWidth,
    selectedBorderColor
}) => (
    <ImageSelectorContainer>
        {
            options.map((option: ImageSelectorOptionData) => (
                <ImageSelectorOption
                    key = { option.value }
                    onClick = { () => setSelected(option.value) }
                    selected = { selected === option.value }
                    numberOfOptions = { options.length }
                    selectedBorderWidth = { selectedBorderWidth }
                    selectedBorderColor = { selectedBorderColor }
                >
                    <ImageSelectorAsset
                        src = { option.imageSource }
                        { ...imageProperties }
                    />
                    <Label style={{ flexGrow: 1, textAlign: 'center' }}> { option.description } </Label>
                </ImageSelectorOption>
            ))
        }
    </ImageSelectorContainer>
);

export default ImageSelector;

//Helpers
export interface ImageSelectorOptionData {
    value: string;
    imageSource: any;
    description: string | React.ReactElement; 
}