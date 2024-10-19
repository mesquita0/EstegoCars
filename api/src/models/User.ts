export default class User {
  public id: number;
  public cpf: string;
  public name: string;
  public email: string;
  public password: string;
  public phone_number: string;

  constructor(data: any) {
    this.id = Number(data.id);
    this.cpf = data.cpf as string;
    this.name = data.name as string;
    this.email = data.email as string;
    this.password = data.password as string;
    this.phone_number = data.phone_number as string;
  }
}
