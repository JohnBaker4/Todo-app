import { Link } from "react-router-dom" 
export const AuthenticationMode = Object.freeze({
  SignIn: 'Login',
  SignUp: 'SignUp'
})

export default function Authentication({authenticationMode}) {
  return (
    <div>
      <h3>{authenticationMode === AuthenticationMode.SignIn ? 'Sign in' : 'Sign up'}</h3>
      <form>
        <label>Email</label>
        <input placeholder='Email' />
        <label>Password</label>
        <input placeholder='Password' type='password' />
        <button type='submit'>{authenticationMode === AuthenticationMode.SignIn ? 'Login' : 'Submit'}</button>
        <Link>
          {authenticationMode === AuthenticationMode.SignIn ? 'No account? Sign up' : 'Already signed up? Sign in'}
        </Link>
      </form>
    </div>
  )
}

