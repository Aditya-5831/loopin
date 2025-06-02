"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "../actions";
import { Loader } from "lucide-react";

const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignUpValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) {
        setError(error);
      }
    });
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <div className="text-primary text-center text-xl font-bold">Loopin</div>
        <CardTitle className="text-center text-lg font-bold">
          Sign up to Loopin
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4 text-red-800">
                <p className="text-sm">{error}</p>
              </div>
            )}
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold">Username</Label>
                      <FormControl>
                        <Input {...field} placeholder="Username" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold">Email</Label>
                      <FormControl>
                        <Input {...field} placeholder="Email" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold">Password</Label>
                      <FormControl>
                        <Input {...field} placeholder="Password" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button size={"lg"} type="submit">
                {isPending ? (
                  <Loader className="size-5 animate-spin" />
                ) : (
                  "Sign up"
                )}
              </Button>
              <span className="text-center">or</span>
              <Button variant="outline" size="lg">
                <FcGoogle className="size-5" />
                Sign up with Google
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
