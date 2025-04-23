import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrgDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class AddMemberDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  memberEmail!: string;
}

export class InviteMemberDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  memberEmail!: string;

  @IsString()
  @IsNotEmpty()
  role!: string;
}

export class AcceptInvitationDto {
  @IsString()
  @IsNotEmpty()
  invitationToken!: string;
}

export class RemoveMemberDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  memberEmail!: string;
}

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  memberEmail!: string;

  @IsString()
  @IsNotEmpty()
  role!: string;
}
