import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsNumberString,
  Length,
} from 'class-validator'

export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  fullname: string

  @IsNumber()
  @IsNotEmpty()
  Age: number

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  @Length(8, 8)
  Cin: string

  @IsString()
  @IsNotEmpty()
  Job: string

  @IsString()
  @IsNotEmpty()
  path: string

  @IsArray()
  @IsNotEmpty()
  skills: string[]

  @IsNumber()
  @IsNotEmpty()
  user: number
}
