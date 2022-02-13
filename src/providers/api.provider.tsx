import * as React from "react";
import { useContext } from "react";
import axios from 'axios';
import AppContext from './../utils/context';
/**
 * This represents some generic auth provider API, like Firebase.
 */

interface signUpData {
  email: any;
  password: any;
}

class AuthApiProvider {
  baseurl = "http://localhost:3000"
  constructor(){
    axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-type": "application/json"
      }
    });
  }
   Signin = async  (data: signUpData) => {
     let res = null;
    await axios.post(`${this.baseurl}/auth/login`, data).then((data) => {
      window.localStorage.setItem('user', JSON.stringify(data));
      res = data.data;
    }).catch((error) => {
      res = null;
    }).finally(() => {

    })
    return res;
  };

  signout() {
    axios.post(`${this.baseurl}/auth/login`,).then((data) => {

    }).catch((error) => {

    }).finally(() => {

    })
  }

  async signup(user: any)  {
    var res = null;
    await axios.post(`${this.baseurl}/auth/register`, user).then((data) => {
      res = true;
    }).catch((error) => {
      res = false;
    }).finally(() => {

    })
    return res;
  }

  persistSession(user: Object) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  getPersistedSession(user: Object) {
    return localStorage.getItem("user");
  }

}
export { AuthApiProvider };
