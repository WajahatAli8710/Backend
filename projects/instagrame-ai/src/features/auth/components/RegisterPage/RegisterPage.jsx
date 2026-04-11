import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './RegisterPage.module.scss';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const isValid =
    email.length > 0 &&
    fullName.length > 0 &&
    username.length > 0 &&
    password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      register(username, email, fullName, password);
      navigate('/');
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <h1 className={styles.logo}>Instagram</h1>
          <p className={styles.tagline}>
            Sign up to see photos and videos from your friends.
          </p>

          <button className={styles.fbSignup}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Log in with Facebook
          </button>

          <div className={styles.divider}>
            <div className={styles.line} />
            <span className={styles.orText}>OR</span>
            <div className={styles.line} />
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Mobile Number or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              {password.length > 0 && (
                <button
                  type="button"
                  className={styles.showBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              )}
            </div>

            <button
              type="submit"
              className={styles.signupBtn}
              disabled={!isValid}
            >
              Sign up
            </button>
          </form>

          <p className={styles.terms}>
            By signing up, you agree to our <span>Terms</span>,{' '}
            <span>Privacy Policy</span> and <span>Cookies Policy</span>.
          </p>
        </div>

        <div className={styles.loginCard}>
          <p>
            Have an account?{' '}
            <Link to="/login" className={styles.loginLink}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
