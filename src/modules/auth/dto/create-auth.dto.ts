import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateAuthDto {
  @Length(1, 50)
  fullname: string;
  @IsEmail({}, { message: 'Email xato farmatda kiritildi!' })
  email: string;
  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  @Length(6, 20, {
    message: "Parol uzunligi 6-20 belgi orasida bo'lishi kerak",
  })
  password: string;
}
