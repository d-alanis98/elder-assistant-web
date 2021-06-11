import React from 'react';

interface ConditionalRenderingProps {
    condition: Boolean;
}

const ConditionalRendering: React.FC<ConditionalRenderingProps> = ({
    condition, 
    children
}) => condition 
    ? <> { children } </>
    : null;

export default ConditionalRendering;