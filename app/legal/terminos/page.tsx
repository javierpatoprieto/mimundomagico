import Link from 'next/link'

export const metadata = {
  title: 'Términos y Condiciones — Mi Mundo Mágico',
  description: 'Términos y condiciones de uso de Mi Mundo Mágico',
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-violet-600 font-bold text-sm mb-8 inline-block hover:underline">← Volver al inicio</Link>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Términos y Condiciones</h1>
        <p className="text-gray-400 text-sm mb-10">Última actualización: abril de 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">1. Aceptación</h2>
            <p>Al crear una cuenta en Mi Mundo Mágico aceptas los presentes Términos y Condiciones. Si no estás de acuerdo, no debes usar el servicio.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">2. Descripción del servicio</h2>
            <p>Mi Mundo Mágico es una plataforma de cuentos infantiles personalizados disponible en <strong>mimundomagico.es</strong>. Ofrece:</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li><strong>Plan Gratuito:</strong> acceso a 5 cuentos clásicos personalizados con el nombre del niño/a y 1 cuento generado con IA.</li>
              <li><strong>Plan Premium ($4,99/mes):</strong> biblioteca completa, cuentos IA ilimitados, cuento semanal automático y descarga en PDF.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">3. Registro y cuenta</h2>
            <p>Para usar el servicio debes registrarte con un email válido. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.</p>
            <p className="mt-3">Debes ser mayor de 18 años o contar con el consentimiento de tus padres o tutores para registrarte.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">4. Suscripción Premium y pagos</h2>
            <p>La suscripción Premium se factura mensualmente a través de <strong>Stripe</strong>. Al suscribirte autorizas el cargo recurrente.</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li><strong>Cancelación:</strong> puedes cancelar en cualquier momento desde tu cuenta. El acceso Premium se mantiene hasta el final del período facturado.</li>
              <li><strong>Reembolsos:</strong> no se realizan reembolsos por períodos parciales, salvo error imputable al servicio.</li>
              <li><strong>Cambios de precio:</strong> te notificaremos con al menos 30 días de antelación cualquier cambio en el precio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">5. Contenido generado por IA</h2>
            <p>Los cuentos generados mediante Inteligencia Artificial son creados de forma automatizada. Aunque revisamos el sistema para asegurar contenido apropiado para menores, no garantizamos que todos los textos estén libres de imprecisiones.</p>
            <p className="mt-3">Los cuentos generados son para uso personal y familiar. No están permitidos el uso comercial ni la redistribución sin autorización.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">6. Uso aceptable</h2>
            <p>Queda prohibido:</p>
            <ul className="mt-3 space-y-1 list-disc pl-5">
              <li>Usar el servicio para fines ilícitos o contrarios a estos términos.</li>
              <li>Intentar acceder a datos de otros usuarios.</li>
              <li>Realizar ingeniería inversa o copiar el código del servicio.</li>
              <li>Usar el servicio para generar contenido inapropiado para menores.</li>
              <li>Compartir tu cuenta con terceros.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">7. Propiedad intelectual del contenido</h2>
            <p>Los cuentos clásicos adaptados y los cuentos generados por IA son propiedad de Javier Pato Prieto. Se te concede una licencia personal, no exclusiva e intransferible para uso familiar y privado.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">8. Disponibilidad y modificaciones</h2>
            <p>Nos reservamos el derecho de modificar, suspender o interrumpir el servicio en cualquier momento, con o sin previo aviso, aunque haremos lo posible por notificarte con antelación.</p>
            <p className="mt-3">Podemos modificar estos Términos. Las modificaciones serán efectivas desde su publicación en el Sitio. Si continúas usando el servicio tras la publicación, se entenderá que aceptas los nuevos términos.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">9. Limitación de responsabilidad</h2>
            <p>En la máxima medida permitida por la ley, Javier Pato Prieto no será responsable de daños indirectos, incidentales o consecuentes derivados del uso del servicio. La responsabilidad total no excederá el importe pagado por el usuario en los últimos 12 meses.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">10. Ley aplicable y resolución de conflictos</h2>
            <p>Estos Términos se rigen por la ley española. Para la resolución de conflictos, ambas partes se someten a los Juzgados y Tribunales del domicilio del usuario consumidor, de conformidad con la normativa de consumidores y usuarios.</p>
            <p className="mt-3">Para cualquier consulta: <a href="mailto:legal@mimundomagico.es" className="text-violet-600 hover:underline">legal@mimundomagico.es</a></p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex gap-6 text-sm text-violet-600">
          <Link href="/legal/aviso-legal" className="hover:underline">Aviso Legal</Link>
          <Link href="/legal/privacidad" className="hover:underline">Política de Privacidad</Link>
          <Link href="/legal/cookies" className="hover:underline">Política de Cookies</Link>
        </div>
      </div>
    </div>
  )
}
