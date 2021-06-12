import styled from'styled-components';

interface FlexProps {
    flexWrap?: string;
    flexGrow?: string | number;
    direction: string;
    alignItems?: string;
    justifyContent?: string;
}

export const Flex = styled.div<FlexProps>`${({ 
    flexWrap,
    flexGrow,
    direction,
    alignItems,
    justifyContent
}) => ` 
    display: flex;
    flex-direction: ${ direction };
    flex-grow: ${ flexGrow };
    flex-wrap: ${ flexWrap };
    align-items: ${ alignItems };
    justify-content: ${ justifyContent };
`}`;


export const FlexRow = styled(Flex)
    .attrs(props => ({
        ...(props as Object),
        direction: 'row'
    }))``;

export const FlexColumn = styled(Flex)
    .attrs(props => ({
        ...(props as Object),
        direction: 'column'
    }))``;