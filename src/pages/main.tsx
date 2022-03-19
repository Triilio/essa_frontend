import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";
import { AuthApiProvider } from '../providers/api.provider';
import AppContext from './../utils/context';


import Home from '../pages/home';
import Outside from '../pages/outside';
import SimpleModal from "../components/modals/simple";
import Orders from "../components/sections/orders.section";
import OrderDetails from "../components/sections/details.orders.section";
import Invoices from "../components/sections/invoices.section";
import Client from "../components/sections/clients.section";
import ClientDetails from "../components/sections/clients.details.section";



const Main = () => {
  console.log("state");
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<RequireNoAuth><Outside /></RequireNoAuth>} />
          <Route path="/" element={<Base children={<p></p>}/>} />
          <Route path="/orders" element={<Base><Orders /></Base>} />
            <Route path="/orders/:id" element={<Base><OrderDetails/></Base>} />
          <Route path="/invoices" element={<Base><Invoices /></Base>} />
            <Route path="/invoices/:id" element={<Base><Invoices/></Base>} />
          <Route path="/clients" element={<Base><Client /></Base>} />
            <Route path="/clients/:id" element={<Base><ClientDetails/></Base>} />
          <Route path="/submitted" element={<Base><Client /></Base>} />
        </Routes>
      </Router>
      <SimpleModal />
    </AuthProvider>
  );
}
function Base({ children }: { children: JSX.Element }) {
  return <RequireAuth><Home>{children}</Home></RequireAuth>;
}


function AuthProvider({ children }: { children: React.ReactNode }) {
  // alert("made it to the auth provider")
  let authApiProvider = new AuthApiProvider();
  let [user, setUser] = React.useState<any>(null);
  let [token, setToken] = React.useState<any>(null);
  let [modalstate, setModalState] = React.useState<any>({ simplemodal: { isOpen: false, icon: null, title: null, message: null } });

  let signin = (creds: any) => {
    return authApiProvider.Signin({ email: creds.email, password: creds.password });
  };

  let signout = (callback: VoidFunction) => {
    return authApiProvider.signout();
  };

  let signup = (user: any) => {
    return authApiProvider.signup(user);
  };

  var [signinpageActive, setSigninPageActive] = useState(true);
  // let setSigninPageActive = () => {
  //   signinpageActive = !signinpageActive;
  // }

  var [refreshStateTracker,setRefreshStateTracker] = useState({});


  let value = { user, setUser, signin, signup, signout, modalstate, setModalState, signinpageActive, 
    setSigninPageActive, token, setToken, refreshStateTracker, setRefreshStateTracker };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useAuth() {
  return React.useContext(AppContext);
}


function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    if (window.localStorage.getItem('user') != null) {
      // use has a login session saved
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function RequireNoAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}



// function PublicPage() {
//   let navigate = useNavigate();
//   let location: any = useLocation();
//   let auth = useAuth();

//   let from = location.state?.from?.pathname || "/";

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     let formData = new FormData(event.currentTarget);
//     let username = formData.get("username") as string;

//     auth.signin(username, () => {
//       // Send them back to the page they tried to visit when they were
//       // redirected to the login page. Use { replace: true } so we don't create
//       // another entry in the history stack for the login page.  This means that
//       // when they get to the protected page and click the back button, they
//       // won't end up back on the login page, which is also really nice for the
//       // user experience.
//       navigate(from, { replace: true });
//     });
//   }
//   return (
//     <Outside/>
//   );
// }

function ProtectedPage() {
  return <h3>Protected</h3>;
}
export default Main;