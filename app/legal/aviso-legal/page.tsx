import Link from 'next/link'

export const metadata = {
  title: 'Aviso Legal — Mi Mundo Mágico',
  description: 'Aviso legal de Mi Mundo Mágico',
}

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-violet-600 font-bold text-sm mb-8 inline-block hover:underline">← Volver al inicio</Link>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Aviso Legal</h1>
        <p className="text-gray-400 text-sm mb-10">Última actualización: abril de 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">1. Datos identificativos</h2>
            <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa:</p>
            <ul className="mt-3 space-y-1 list-disc pl-5">
              <li><strong>Titular:</strong> Javier Pato Prieto</li>
              <li><strong>NIF:</strong> 71449969D</li>
              <li><strong>Domicilio:</strong> Calle Los Remedios 64F, Liandres, Cantabria, España</li>
              <li><strong>Email:</strong> <a href="mailto:legal@mimundomagico.es" className="text-violet-600 hover:underline">legal@mimundomagico.es</a></li>
              <li><strong>Web:</strong> www.mimundomagico.es</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">2. Objeto</h2>
            <p>El presente Aviso Legal regula el acceso y uso del sitio web <strong>mimundomagico.es</strong> (en adelante, el "Sitio"), titularidad de Javier Pato Prieto.</p>
            <p className="mt-3">El acceso al Sitio implica la aceptación plena y sin reservas de las presentes condiciones.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">3. Propiedad intelectual e industrial</h2>
            <p>Todos los contenidos del Sitio —incluyendo textos, gráficos, logotipos, imágenes, código fuente y diseño— son propiedad de Javier Pato Prieto o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.</p>
            <p className="mt-3">Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa y por escrito del titular.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">4. Exclusión de responsabilidad</h2>
            <p>El titular no garantiza la ausencia de errores en el acceso al Sitio ni en sus contenidos, aunque pondrá todos los medios para subsanarlos. No se responsabiliza de los daños o perjuicios que pudieran derivarse del uso del Sitio o de la imposibilidad de acceder al mismo.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">5. Legislación aplicable y jurisdicción</h2>
            <p>Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales del domicilio del usuario, salvo que la ley disponga otro fuero imperativo.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex gap-6 text-sm text-violet-600">
          <Link href="/legal/privacidad" className="hover:underline">Política de Privacidad</Link>
          <Link href="/legal/cookies" className="hover:underline">Política de Cookies</Link>
          <Link href="/legal/terminos" className="hover:underline">Términos y Condiciones</Link>
        </div>
      </div>
    </div>
  )
}
