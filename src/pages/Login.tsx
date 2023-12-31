import LoginForm from "../components/Login/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen  grid grid-cols-2 gap-20 bg-green-400">
      <img className="w-44 ml-auto mt-20" src="/assets/login.png" alt="" />
      <LoginForm />
    </div>
  );
}
