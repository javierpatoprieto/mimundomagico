import Link from 'next/link'

export const metadata = {
  title: 'Política de Cookies — Mi Mundo Mágico',
  description: 'Política de cookies de Mi Mundo Mágico',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-violet-600 font-bold text-sm mb-8 inline-block hover:underline">← Volver al inicio</Link>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Política de Cookies</h1>
        <p className="text-gray-400 text-sm mb-10">Última actualización: abril de 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">1. ¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">2. Cookies que utilizamos</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="bg-violet-50">
                    <th className="text-left p-3 font-black text-gray-800 border border-gray-200">Cookie</th>
                    <th className="text-left p-3 font-black text-gray-800 border border-gray-200">Tipo</th>
                    <th className="text-left p-3 font-black text-gray-800 border border-gray-200">Finalidad</th>
                    <th className="text-left p-3 font-black text-gray-800 border border-gray-200">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200 font-mono text-xs">sb-auth-token</td>
                    <td className="p-3 border border-gray-200">Necesaria</td>
                    <td className="p-3 border border-gray-200">Mantener la sesión de usuario (Supabase Auth)</td>
                    <td className="p-3 border border-gray-200">Sesión / 1 año</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-gray-200 font-mono text-xs">mmm-cookie-consent</td>
                    <td className="p-3 border border-gray-200">Necesaria</td>
                    <td className="p-3 border border-gray-200">Recordar tu elección sobre cookies</td>
                    <td className="p-3 border border-gray-200">1 año</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 font-mono text-xs">__stripe_mid</td>
                    <td className="p-3 border border-gray-200">Funcional</td>
                    <td className="p-3 border border-gray-200">Procesamiento seguro de pagos (Stripe)</td>
                    <td className="p-3 border border-gray-200">1 año</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-gray-200 font-mono text-xs">__stripe_sid</td>
                    <td className="p-3 border border-gray-200">Funcional</td>
                    <td className="p-3 border border-gray-200">Procesamiento seguro de pagos (Stripe)</td>
                    <td className="p-3 border border-gray-200">30 minutos</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">No utilizamos cookies de publicidad ni de seguimiento de terceros.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">3. Cookies necesarias</h2>
            <p>Las cookies necesarias son imprescindibles para que el sitio funcione correctamente. Incluyen las cookies de autenticación y las de procesamiento de pagos. No pueden desactivarse sin afectar al funcionamiento del servicio.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">4. Cómo gestionar las cookies</h2>
            <p>Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envíe una cookie. Ten en cuenta que algunas funciones del sitio pueden no funcionar correctamente si rechazas las cookies necesarias.</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Microsoft Edge</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">5. Más información</h2>
            <p>Para cualquier consulta sobre nuestra política de cookies, puedes contactarnos en <a href="mailto:legal@mimundomagico.es" className="text-violet-600 hover:underline">legal@mimundomagico.es</a>.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex gap-6 text-sm text-violet-600">
          <Link href="/legal/aviso-legal" className="hover:underline">Aviso Legal</Link>
          <Link href="/legal/privacidad" className="hover:underline">Política de Privacidad</Link>
          <Link href="/legal/terminos" className="hover:underline">Términos y Condiciones</Link>
        </div>
      </div>
    </div>
  )
}
