import * as React from 'react';
import { useContext } from 'react';
import axios from 'axios';
import AppContext from './../utils/context';
import { resolve } from 'path/posix';
/**
 * This represents some generic auth provider API, like Firebase.
 */

interface signUpData {
  email: any;
  password: any;
}

class AuthApiProvider {
  constructor() {}

  baseurl = 'http://localhost:3000';

  appContext = useContext(AppContext);

  CreateOrder = (name: String, description: String, id: String) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/orders`, {
          name: name,
          description: description,
          id: id,
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  Signin = async (data: signUpData) => {
    let res = null;
    await axios
    .post(`${this.baseurl}/auth/login`, data)
    .then(data => {
      window.localStorage.setItem('user', JSON.stringify(data.data));
      // window.user = user;
        res = data.data;
      })
      .catch(error => {
        if (error.statusCode === 401) {
          // log user out cuz server doesn't recognise the token
          this.appContext.signout(() => {});
        }
        res = null;
      })
      .finally(() => {});
    return res;
  };

  signout = async () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    // axios.post(`${this.baseurl}/auth/login`,).then((data) => {
    //   //
    // }).catch((error) => {
    // if (error.statusCode === 401) {
    //   // log user out cuz server doesn't recognise the token
    //   this.appContext.signout(() => {});
    // }

    // }).finally(() => {

    // })
  };

  checkLoginState = async () => {
    var appContext = React.useContext(AppContext);
    var state = window.localStorage.getItem('user');
    if (state != null) {
      //  make state
      appContext.setUser(true);
    }
  };

  signup = async (user: any) => {
    var res = null;
    await axios
      .post(`${this.baseurl}/auth/register`, user)
      .then(data => {
        res = true;
      })
      .catch(error => {
        if (error.statusCode === 401) {
          // log user out cuz server doesn't recognise the token
          this.appContext.signout(() => {});
        }
        res = false;
      })
      .finally(() => {});
    return res;
  };

  getNegotiations = async (version: String) => {
    var res = null;
    await axios
      .get(`${this.baseurl}/orders/${version}`, {})
      .then(data => {
        res = data.data.data;
      })
      .catch(error => {
        if (error.statusCode === 401) {
          // log user out cuz server doesn't recognise the token
          this.appContext.signout(() => {});
        }
        alert(error);
        res = null;
      })
      .finally(() => {});
    return res;
  };

  /**
   *
   * @param id
   * @returns an order Object
   */
  getOneNegotiation = async (id: String) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseurl}/orders/one?id=${id}`)
        .then(data => {
          console.log(data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  /**
   *
   * @param id
   * @returns an order Object
   */
  newItem = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/orders/item/new`, data)
        .then(data => {
          console.log(data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  /**
   *
   * @param id
   * @returns an order Object
   */
  deleteItem = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/orders/item/remove`, data)
        .then(data => {
          console.log(data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  /**
   *
   * @param id
   * @returns an order Object
   */
  getClients = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/users/list/`, { type: data })
        .then(data => {
          console.log(data.data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  /**
   *
   * @param id
   * @returns an order Object
   */
  createClient = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/users/create`, data)
        .then(data => {
          console.log(data.data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  getOneUser = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/users/one`, data)
        .then(data => {
          console.log(data.data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  getUserActivity = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/orders/user`, data)
        .then(data => {
          console.log(data.data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  getMe = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseurl}/users/me`)
        .then(data => {
          console.log(data.data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  updateStatus = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/orders/updatestatus`, data)
        .then(data => {
          console.log(data.data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  // name, description, param.id, ordertype, company
  CreateOrderForCurrentUser = (
    name: any,
    description: any,
    userid: any,
    ordertype: any,
    company: any
  ) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/orders/`, {
          name: name,
          description: description,
          userid: userid,
          type: ordertype,
          backer: company,
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  uploadDoc = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/orders/uploaddoc`, data)
        .then(data => {
          console.log(data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  addPayment = async (data: any) => {
    return new Promise((resolve, reject) => {
      console.log('data', data);
      axios
        .post(`${this.baseurl}/orders/payment`, data)
        .then(data => {
          console.log(data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  removePayment = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/orders/payment/delete`, data)
        .then(data => {
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  addCategory = async (data: any) => {
    return new Promise((resolve, reject) => {
      console.log('data', data);
      axios
        .post(`${this.baseurl}/orders/category/new`, data)
        .then(data => {
          console.log(data.data);
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };

  removeCategory = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseurl}/orders/category/remove`, data)
        .then(data => {
          resolve(data.data);
        })
        .catch(error => {
          if (error.statusCode === 401) {
            // log user out cuz server doesn't recognise the token
            this.appContext.signout(() => {});
          }
          reject(error);
        })
        .finally(() => {});
    });
  };
}
export { AuthApiProvider };
