import googleButton from './assets/btn_google_signin_dark_pressed_web.png';


function navigate(url) {
  window.location.href = url;
}

async function auth() {
  const response = await fetch("http://127.0.0.1:3000/request", {
    method: "POST",
  });

  const data = await response.json();
  navigate(data.url);
}

function App() {
  return (
    <>
      <h1>welcome</h1>
      <h3>Google OAuth</h3>
      <button type="button" onClick={() => auth()}>
        <img src={googleButton} alt="google" />
      </button>
    </>
  );
}

export default App;
