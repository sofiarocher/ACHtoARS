import { ExternalLink } from "../ui/link";

export default function Footer() {
  return (
    <footer className="text-center text-gray-500 py-4 px-4 sm:px-0">
      <div className="text-sm">
        Made with ❤️ by{' '}
        <ExternalLink
          href="https://www.x.com/srocher_dev" 
          text="Sofía Rocher"
        />
      </div>
      
      <p className="text-xs mt-2">
        Las comisiones son aproximadas y pueden variar según la empresa.
        <br /> 
        Gracias a{' '}
        <ExternalLink 
          href="https://www.criptoya.com/" 
          text="Criptoya"
        />{' '}
        por los datos del cambio ARS/USDC en tiempo real.
      </p>
    </footer>
  );
}
