import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "LinkBridge <noreply@linkbridge.lat>";

export async function sendWelcomeEmail(email: string, name: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email] Would send welcome email to ${email}`);
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Bienvenido a LinkBridge!",
    html: `
      <h1>Hola ${name}!</h1>
      <p>Bienvenido a LinkBridge, la plataforma que te conecta con MercadoLibre para monetizar tu audiencia.</p>
      <p>Tu cuenta fue creada exitosamente. Completa tu perfil para comenzar.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/onboarding" style="display:inline-block;padding:12px 24px;background:#7C3AED;color:white;text-decoration:none;border-radius:8px;margin-top:16px;">
        Completar perfil
      </a>
    `,
  });
}

export async function sendCampaignNotification(
  email: string,
  name: string,
  campaignTitle: string,
  status: "approved" | "rejected"
) {
  if (!process.env.RESEND_API_KEY) {
    console.log(
      `[Email] Would send campaign ${status} notification to ${email}`
    );
    return;
  }

  const isApproved = status === "approved";

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: isApproved
      ? `Fuiste aceptado en "${campaignTitle}"!`
      : `Actualizacion sobre "${campaignTitle}"`,
    html: `
      <h1>Hola ${name}</h1>
      <p>${
        isApproved
          ? `Tu postulacion a la campana "${campaignTitle}" fue aceptada. Ya puedes comenzar a promocionar los productos.`
          : `Lamentablemente, tu postulacion a la campana "${campaignTitle}" no fue aceptada en esta oportunidad.`
      }</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/influencer/campanas" style="display:inline-block;padding:12px 24px;background:#7C3AED;color:white;text-decoration:none;border-radius:8px;margin-top:16px;">
        Ver campanas
      </a>
    `,
  });
}

export async function sendEarningNotification(
  email: string,
  name: string,
  amount: number,
  currency: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.log(
      `[Email] Would send earning notification to ${email}: ${currency} ${amount}`
    );
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Recibiste una comision de ${currency} ${amount.toLocaleString()}`,
    html: `
      <h1>Hola ${name}</h1>
      <p>Se registro una nueva comision en tu cuenta:</p>
      <h2 style="color:#7C3AED">${currency} ${amount.toLocaleString()}</h2>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/influencer/ganancias" style="display:inline-block;padding:12px 24px;background:#7C3AED;color:white;text-decoration:none;border-radius:8px;margin-top:16px;">
        Ver ganancias
      </a>
    `,
  });
}
