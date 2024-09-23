"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonprops {
  label: string;
  href: string;
}

export const BackButton = ({ href, label }: BackButtonprops) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
