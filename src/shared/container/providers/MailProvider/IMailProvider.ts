export interface IMailProvider {
  sendMail(to: string, subject: string, body: string): void
}
