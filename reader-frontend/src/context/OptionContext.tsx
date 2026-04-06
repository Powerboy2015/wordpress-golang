import { createContext, useContext, useState } from "react";

interface OptionContextVars {
    InReader: boolean;
    setReaderMode: (opt: boolean) => void;
}

const DEFAULT_OPTIONS: OptionContextVars = {
    InReader: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setReaderMode: (_opt: boolean) => {}
} 

const OptionContext = createContext<OptionContextVars | undefined>(DEFAULT_OPTIONS);

interface OptionContextProps {
    children: React.ReactNode;
}

export function OptionContextProvider({children}:OptionContextProps): React.ReactNode {
    const [InReader,setInReader] = useState<boolean>(false);

    const setReaderMode = (opt: boolean) => {
        setInReader(opt);
    }

    const OPTIONS: OptionContextVars = {
        InReader,
        setReaderMode
    } 
    return <OptionContext.Provider value={OPTIONS}>{children}</OptionContext.Provider>
}



// eslint-disable-next-line react-refresh/only-export-components
export function useOptionContext(): OptionContextVars {
    const context = useContext(OptionContext);
    if (!context) throw new Error("Option Context must be used within providers");
    return context;
}