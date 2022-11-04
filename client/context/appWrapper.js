import { useContext } from 'react';
import { socket, SocketContext} from './socketContext';

export function AppWrapper({ children }) {
    return (
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    );
}

export function useSocketContext() {
    return useContext(SocketContext);
}