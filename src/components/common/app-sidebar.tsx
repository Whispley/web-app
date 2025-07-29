import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import SearchCommand from "@/components/common/SearchCommand";
import { TeamSwitcher } from "@/components/common/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  RiDashboardLine,
  RiTeamLine,
  RiUserFollowLine,
  RiMailLine,
  RiShieldCheckLine,
  RiSecurePaymentLine,
  RiBarChartLine,
  RiSettings3Line,
  RiQuestionLine,
  RiLogoutBoxLine,
  RiGlobalLine,
  RiCpuLine,
} from "@remixicon/react";

// This is sample data.
const data = {
  teams: [
    {
      name: "InnovaCraft",
      logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
    },
    {
      name: "Acme Corp.",
      logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
    },
    {
      name: "Evil Corp.",
      logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
    },
  ],
  navMain: [
    {
      title: "Core",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: RiDashboardLine,
        },
        {
          title: "Contacts",
          url: "/contacts",
          icon: RiUserFollowLine,
        },
        {
          title: "Templates",
          url: "/templates",
          icon: RiMailLine,
        },
        {
          title: "Campaigns",
          url: "/campaigns",
          icon: RiGlobalLine,
        },
        {
          title: "Analytics",
          url: "/analytics",
          icon: RiBarChartLine,
        },
      ],
    },
    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "Team",
          url: "/team",
          icon: RiTeamLine,
        },
        {
          title: "Usage & Billing",
          url: "/billing",
          icon: RiSecurePaymentLine,
        },
        {
          title: "Authentication",
          url: "/auth",
          icon: RiShieldCheckLine,
        },
        {
          title: "API & Webhooks",
          url: "/api",
          icon: RiCpuLine,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "Account Settings",
          url: "/settings",
          icon: RiSettings3Line,
        },
        {
          title: "Help & Support",
          url: "/help",
          icon: RiQuestionLine,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <hr className="border-t border-border mx-2 -mt-px" />
        <div className="w-full mt-3">
          <SearchCommand />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/60">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {item.items.map((navItem) => {
                  const isActive = location.pathname === navItem.url;
                  const isRouterLink = navItem.url.startsWith("/");

                  return (
                    <SidebarMenuItem key={navItem.title}>
                      <SidebarMenuButton
                        asChild
                        className="group/menu-button font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                        isActive={isActive}
                      >
                        {isRouterLink ? (
                          <Link to={navItem.url}>
                            {navItem.icon && (
                              <navItem.icon
                                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                                size={22}
                                aria-hidden="true"
                              />
                            )}
                            <span>{navItem.title}</span>
                          </Link>
                        ) : (
                          <a href={navItem.url}>
                            {navItem.icon && (
                              <navItem.icon
                                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                                size={22}
                                aria-hidden="true"
                              />
                            )}
                            <span>{navItem.title}</span>
                          </a>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <hr className="border-t border-border mx-2 -mt-px" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
              <RiLogoutBoxLine
                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                size={22}
                aria-hidden="true"
              />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
