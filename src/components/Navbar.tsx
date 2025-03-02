import { IconBrandGithub, IconHome } from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";
// import { useLocation } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "",
    },

    {
      title: "Developer",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "www.github.com/NirajSalunke",
    },
  ];

  return (
    <div className="fixed bottom-5 bg-black dark rounded-lg left-1/2 -translate-x-[55%]">
      <FloatingDock items={links} />
    </div>
  );
};

export default Navbar;
