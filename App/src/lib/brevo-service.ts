/**
 * Brevo (Sendinblue) Integration Service
 * Handles email automation and newsletter subscriptions
 */

import axios from 'axios'
import { logOperation, logError, validateEmail, escapeHtml } from './api-utils'

const BREVO_API_URL = 'https://api.brevo.com/v3'
const BREVO_API_KEY = process.env.BREVO_API_KEY || ''
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || ''
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'MiMundoMagico'

const brevoClient = axios.create({
  baseURL: BREVO_API_URL,
  headers: {
    'api-key': BREVO_API_KEY,
    'Content-Type': 'application/json',
  },
})

export interface SubscribeNewsletterInput {
  email: string
  firstName?: string
  lastName?: string
}

export interface SendEmailInput {
  to: string
  subject: string
  htmlContent: string
  templateId?: number
}

/**
 * Subscribe email to newsletter
 */
export async function subscribeToNewsletter(input: SubscribeNewsletterInput): Promise<boolean> {
  const { email, firstName = '', lastName = '' } = input

  logOperation('subscribeToNewsletter', { email, firstName, lastName })

  // Validate email
  if (!validateEmail(email)) {
    logError('subscribeToNewsletter', new Error('Invalid email'), { email })
    throw new Error('Email inválido')
  }

  try {
    // Add contact to list
    const response = await brevoClient.post('/contacts', {
      email,
      firstName,
      lastName,
      listIds: [2], // Replace with your actual list ID
      attributes: {
        SUBSCRIPTION_DATE: new Date().toISOString().split('T')[0],
      },
    })

    logOperation('subscribeToNewsletter_success', {
      email,
      contactId: response.data?.id,
    })

    // Send welcome email
    await sendWelcomeEmail(email, firstName)

    return true
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      // Contact already exists, that's ok
      logOperation('subscribeToNewsletter_exists', { email })
      return true
    }

    logError('subscribeToNewsletter', error, { email })
    throw error
  }
}

/**
 * Send welcome email to new subscribers
 */
export async function sendWelcomeEmail(email: string, firstName: string = 'amigo'): Promise<boolean> {
  const subject = '¡Bienvenido a MiMundoMagico! 📖✨'
  // Escape HTML special characters to prevent email injection
  const escapedFirstName = escapeHtml(firstName)

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 32px;">¡Hola ${escapedFirstName}! 👋</h1>
      </div>
      <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Gracias por unirte a <strong>MiMundoMagico</strong>, la plataforma mágica donde los cuentos cobran vida y tus hijos son los protagonistas.
        </p>

        <h2 style="color: #667eea; margin: 30px 0 15px 0;">Lo que puedes hacer ahora:</h2>
        <ul style="font-size: 16px; color: #333; line-height: 1.8;">
          <li>✨ Crea el perfil de tu hijo con sus datos mágicos</li>
          <li>📖 Elige entre 7 cuentos clásicos personalizados</li>
          <li>🤖 Genera cuentos únicos con inteligencia artificial</li>
          <li>🎨 Personaliza cada cuento según los intereses de tu pequeño</li>
        </ul>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #667eea; margin-top: 0;">¿Plan Premium?</h3>
          <p style="margin: 0; color: #555;">
            Desbloquea generación ilimitada de cuentos por solo <strong>€2,99/mes</strong>.
            Suscripción flexible: cancela cuando quieras.
          </p>
        </div>

        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Si tienes preguntas, responde a este email. ¡Estamos aquí para ayudarte!
        </p>

        <p style="font-size: 14px; color: #999; margin-top: 30px;">
          Un abrazo mágico,<br/>
          <strong>El equipo de MiMundoMagico</strong>
        </p>
      </div>
      <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 10px; margin-top: 20px;">
        <p style="margin: 0; font-size: 12px; color: #999;">
          © 2024 MiMundoMagico. Todos los derechos reservados.
        </p>
      </div>
    </div>
  `

  return sendEmail({
    to: email,
    subject,
    htmlContent,
  })
}

/**
 * Send custom email
 */
export async function sendEmail(input: SendEmailInput): Promise<boolean> {
  const { to, subject, htmlContent } = input

  logOperation('sendEmail', { to, subject })

  try {
    const response = await brevoClient.post('/smtp/email', {
      sender: {
        name: BREVO_SENDER_NAME,
        email: BREVO_SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    })

    logOperation('sendEmail_success', {
      to,
      messageId: response.data?.messageId,
    })

    return true
  } catch (error) {
    logError('sendEmail', error, { to, subject })
    throw error
  }
}

/**
 * Send story notification email
 */
export async function sendStoryNotificationEmail(
  email: string,
  childName: string,
  storyTitle: string
): Promise<boolean> {
  // Escape HTML special characters to prevent email injection
  const escapedChildName = escapeHtml(childName)
  const escapedStoryTitle = escapeHtml(storyTitle)
  const subject = `¡El nuevo cuento de ${escapedChildName} está listo! 📖✨`

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">¡Cuento listo! 📖</h1>
      </div>
      <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          El nuevo cuento de <strong>${escapedChildName}</strong> está listo para leer:
        </p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f5576c;">
          <h2 style="color: #f5576c; margin: 0 0 10px 0;">${escapedStoryTitle}</h2>
          <p style="margin: 0; color: #555;">Una aventura mágica espera...</p>
        </div>

        <p style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
            Leer el cuento
          </a>
        </p>

        <p style="font-size: 14px; color: #999; margin-top: 30px; text-align: center;">
          © 2024 MiMundoMagico
        </p>
      </div>
    </div>
  `

  return sendEmail({
    to: email,
    subject,
    htmlContent,
  })
}
