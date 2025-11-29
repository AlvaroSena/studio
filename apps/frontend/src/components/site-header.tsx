import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { useAuth } from "@/contexts/AuthContext";

export function SiteHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="ml-auto flex items-center gap-2">
          <NavUser
            user={{
              name: user?.name ?? "",
              role: user?.role ?? "",
              avatar: user?.photoUrl ?? "",
            }}
            logout={() => logout()}
            isInHeader={true}
          />
        </div>
      </div>
    </header>
  );
}
