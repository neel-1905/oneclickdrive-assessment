import { loginSchema } from "@/lib/validations/login.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { Loader2Icon } from "lucide-react";
import { useFeedback } from "@/context/FeedbackContext";
import { logAction } from "@/lib/apis/logs.actions";

const LoginForm = () => {
  const router = useRouter();
  const { show } = useFeedback();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });
  const { isSubmitting } = form.formState;

  const onLoginFormSubmit = async (data: z.infer<typeof loginSchema>) => {
    let result;
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    try {
      result = await res.json();
    } catch (error) {
      console.log(error);
      return;
    }

    if (!res.ok) {
      show("error", result?.error);
      return;
    }

    await logAction({
      action: "login",
      target_type: "user",
      target_id: result?.user?.id,
      user_id: result?.user?.id,
      user_name: data.email,
    });

    show("success", result?.message);

    router.replace("/dashboard");
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onLoginFormSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? <Loader2Icon className="animate-spin" /> : `Login`}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
