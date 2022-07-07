import { ref } from "vue";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";

export default function () {
  const auth = getAuth();

  const user = ref(null);
  onAuthStateChanged(auth, (newUser) => {
    user.value = newUser;
  });

  async function signUp(email, password) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return user;
    } catch ({ code, message }) {
      handleError(code, message, "sign up");
    }
  }
  async function signIn(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch ({ code, message }) {
      handleError(code, message, "sign in");
    }
  }
  async function signOut() {
    try {
      await firebaseSignOut(auth);
    } catch ({ code, message }) {
      handleError(code, message, "sign out");
    }
  }

  function handleError(code, message, action) {
    // Extract error message: 'Firebase: xxxx (yy) -> xxxx'
    const extractedMessage = message.match(/Firebase: (.*) \(/)[1];

    // Extract error code: 'auth/xxxx -> xxxx'
    const extractedCode = code.match(/auth\/(.*)/)[1];

    console.log(`Couldn't ${action}: ${extractedMessage} (${extractedCode})`);
  }

  return {
    user,

    signUp,
    signIn,
    signOut,
  };
}
