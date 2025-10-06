"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ChangePasswordForm {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export default function ChangePasswordPage() {
  const form = useForm<ChangePasswordForm>({
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  const handleChangePassword: SubmitHandler<ChangePasswordForm> = async (data) => {
    if (data.password !== data.rePassword) return toast.error("Passwords do not match");

    try {
      const res = await fetch("/api/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          password: data.password,
          rePassword: data.rePassword,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to change password");

      toast.success("Password updated successfully!");
      form.reset();
    } catch (err) {
      // ✅ استخدمنا type narrowing بدل any
      if (err instanceof Error) {
        toast.error(err.message || "Failed to change password");
      } else {
        toast.error("Failed to change password");
      }
    }
  };

  return (
    <div className="w-1/2 mx-auto my-12">
      <h1 className="text-2xl font-bold text-center mb-6">Change Password</h1>
      <form onSubmit={form.handleSubmit(handleChangePassword)}>
        <Input
          type="password"
          placeholder="Current Password"
          {...form.register("currentPassword", { required: true })}
          className="mb-2"
        />
        <Input
          type="password"
          placeholder="New Password"
          {...form.register("password", { required: true, minLength: 6 })}
          className="mb-2"
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          {...form.register("rePassword", { required: true, minLength: 6 })}
          className="mb-2"
        />
        <Button type="submit" className="mt-4 w-full">
          Update Password
        </Button>
      </form>
    </div>
  );
}
