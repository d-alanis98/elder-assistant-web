import React from 'react';
//Styled components
import { 
    FirstRenderBannerTitle,
    FirstRenderBannerImage,
    FirstRenderBannerContainer 
} from './UsersList.styles';

const FirstRenderBanner: React.FC = () => (
    <FirstRenderBannerContainer>
        <FirstRenderBannerTitle />
        <FirstRenderBannerImage />
    </FirstRenderBannerContainer>
);

export default FirstRenderBanner;