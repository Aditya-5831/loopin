import { Metadata } from "next";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

const SignUp = () => {
  return (
    <div className="flex h-full w-full items-center justify-center py-20">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
