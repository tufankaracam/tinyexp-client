import css from './WelcomeCard.module.css';

export default function WelcomeCard({username="user",message="Welcome back!"}) {
  return (
    <div className={css.welcomecard}>
        <span className={css.message}>{message}</span>
        <span className={css.username}>{username}</span>
    </div>
  )
}
