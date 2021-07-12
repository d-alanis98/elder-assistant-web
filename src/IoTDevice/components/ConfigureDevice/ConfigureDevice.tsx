import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
//Domain
import { IoTDevicePrimitives } from '../../domain/IoTDevice';
//Components
import EmptyData from '../../../Shared/components/Miscelaneous/EmptyData/EmptyData';
import ButtonWithIcon from '../../../Shared/components/Layout/Buttons/ButtonWithIcon/ButtonWithIcon';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
import PrimaryUserProtected from '../../../Shared/components/Screens/PrimaryUserProtected';
//Styled components
import { 
    ConfigureDeviceLabel,
    PillBoxConfigurationRow,
    ConfigureDeviceContainer,
    ConfigureDeviceNameInput,
    PillBoxConfigurationSectionKey,
    PillBoxConfigurationSectionInput,
    PillBoxConfigurationSectionContainer,
} from './ConfigureDevice.styles'; 
//Hooks
import useAlerts from '../../../Shared/store/hooks/alerts/useAlerts';
import useDevices from '../../../Shared/store/hooks/devices/useDevices';
//Helpers
import ObjectHelper from '../../../Shared/utils/Miscelaneous/ObjectHelper';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const ConfigureDevice: React.FC = () => {
    /**
     * Hooks
     */
    //History
    const history = useHistory();
    //Params
    const { deviceId } = useParams<ExpectedParams>();
    //Notifications
    const { createNotification } = useAlerts();
    //Devices hook
    const { getDeviceDataById, updateDeviceData } = useDevices();
    //Local state
    const [deviceData, setDeviceData] = useState<IoTDevicePrimitives|undefined>();
    const [deviceName, setDeviceName] = useState('');
    const [deviceConfiguration, setDeviceConfiguration] = useState<DeviceConfiguration>({ });
    //Callbacks
    const submit = useCallback(async () => {
        let name: string | undefined = deviceName,
        configuration: DeviceConfiguration | undefined = deviceConfiguration;
        //We validate the supplied name
        if(!deviceName)
            name = undefined;
        //We validate the configuration
        if(!configuration 
            || ObjectHelper.isEmpty(configuration)
            || Object.keys(configuration).length < 14
        )
            configuration = undefined;
        //We only make the request if a field changed
        if(!name && !configuration)
            return;
    
        await updateDeviceData({
            name,
            deviceId,
            configuration
        });
        //We create the success notification
        createNotification({
            type: 'SUCCESS',
            message: 'Dispositivo modificado con exito'
        });
        //We redirect to the devices view
        history.push('/devices');
        
    }, [
        history,
        deviceId,
        deviceName,
        updateDeviceData,
        createNotification,
        deviceConfiguration
    ]);
    //Effects
    useEffect(() => {
        if(!deviceId)
            return;
        setDeviceData(
            getDeviceDataById(deviceId)
        );
    }, [
        deviceId,
        getDeviceDataById
    ]);

    useEffect(() => {
        if(!deviceData)
            return;
        setDeviceName(deviceData.name);
        //We set the device configuration
        if(deviceData.configuration)
            setDeviceConfiguration(deviceData.configuration as DeviceConfiguration);
    }, [deviceData]);

    //Render
    if(!deviceData)
        return <EmptyData 
            text = 'Dispositivo no asociado al usuario'
        />
    return (
        <PrimaryUserProtected
            showFallback
        >
            <ScreenContainer
                section = 'Configuracion del dispositivo'
            >
                <ConfigureDeviceContainer>
                    <ConfigureDeviceLabel>
                        Nombre del dispositivo:
                    </ConfigureDeviceLabel>
                    <ConfigureDeviceNameInput 
                        onChange = { ev => setDeviceName(ev.target.value) }
                        value = { deviceName }
                    />
                    <ConfigurationRenderer 
                        deviceData = { deviceData }
                        deviceConfiguration = { deviceConfiguration }
                        setDeviceConfiguration = { setDeviceConfiguration }
                    />
                    <ButtonWithIcon 
                        icon = { faCheckCircle }
                        onClick = { submit }
                        buttonText = 'Actualizar'
                    />
                </ConfigureDeviceContainer>
            </ScreenContainer>
        </PrimaryUserProtected>
    )
}

export default ConfigureDevice;

//Internal components
interface ConfigurationRendererProps {
    deviceData: IoTDevicePrimitives;
    deviceConfiguration: DeviceConfiguration;
    setDeviceConfiguration: React.Dispatch<React.SetStateAction<DeviceConfiguration>>;
}
const ConfigurationRenderer: React.FC<ConfigurationRendererProps> = ({
    deviceData,
    deviceConfiguration,
    setDeviceConfiguration
}) => {
    /**
     * Hooks
     */
    //Callbacks
    const getSectionKey = useCallback((rowIndex: number, columnIndex: number) => (
        ( 2 * rowIndex + columnIndex ) + 1
    ), []);

    const getCurrentValue = useCallback((rowIndex: number, columnIndex: number) => {
        const configuration = deviceConfiguration[getSectionKey(rowIndex, columnIndex) - 1];
        return configuration || '';
    }, [
        getSectionKey,
        deviceConfiguration
    ])

    const handleDeviceConfiguration = (
        event: React.ChangeEvent<HTMLInputElement>, 
        sectionKey: number
    ) => {
        const { currentTarget: { value } } = event;
        setDeviceConfiguration({
            ...deviceConfiguration,
            [sectionKey - 1]: value,
        });
    }
    //Render
    if(deviceData.type !== 'PILLBOX')
        return null;
    return (
        <>
            <ConfigureDeviceLabel>
                Configuración de horarios por sección:
            </ConfigureDeviceLabel>
            {
                Array.from(new Array(7)).map((_, rowIndex) => (
                    <PillBoxConfigurationRow
                        key = { `PillBoxRow_${ rowIndex }` }
                    >
                        {
                            Array.from(new Array(2)).map((_, columnIndex) => (
                                <PillBoxConfigurationSectionContainer
                                    key = { `Section_${ rowIndex }_${ columnIndex }`}
                                >
                                    <PillBoxConfigurationSectionKey>
                                        { getSectionKey(rowIndex, columnIndex) }
                                    </PillBoxConfigurationSectionKey>
                                    <PillBoxConfigurationSectionInput 
                                        value = { getCurrentValue(rowIndex, columnIndex) }
                                        onChange = { event => handleDeviceConfiguration(
                                            event, 
                                            getSectionKey(rowIndex, columnIndex)
                                        ) }
                                    />  
                                </PillBoxConfigurationSectionContainer>
                            ))
                        }
                    </PillBoxConfigurationRow>
                ))
            }
        </>
    )
}

interface ExpectedParams {
    deviceId: string;
}

interface DeviceConfiguration {
    [key: string]: string;
}