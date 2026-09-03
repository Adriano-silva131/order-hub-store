import { hasSession } from "@/shared/lib/backend-client";
import { LogoutButton } from "@/features/auth";
import { NavbarShell } from "@/app/layouts/navbar-shell";

export async function Navbar() {
  const loggedIn = await hasSession();

  return <NavbarShell loggedIn={loggedIn} logoutSlot={loggedIn ? <LogoutButton /> : null} />;
}
