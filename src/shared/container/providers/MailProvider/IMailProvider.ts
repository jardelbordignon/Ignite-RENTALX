export interface IMailProvider {
  sendMail(to: string, subject: string, variables: any, path: string): void
}
