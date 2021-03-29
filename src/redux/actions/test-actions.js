import firebase from '../../utils/firebase';

const login = (payload) => {
  console.log('kjndn')
  return {
    type: 'login',
    payload
  }
}

const logout = () => {
  return {
    type: 'logout'
  }
}

const loginUsingEmailAndPassword = (payload) => {
  console.log(payload)
  let { email, password } = payload
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) =>{
      let db = firebase.firestore();
      db.collection("users").where("email", "==", email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dispatch(login({...doc.data(), id: doc.id}));
      });
      }).catch((error) => {
        console.log(error.message);
      })
    }).catch((error) => {
      console.log(error.message);
    })
  }
 }

 const signoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut().then(() => {
      dispatch(logout())
    }).catch((error) => {
      console.log(error)
    })
  }
 }

export { login, logout, loginUsingEmailAndPassword, signoutUser }