import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa6";

export function SocialLoginRow() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="w-full h-12 rounded-xl px-4">
        <FaGoogle /> Google
      </Button>
      <Button variant="outline" className="w-full h-12 rounded-xl px-4">
        <FaGithub /> GitHub
      </Button>
    </div>
  );
}
