import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title!: string;

  description!: string;

  status!: string;
}

export class UpdateTaskDto {
  @IsString()
  title!: string;

  description!: string;

  status!: string;

  assignee?: string[];
}
