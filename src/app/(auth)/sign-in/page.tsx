import { Metadata } from "next";
import SignInForm from "./SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const SignIn = () => {
  return (
    <div className="flex h-full w-full items-center justify-center py-20">
      <SignInForm />
    </div>
  );
};

export default SignIn;
