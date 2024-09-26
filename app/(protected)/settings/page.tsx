import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <>
      <h1>setting page</h1>
      <div>{JSON.stringify(session)}</div>
      <form action={ async ()=> {
        'use server'
        await signOut();
      }}>
        <Button type="submit">Sign out</Button>
      </form>
    </>
  );
};

export default SettingsPage;
