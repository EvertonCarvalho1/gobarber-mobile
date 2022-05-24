import React from 'react';

import { AuthProvider } from './auth';

//AuthContext.Provider é um componente que colocamos por volta dos componentes que queremos que tenham o contexto de autenticação.

// Todos os componentes dentro do contexto, terão acessos as informações do contexto, até aqueles componentes dentro dos componentes.

const AppProvider: React.FC = ({ children }) => {
    return (
        <AuthProvider>{children}</AuthProvider>
    )
}

export default AppProvider;
