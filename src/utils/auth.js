import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { app } from './firebase'

const auth = getAuth(app)

async function signUp(email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = result.user
    console.log(result)
    return user
  } catch (error) {
    return error.message
      .substring(error.message.indexOf(' ') + 1)
      .replaceAll('Error (', '')
      .replaceAll(')', '')
      .replaceAll('-', ' ')
      .replaceAll('.', '')
  }
}

async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    console.log('User signed in:', user)
    return { status: true, user }
  } catch (error) {
    console.error('Error signing in:', error)
    return {
      status: false,
      message: error.message,
    }
  }
}

async function signUserOut(router) {
  try {
    await signOut(auth)
    console.log(auth)
    router.push('/')
    console.log('User signed out')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}

export { auth, signUp, signIn, signUserOut }
