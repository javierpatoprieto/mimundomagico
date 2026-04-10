import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌟</span>
              <span className="font-heading text-xl text-white">MiMundoMagico</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Donde cada noche se convierte en una aventura mágica. Cuentos personalizados
              con IA donde tu hijo es el protagonista.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="text-xl" title="Instagram">📸</span>
              <span className="text-xl" title="Facebook">👥</span>
              <span className="text-xl" title="Twitter">🐦</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li><Link href="/#como-funciona" className="hover:text-primary-400 transition-colors">Cómo funciona</Link></li>
              <li><Link href="/cuentos" className="hover:text-primary-400 transition-colors">Biblioteca de cuentos</Link></li>
              <li><Link href="/#precios" className="hover:text-primary-400 transition-colors">Precios</Link></li>
              <li><Link href="/registro" className="hover:text-primary-400 transition-colors">Registrarse gratis</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-primary-400 transition-colors">Preguntas frecuentes</Link></li>
              <li><Link href="/contacto" className="hover:text-primary-400 transition-colors">Contacto</Link></li>
              <li><Link href="/privacidad" className="hover:text-primary-400 transition-colors">Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-primary-400 transition-colors">Términos de uso</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 MiMundoMagico. Hecho con ✨ y mucho amor para los pequeños lectores.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>🇪🇸 España</span>
            <span>·</span>
            <span>RGPD Compliant</span>
            <span>·</span>
            <span>Seguro para niños</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
