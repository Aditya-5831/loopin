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
import { signInSchema, SignInValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "../actions";

const SignInForm = () => {
  const [error, setError] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signIn(values);
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
          Sign in to Loopin
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold">Password</Label>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Password"
                        />
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
                  "Sign in"
                )}
              </Button>
              <span className="text-center">or</span>
              <Button variant="outline" size="lg">
                <FcGoogle className="size-5" />
                Sign in with Google
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
