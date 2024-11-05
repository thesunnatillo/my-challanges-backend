import { IsNotEmpty } from 'class-validator';

export class CreateChallengeDto {
  @IsNotEmpty({ message: "Maydon bo'sh!" })
  title: string;
  description: string;
}
