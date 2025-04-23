import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  organizationId!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  description?: string;
}

export class AddTeamMemberDto {
  @IsNotEmpty()
  @IsString()
  organizationId!: string;

  @IsNotEmpty()
  @IsString()
  teamId!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  memberEmail!: string;
}

export class RemoveTeamMemberDto {
  @IsNotEmpty()
  @IsString()
  teamId!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  memberEmail!: string;
}

export class InviteTeamMemberDto {
  @IsNotEmpty()
  @IsString()
  organizationId!: string;

  @IsNotEmpty()
  @IsString()
  teamId!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  memberEmail!: string;
}
