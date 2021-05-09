import React, { useCallback, useState } from 'react';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import Button from '../../../Shared/components/Layout/Buttons/Button';
import Divider from '../../../Shared/components/Layout/Divider/Divider';
import PasswordInput from '../../../Shared/components/Layout/Input/PasswordInput/PasswordInput';
//Actions
import { loginAction } from '../../../Shared/store/reducers/userDuck';
//Hooks
import { useAppDispatch, useAppSelector } from '../../../Shared/store/hooks';
//Styled components
import { LoginContainer, LoginFormContainer, LoginIllustration, LoginInput, RegisterLinkContainer } from './Login.styles';
//Styles
import { lightTheme } from '../../../Shared/components/Theme/constants/theme';
import { Redirect } from 'react-router';

const Login: React.FC = () => {
    //Hooks
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //State selector
    const { loggedIn } = useAppSelector(state => state.user);
    //State
    const [credentials, setCredentials] = useState<Credentials>(initialCredentials);

    const submit = useCallback(() => {
        dispatch(loginAction(credentials));
    }, [credentials, dispatch]);

    const handleFieldChange = useCallback((field: string, text: string) => {
        setCredentials({
            ...credentials,
            [field]: text
        });
    }, [credentials]);

    const navigateToRegister = useCallback(() => {
        console.log('Going to register')
    }, []);

    if(loggedIn)
        return <Redirect to = '/' />

    return (
        <LoginContainer>
            <LoginFormContainer>
                <LoginTitle>Iniciar sesión</LoginTitle>

                <FormLabel>Correo electrónico: </FormLabel>
                <LoginInput 
                    onChange = { event => handleFieldChange('email', event.target.value) }
                    placeholder = 'Correo electrónico'
                />
                <FormLabel>Contraseña: </FormLabel>
                <PasswordInput 
                    onChange = { event => handleFieldChange('password', event.currentTarget.value) }
                    placeholder = 'Contraseña'
                />
                <FormSubmitButton 
                    submit = { submit }
                    credentials = { credentials }
                />
                <Divider />
                <RegisterLink 
                    navigateToRegister = { navigateToRegister }
                />
            </LoginFormContainer>
            <LoginIllustration 
                src = '/assets/illustrations/pablo-816.png'
            />
        </LoginContainer>
    )
}

export default Login;

//Internal components

const LoginTitle: React.FC = ({ children }) => (
    <Label
        fontSize = { 24 }
        fontWeight = '500'
        style = {{ alignSelf: 'center' }}
    >
        { children }
    </Label>
)

const FormLabel: React.FC = ({ children }) => (
    <Label 
        fontSize = { 20 }
        fontWeight = '500'
        style = {{ marginTop: 20, marginBottom: 10 }}
    > 
    { children }
    </Label>
);

interface RegisterLinkProps {
    navigateToRegister: () => void;
}

const RegisterLink: React.FC<RegisterLinkProps> = ({ navigateToRegister }) => (
    <RegisterLinkContainer>
        <Label>
            ¿No tienes cuenta? 
        </Label>
        <div
            onClick = { navigateToRegister }
        >
            <Label
                color = { lightTheme.primaryColor }
                fontWeight = '500'
                margin = '0 5px'
                style = {{ marginTop: 'auto'}}
            >
                Crear una
            </Label>
        </div>
    </RegisterLinkContainer>
    
)

interface SubmitButtonProps {
    submit: () => void;
    credentials: Credentials;
}

const FormSubmitButton: React.FC<SubmitButtonProps> = ({ 
    submit,
    credentials
}) => (
    <Button 
        width = '75%'
        margin = '20px'
        onClick = { submit }
        disabled = { !credentials.email || !credentials.password }
        buttonType = 'primary'
        accessibilityLabel = 'Enviar formulario de login'
    >
        Enviar
    </Button>
);

//Helpers

interface Credentials {
    email: string;
    password: string;
}

const initialCredentials = { email: '', password: ''};