"use client";

import { useAction } from "next-safe-action/hooks";
import { Button } from "@/shared/ui/button";
import { logoutAction } from "../actions";

export function LogoutButton() {
  const { execute, isExecuting } = useAction(logoutAction);

  return (
    <Button type="button" variant="secondary" onClick={() => execute()} disabled={isExecuting}>
      Sair
    </Button>
  );
}
