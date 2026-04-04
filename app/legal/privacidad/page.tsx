import Link from 'next/link'

export const metadata = {
  title: 'Política de Privacidad — Mi Mundo Mágico',
  description: 'Política de privacidad y protección de datos de Mi Mundo Mágico',
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-violet-600 font-bold text-sm mb-8 inline-block hover:underline">← Volver al inicio</Link>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Política de Privacidad</h1>
        <p className="text-gray-400 text-sm mb-10">Última actualización: abril de 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">1. Responsable del tratamiento</h2>
            <ul className="space-y-1 list-disc pl-5">
              <li><strong>Identidad:</strong> Javier Pato Prieto</li>
              <li><strong>NIF:</strong> 71449969D</li>
              <li><strong>Dirección:</strong> Calle Los Remedios 64F, Liandres, Cantabria, España</li>
              <li><strong>Email:</strong> <a href="mailto:legal@mimundomagico.es" className="text-violet-600 hover:underline">legal@mimundomagico.es</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">2. Datos que recopilamos</h2>
            <p>Recopilamos los siguientes datos personales:</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li><strong>Datos de cuenta:</strong> dirección de email y contraseña (cifrada) al registrarte.</li>
              <li><strong>Datos de perfil infantil:</strong> nombre y edad del niño/a (sin apellidos), avatar y preferencias temáticas.</li>
              <li><strong>Datos de pago:</strong> gestionados exclusivamente por Stripe. No almacenamos datos de tarjeta.</li>
              <li><strong>Datos de uso:</strong> cuentos leídos, favoritos y progreso de lectura.</li>
              <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador y sistema operativo (de forma anonimizada).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">3. Finalidad y base jurídica</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="bg-violet-50">
                    <th className="text-left p-3 font-black text-gray-800 border border-gray-200">Finalidad</th>
                    <th className="text-left p-3 font-black text-gray-800 border border-gray-200">Base jurídica</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border border-gray-200">Prestación del servicio de cuentos personalizados</td><td className="p-3 border border-gray-200">Ejecución de contrato (art. 6.1.b RGPD)</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Gestión de suscripción Premium</td><td className="p-3 border border-gray-200">Ejecución de contrato (art. 6.1.b RGPD)</td></tr>
                  <tr><td className="p-3 border border-gray-200">Comunicaciones del servicio</td><td className="p-3 border border-gray-200">Interés legítimo (art. 6.1.f RGPD)</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Cumplimiento de obligaciones legales</td><td className="p-3 border border-gray-200">Obligación legal (art. 6.1.c RGPD)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">4. Protección de datos de menores</h2>
            <p>Mi Mundo Mágico está dirigido a familias. Los perfiles infantiles son creados y gestionados exclusivamente por los padres o tutores legales. No recopilamos directamente datos de menores de 14 años sin el consentimiento verificable de sus progenitores o tutores.</p>
            <p className="mt-3">Los datos de los perfiles infantiles (nombre, edad, preferencias) se utilizan únicamente para personalizar los cuentos y no se comparten con terceros con fines comerciales.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">5. Destinatarios y transferencias internacionales</h2>
            <p>Compartimos datos con los siguientes proveedores de confianza:</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li><strong>Supabase</strong> (base de datos y autenticación) — servidores en la UE</li>
              <li><strong>OpenAI</strong> (generación de cuentos con IA) — con cláusulas contractuales estándar para transferencias fuera de la UE</li>
              <li><strong>Stripe</strong> (pagos) — certificado PCI DSS, con cláusulas contractuales estándar</li>
              <li><strong>Vercel</strong> (alojamiento web) — con cláusulas contractuales estándar</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">6. Conservación de datos</h2>
            <p>Conservamos tus datos mientras mantengas una cuenta activa. Si eliminas tu cuenta, borraremos tus datos en un plazo máximo de 30 días, salvo obligación legal de conservación (p. ej., datos de facturación durante 5 años según legislación fiscal española).</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">7. Tus derechos</h2>
            <p>Puedes ejercer los siguientes derechos enviando un email a <a href="mailto:legal@mimundomagico.es" className="text-violet-600 hover:underline">legal@mimundomagico.es</a> con tu nombre y DNI:</p>
            <ul className="mt-3 space-y-1 list-disc pl-5">
              <li><strong>Acceso:</strong> obtener confirmación de si tratamos tus datos y una copia de los mismos.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de tus datos (&ldquo;derecho al olvido&rdquo;).</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado y de uso común.</li>
              <li><strong>Limitación:</strong> solicitar la restricción del tratamiento en determinados casos.</li>
            </ul>
            <p className="mt-3">También tienes derecho a reclamar ante la <strong>Agencia Española de Protección de Datos</strong> (www.aepd.es).</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 mb-3">8. Seguridad</h2>
            <p>Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos: cifrado en tránsito (HTTPS/TLS), contraseñas hasheadas, acceso restringido por roles y copias de seguridad periódicas.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex gap-6 text-sm text-violet-600">
          <Link href="/legal/aviso-legal" className="hover:underline">Aviso Legal</Link>
          <Link href="/legal/cookies" className="hover:underline">Política de Cookies</Link>
          <Link href="/legal/terminos" className="hover:underline">Términos y Condiciones</Link>
        </div>
      </div>
    </div>
  )
}
