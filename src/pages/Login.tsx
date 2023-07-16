import LoginForm from "../components/Login/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen  grid grid-cols-2 gap-20 bg-green-400">
      <img
        className="w-44 ml-auto my-auto"
        src="/src/assets/login.png"
        alt=""
      />
      <LoginForm />
    </div>
  );
}
