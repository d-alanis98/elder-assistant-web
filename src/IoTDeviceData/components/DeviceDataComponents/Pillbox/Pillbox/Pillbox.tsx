import React, { useCallback } from 'react';
//Styled components
import { PillBoxContainer, PillboxRow, PillboxSection, PillBoxSectionLabel } from './Pillbox.styles';

interface PillboxProps {
    activeSection: string;
}

const Pillbox: React.FC<PillboxProps> = ({
    activeSection
}) => {
    /**
     * Functions
     */
    const getSectionNumber = useCallback((rowIndex: number, sectionIndex: number) => (
        (rowIndex * 2) + sectionIndex + 1
    ), []);

    const getSectionKey = useCallback((rowIndex: number, sectionIndex: number) => (
        `Section_${ getSectionNumber(rowIndex, sectionIndex) }`
    ), [getSectionNumber]);

    return (
        <PillBoxContainer>
            {
                Array.from(new Array(7)).map((_, rowIndex) => (
                    <PillboxRow
                        key = { rowIndex }
                    >
                        {
                            Array.from(new Array(2)).map((_, sectionIndex) => (
                                <PillboxSection
                                    key = { getSectionKey(rowIndex, sectionIndex) }
                                    active = { activeSection === getSectionKey(rowIndex, sectionIndex) }
                                >
                                    <PillBoxSectionLabel>
                                        { getSectionNumber(rowIndex, sectionIndex) }
                                    </PillBoxSectionLabel>
                                </PillboxSection>
                            ))
                        }
                    </PillboxRow>
                ))
            }

        </PillBoxContainer>
    );
}

export default Pillbox;