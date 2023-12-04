import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex gap-x-2">
          <p className="font-bold text-xl">Employee Management App</p>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
