import express, { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../interfaces/controller.interface';
import { Auth } from '../../middlewares/auth.middleware';
import { BaseController } from '../BaseController';
import { SuccessResponse } from '../../core/ApiResponse';
import validationMiddleware from '../../middlewares/validation.middleware';
import { AddTeamMemberDto, CreateTeamDto, InviteTeamMemberDto, RemoveTeamMemberDto } from '../../modules/team/team.dto';
import sanitizeBody from '../../middlewares/sanitizeBody.middleware';
import { AddTeamMemberSchema, CreateTeamSchema, InviteMemberSchema, RemoveTeamMemberSchema } from '../../modules/team/team.schema';
import { AcceptInvitationModel } from '../../modules/org/organization.schema';
import { AcceptInvitationDto } from '../../modules/org/organization.dto';
import { TeamService } from '../../modules/team/team.service';
import { ApiError } from '../../core/ApiError';

export class TeamController extends BaseController implements Controller {
  public path: string = '/team';
  public router: Router = Router();
  public auth = new Auth();
  public authMiddleware = this.auth.OrgAuthMiddleware;
  private teamService = new TeamService();

  constructor() {
    super();

    this._initialiseRoutes();
  }

  private _initialiseRoutes() {
    this.router.post(`${this.path}/create`, this.authMiddleware, validationMiddleware(CreateTeamDto), this._createTeam);
    this.router.post(`${this.path}/member/add`, this.authMiddleware, validationMiddleware(AddTeamMemberDto), this._addTeamMember);
    this.router.post(`${this.path}/member/remove`, this.authMiddleware, validationMiddleware(RemoveTeamMemberDto), this._removeTeamMember);
    this.router.post(`${this.path}/member/invite`, this.authMiddleware, validationMiddleware(InviteTeamMemberDto), this._inviteMember);
    this.router.post(`${this.path}/member/accept-invitation`, validationMiddleware(AcceptInvitationDto), this._acceptInvitation);
  }

  private _createTeam = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(CreateTeamSchema, req.body);
    const { organizationId, name, description } = req.body;
    const userId = req.body.userId;
    try {
      const team = await this.teamService.createTeam(name, description, organizationId, userId);
      return new SuccessResponse('Team created successfully', team).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _addTeamMember = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(AddTeamMemberSchema, req.body);
    const { organizationId, teamId, memberEmail } = req.body;

    try {
      const teamMemberData = await this.teamService.addTeamMember(organizationId, teamId, memberEmail);
      // await TeamModel.assignRole(teamId, memberEmail, role);
      return new SuccessResponse('Member added successfully', teamMemberData).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _inviteMember = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(InviteMemberSchema, req.body);
    const { organizationId, teamId, memberEmail } = req.body;

    try {
      const invitation = await this.teamService.inviteMember(organizationId, teamId, memberEmail);
      return new SuccessResponse('success', invitation).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _acceptInvitation = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(AcceptInvitationModel, req.body);
    const { invitationToken } = req.body;

    try {
      const acceptInvite = await this.teamService.acceptInvitation(invitationToken);
      return new SuccessResponse('success', acceptInvite).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _removeTeamMember = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(RemoveTeamMemberSchema, req.body);
    const { teamId, memberEmail } = req.body;

    try {
      const removedMember = await this.teamService.removeTeamMember(teamId, memberEmail);
      return new SuccessResponse('Team member removed successfully', removedMember).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });
}
