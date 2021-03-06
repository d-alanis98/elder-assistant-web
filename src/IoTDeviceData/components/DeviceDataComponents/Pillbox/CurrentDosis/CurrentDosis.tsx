import React, { useEffect, useState } from 'react';
//Components
import Pillbox from '../Pillbox/Pillbox';
import LastUpdate from '../../../../../Shared/components/LastUpdate/LastUpdate';
import DeviceDataWidget, { BaseWidgetProps } from '../../../DeviceDataWidget/DeviceDataWidget';
//Styled components
import { CurrentDosisCompleteButton, CurrentDosisContainer, CurrentDosisLabel, NextDosisContainer, NextDosisLabel, NextDosisRow, NextDosisTimeLabel } from './CurrentDosis.styles';
//Icons
import { faCheck, faClock } from '@fortawesome/free-solid-svg-icons';


interface CurrentDosisProps extends BaseWidgetProps {
    eventData: CurrentSectionEventData;
}


export enum CurrentDosisStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
};

const CurrentDosis: React.FC<CurrentDosisProps> = ({ 
    event,
    eventData: currentDosis,
}) => {
    /**
     * Hooks
     */
    //State
    const [nextSection, setNextSection] = useState<PillboxScheduleType>({ });

    useEffect(() => {
        //Validation
        if(!currentDosis || !currentDosis.schedule || !(currentDosis.schedule instanceof Object))
            return;
        const numericSection = Number(currentDosis.section);
        //Definitions
        const getSchedule = () => {
            return currentDosis.schedule[numericSection - 1];
        }

        const getNextSections = () => (
            Object.entries(currentDosis.schedule)
                .filter(([sectionKey]) => (
                    Number(sectionKey) > numericSection - 1
                ))
        );

        const getSectionNumber = (sectionLabel: string) => Number(sectionLabel.split('_')[1] || 1);

        const getSectionLabel = (section: string) => (
            `Sección ${ getSectionNumber(section) }`
        );

        const setNextSectionData = () => {
            const currentSectionHour: string|undefined = getSchedule();
            //We validate the hour
            if(!currentSectionHour) return { };
            const sections = getNextSections();
            //We validate the sections
            if(!sections || sections.length === 0) return { };
            //We extract the data of the first item (the actual next dosis)
            const [[nextSectionKey, nextSectionHour]] = sections;
            setNextSection({
                hour: nextSectionHour,
                section: getSectionLabel(`Section_${ Number(nextSectionKey) + 1 }`)
            });
        }


        //Execution
        setNextSectionData();
        
    }, [currentDosis]);


    return (
        <DeviceDataWidget 
            icon = { faClock }
            widgetTitle = 'Pastillero'
        >
            <CurrentDosisContainer>
                <CurrentDosisLabel>Dosis actual</CurrentDosisLabel>
                <Pillbox 
                    activeSection = { `Section_${ currentDosis.section }` }
                />
            </CurrentDosisContainer>
            {
                currentDosis.status === CurrentDosisStatus.PENDING
                    ? <CompleteButton />
                    : null
            }
            <NextDosisContainer>
                <NextDosisRow>
                    <NextDosisLabel>Próxima dosis: </NextDosisLabel>
                    <NextDosisTimeLabel>{ nextSection?.hour }</NextDosisTimeLabel>
                </NextDosisRow>
                <NextDosisRow>
                    <NextDosisLabel>Próxima sección: </NextDosisLabel>
                    <NextDosisTimeLabel>{ nextSection?.section }</NextDosisTimeLabel>
                </NextDosisRow>
            </NextDosisContainer>
            <LastUpdate 
                issueDate = { event.issuedAt }
            />
        </DeviceDataWidget>
    );
}

export default CurrentDosis;

//Internal components
const CompleteButton: React.FC = () => (
    <CurrentDosisCompleteButton
        icon = { faCheck }
        color = '#fff'
        onClick = { () => { } }
        fontSize = { 17 }
        buttonType = 'primary'
        buttonText = 'Marcar como tomado'
    />
)

//Helpers
interface CurrentSectionEventData {
    section: string;
    status: CurrentDosisStatus;
    schedule: PillboxScheduleType;
}

type PillboxScheduleType = {
    [key: string]: string;
}