import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";

import {
  IconSchool,
  IconCreditCard,
  IconInnerShadowTop,
  IconReport,
  IconSettings,
  IconUsers,
  IconBriefcase,
  IconStretching,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Alunos",
      url: "/students",
      icon: IconUsers,
    },
    {
      title: "Colaboradores",
      url: "/collaborators",
      icon: IconBriefcase,
    },
    {
      title: "Studios",
      url: "/studios",
      icon: IconStretching,
    },
    {
      title: "Aulas",
      url: "/classes",
      icon: IconSchool,
    },
  ],
  navSecondary: [
    {
      title: "Planos",
      url: "/plans",
      icon: IconCreditCard,
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: IconSettings,
    },
  ],
  documents: [
    {
      name: "Relatórios",
      url: "/reports",
      icon: IconReport,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Define Pilates</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name ?? "",
            role: user?.role ?? "",
            avatar: user?.photoUrl ?? "",
          }}
          logout={() => logout()}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
