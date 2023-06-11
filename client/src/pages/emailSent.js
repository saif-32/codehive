import '../styles/email.css'
export const EmailSent = () => {

    return <div>
    <div className="email-container">
      <img src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
      <div className="email-card">
        <h1>The verification email has been <span class="light-yellow">sent to the following email:</span></h1>
        <div className='user-email-card'><h2>exampleemail@gmail.com</h2></div>
        <h3>Click the link in your email to verify your account. If you can't find the email, check
        your spam folder.</h3>
      </div>
    </div>
  </div>
};

