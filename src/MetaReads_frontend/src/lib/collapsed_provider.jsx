import React, { createContext, useContext, useState } from "react";

const CollapsedContext = createContext(undefined);

export const CollapsedProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const contextValue = {
        collapsed,
        setCollapsed,
    };

    return (
        <CollapsedContext.Provider value={contextValue}>
            {children}
        </CollapsedContext.Provider>
    );
};

export const useCollapsed = () => {
    const context = useContext(CollapsedContext);
    if (!context) {
        throw new Error("useCollapsed must be used within a CollapsedProvider");
    }
    return context;
};
