import { GitBranch } from "lucide-react";
import Link from "next/link";

export default function Branch() {
  return (
    <Link 
      href="/branches"
      className="group fixed bottom-4 right-4 flex items-center bg-white rounded-full 
        hover:pr-4 transition-all duration-300 ease-in-out border border-black/20"
    >
      <div className="p-2">
        <GitBranch className="w-4 h-4 text-black" />
      </div>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[100px] 
        transition-all duration-300 ease-in-out text-black">
        Contribute 💻
      </span>
    </Link>
  );
}
