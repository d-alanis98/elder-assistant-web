import React, { useState, useCallback } from 'react';
import { Redirect, useHistory } from 'react-router';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import Button from '../../../Shared/components/Layout/Buttons/Button';
import Divider from '../../../Shared/components/Layout/Divider/Divider';
import PasswordInput from '../../../Shared/components/Layout/Input/PasswordInput/PasswordInput';
import ImageSelector, { ImageSelectorOptionData } from '../../../Shared/components/Layout/Input/ImageSelector/ImageSelector';
//Styled components
import { RegisterInput, RegisterFormContainer } from './Register.styles';
//Hooks
import { useAppSelector } from '../../../Shared/store/hooks';
//API
import { register } from '../../infrastructure/userAuthenticationApi';




const Register: React.FC = () => {
    /**
     * Hooks
     */
    //State
    const [userData, setUserData] = useState<UserData>(initialUserData);
    //History
    const history = useHistory();
    //App state selector
    const { loggedIn } = useAppSelector(state => state.user);

    /**
     * Functions
     */
    const handleFieldChange = useCallback((field: string, text: string) => {
        setUserData({
            ...userData,
            [field]: text
        });
    }, [userData]);

    const handleUserTypeChange = useCallback((userType: string) => {
        setUserData({
            ...userData,
            type: userType,
        });
    }, [userData]);

    const submit = useCallback(async () => {
        try {
            const createdUser = await register(userData);
            /**
             * @todo Reemplazar por createNotification del hook de notificaciones
             */
            alert(`Felicidades ${createdUser.name} ${createdUser.lastName}, la cuenta se ha creado con éxito. Ya puede iniciar sesión`);
            history.push('/login');
        } catch(error) {
                        /**
             * @todo Reemplazar por createNotification del hook de notificaciones
             */
            alert(error.message);
        }
    }, [userData, history]);


    const isValid = useCallback(() => validateData(userData), [userData]);

    if(loggedIn)
        return <Redirect to = '/' />

    return (
        <RegisterScrollContainer>
            <RegisterFormContainer>
                <RegisterTitle>Crear cuenta</RegisterTitle>
                <FormLabel>Nombre: </FormLabel>
                <RegisterInput 
                    placeholder = 'Nombre'
                    onChange = { event => handleFieldChange('name', event.target.value) }
                />
                <FormLabel>Apellido: </FormLabel>
                <RegisterInput 
                    placeholder = 'Apellido'
                    onChange = { event => handleFieldChange('lastName', event.target.value) }
                />
                <FormLabel>Correo electrónico: </FormLabel>
                <RegisterInput 
                    placeholder = 'Correo electrónico'
                    onChange = { event => handleFieldChange('email', event.target.value) }
                />
                <FormLabel>Contraseña: </FormLabel>
                <PasswordInput 
                    placeholder = 'Contraseña'
                    onChange = { event => handleFieldChange('password', event.currentTarget.value) }
                />
                <FormLabel>Fecha de nacimiento: </FormLabel>
                <RegisterInput 
                    placeholder = 'Fecha de nacimiento'
                    onChange = { event => handleFieldChange('dateOfBirth', event.target.value) }
                />
                { /** @todo Terminar de implementar en mobile (en web no tiene soporte) <DateInput /> */ }
                <FormLabel>Tipo de usuario</FormLabel>
                <ImageSelector 
                    selected = { userData.type }
                    options = { userTypeOptions }
                    setSelected = { handleUserTypeChange }
                />
                <Divider />
                <SubmitButton 
                    submit = { submit }
                    validated = { isValid() }
                />
            </RegisterFormContainer>
        </RegisterScrollContainer>
    )
}

export default Register;


//Internal components
const RegisterScrollContainer: React.FC = ({ children }) => (
    <div
        style = {{
            flex: 1,
            padding: 15,
            backgroundColor: '#457b9d',
        }}
    >
     { children }
    </div>
);

const RegisterTitle: React.FC = ({ children }) => (
    <Label
        fontSize = { 24 }
        fontWeight = '500'
        style = {{ alignSelf: 'center' }}
    >
        { children }
    </Label>
);

const FormLabel: React.FC = ({ children }) => (
    <Label 
        fontSize = { 20 }
        fontWeight = '500'
        style = {{ marginTop: 10, marginBottom: 5 }}
    > 
    { children }
    </Label>
);

interface SubmitButtonProps {
    submit: () => void;
    validated: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    submit,
    validated
}) => (
    <Button
        width = '75%'
        margin = '20px'
        onClick = { submit }
        disabled = { !validated }
        buttonType = 'primary'
        accessibilityLabel = 'Register button'
    >
        Crear cuenta
    </Button>
)

//Internal helpers
interface UserData {
    name: string;
    type: string;
    email: string;
    password: string;
    lastName: string;
    dateOfBirth: string;
}

const initialUserData = {
    name: '',
    type: '',
    email: '',
    password: '',
    lastName: '',
    dateOfBirth: ''
}

//User type options
const userTypeOptions: ImageSelectorOptionData[] = [
    {
        value: 'PRIMARY',
        imageSource: '/assets/illustrations/pablo-816.png',
        description: <>
            <Label fontWeight='500'>{ 'Principal\n' }</Label>
            <Label fontSize = { 17 }>Usuario de la tercera edad que puede vincular dispositivos</Label>
        </>
    },
    {
        value: 'SECONDARY',
        imageSource: '/assets/illustrations/pluto-180.png',
        description: <>
            <Label fontWeight='500'>{ 'Suscriptor\n' }</Label>
            <Label fontSize = { 17 }>Puede suscribirse a la actividad de un usuario primario</Label>
        </>
    }
]

//Helper functions
const validateData = (userData: UserData) => (
    userData.name && 
    userData.email && 
    userData.type && 
    userData.password && 
    userData.lastName && 
    userData.dateOfBirth
) ? true : false;