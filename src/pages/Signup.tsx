import SignupForm from "../components/Signup/SignupForm";

export default function Signup() {
  return (
    <div className="min-h-screen  grid grid-cols-2 gap-20 bg-green-400">
      <img className="w-66 ml-auto my-auto" src="/assets/signup.png" alt="" />
      <SignupForm />
    </div>
  );
}
