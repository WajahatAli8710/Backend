import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isValid = username.length > 0 && password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      login(username, password);
      navigate('/');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <h1 className={styles.logo}>Instagram</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Phone number, username, or email"
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
              className={styles.loginBtn}
              disabled={!isValid}
            >
              Log In
            </button>
          </form>

          <div className={styles.divider}>
            <div className={styles.line} />
            <span className={styles.orText}>OR</span>
            <div className={styles.line} />
          </div>

          <button className={styles.fbLogin}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Log in with Facebook
          </button>

          <Link to="/forgot" className={styles.forgotLink}>
            Forgot password?
          </Link>
        </div>

        <div className={styles.signupCard}>
          <p>
            Don't have an account?{' '}
            <Link to="/register" className={styles.signupLink}>
              Sign up
            </Link>
          </p>
        </div>

        <div className={styles.getApp}>
          <p>Get the app.</p>
          <div className={styles.appBadges}>
            <div className={styles.badge}>App Store</div>
            <div className={styles.badge}>Google Play</div>
          </div>
        </div>
      </div>
    </div>
  );
}
