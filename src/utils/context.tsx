import React from 'react';

interface AuthContextType {
    user: any;
    setUser: any;
    signin: (user: Object) => void;
    signup: (user:any) => void;
    signout: (callback: VoidFunction) => void;
    modalstate:any;
    setModalState:any;
    signinpageActive:Boolean; // 
    setSigninPageActive:any; // 
  }
const AppContext = React.createContext<AuthContextType>(null!);
export default AppContext;
