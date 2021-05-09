import { createContext, Dispatch, SetStateAction } from 'react';


export interface CurrentScreenContextProps {
    currentScreen?: string,
    setCurrentScreen?: Dispatch<SetStateAction<string | undefined>>
}

const initialState: CurrentScreenContextProps = {
    currentScreen: ''
}

const CurrentScreenContext = createContext<CurrentScreenContextProps>(initialState);

export default CurrentScreenContext;