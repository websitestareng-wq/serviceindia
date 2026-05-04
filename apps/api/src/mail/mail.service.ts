import { Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { buildWelcomeCredentialsEmail } from "./templates/welcome-credentials-email";
import { buildRecoverCredentialEmail } from "./templates/recover-credential-email";

type SendWelcomeCredentialsEmailInput = {
  to: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  loginUrl?: string;
};

type SendRecoverCredentialEmailInput = {
  to: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  loginUrl?: string;
};

type SendReminderEmailInput = {
  to: string;
  title: string;
  notes?: string;
};

@Injectable()
export class MailService {
  private readonly resend: Resend;

  private readonly MAIL_FROM = {
    sales: "SERVICE INDIA <sales@mail.serviceind.co.in>",
    purchase: "SERVICE INDIA <purchase@mail.serviceind.co.in>",

    payment: "SERVICE INDIA <payment@mail.serviceind.co.in>",
    receipt: "SERVICE INDIA <receipt@mail.serviceind.co.in>",

    debitNote: "SERVICE INDIA <debitnote@mail.serviceind.co.in>",
    creditNote: "SERVICE INDIA <creditnote@mail.serviceind.co.in>",

    journal: "SERVICE INDIA <journal@mail.serviceind.co.in>",

    recovery: "SERVICE INDIA <accounts.recovery@mail.serviceind.co.in>",

    welcome: "SERVICE INDIA <welcome@mail.serviceind.co.in>",

    reminder: "SERVICE INDIA <reminder@mail.serviceind.co.in>",
  } as const;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendWelcomeCredentialsEmail(
    input: SendWelcomeCredentialsEmailInput,
  ): Promise<void> {
    const html = buildWelcomeCredentialsEmail({
      userName: input.name,
      loginEmail: input.email,
      loginPassword: input.password,
      loginUrl: input.loginUrl || "https://serviceind.co.in/login",
      role: "USER",
      phone: input.phone || "",
    });

    await this.resend.emails.send({
      from: this.MAIL_FROM.welcome,
      to: input.to,
      subject: "Your Login Credentials",
      html,
    });
  }

  async sendRecoverCredentialEmail(
    input: SendRecoverCredentialEmailInput,
  ): Promise<void> {
    const html = buildRecoverCredentialEmail({
      userName: input.name,
      loginEmail: input.email,
      temporaryPassword: input.password,
      loginUrl: input.loginUrl || "https://serviceind.co.in/login",
      phone: input.phone || "",
    });

    await this.resend.emails.send({
      from: this.MAIL_FROM.welcome,
      to: input.to,
      subject: "Credential Recovery Request",
      html,
    });
  }

  async sendReminderEmail(
    input: SendReminderEmailInput,
  ): Promise<void> {
    console.log("[MailService] sendReminderEmail called with:", input);

    const safeTitle = input.title?.trim() || "Reminder";
    const safeNotes = input.notes?.trim();

    const text = safeNotes || safeTitle;

    const htmlBody = (safeNotes || safeTitle)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br />");

    const html = `
      <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6; font-size: 15px;">
        ${htmlBody}
      </div>
    `;

    const response = await this.resend.emails.send({
      from: this.MAIL_FROM.reminder,
      to: input.to,
      subject: safeTitle,
      text,
      html,
    });

    console.log("[MailService] resend response:", response);

    if ((response as any)?.error) {
      throw new Error(
        `[MailService] Resend error: ${JSON.stringify(
          (response as any).error,
        )}`,
      );
    }
  }
}