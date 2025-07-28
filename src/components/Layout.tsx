import { AppSidebar } from "@/components/common/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserDropdown from "@/components/common/user-dropdown";
import FeedbackDialog from "@/components/common/feedback-dialog";
import { RiScanLine, RiUserFollowLine, RiSettings4Line } from "@remixicon/react";
import { Outlet, useLocation, Link } from "react-router-dom";
import ModeToggle from "@/components/common/mode-toggle";

export default function Layout() {
  const location = useLocation();

  // Determine the current page for breadcrumb
  const getCurrentPageInfo = () => {
    switch (location.pathname) {
      case "/dashboard":
        return { title: "Dashboard", icon: RiScanLine };
      case "/contacts":
        return { title: "Contacts", icon: RiUserFollowLine };
      case "/settings":
        return { title: "Settings", icon: RiSettings4Line };
      default:
        return { title: "Dashboard", icon: RiScanLine };
    }
  };

  const currentPage = getCurrentPageInfo();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard">
                      <RiScanLine size={22} aria-hidden="true" />
                      <span className="sr-only">Dashboard</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {location.pathname !== "/dashboard" && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{currentPage.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <ModeToggle />
            <FeedbackDialog />
            <UserDropdown />
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
