import { ExternalLink } from "../ui/link";

export default function Footer() {
  return (
    <footer className="w-full py-4 text-center sm:text-sm text-xs text-gray font-extralight">
      Made with 🧡 by{' '}
      <ExternalLink
        href="https://www.x.com/srocher_dev" 
        text="Sofía Rocher."
      />
    </footer>
  );
}
