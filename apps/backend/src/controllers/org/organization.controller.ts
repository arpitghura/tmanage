import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../interfaces/controller.interface';
import { Auth } from '../../middlewares/auth.middleware';
import { BaseController } from '../BaseController';
import { SuccessResponse } from '../../core/ApiResponse';
import { ORG_HEAD } from '../../interfaces/auth/roles.interface';
import { authoriseRoles } from '../../middlewares/authoriseRoles.middleware';

import sanitizeBody from '../../middlewares/sanitizeBody.middleware';
import { AcceptInvitationModel, AddMemberModel, CreateOrgModel, InviteMemberModel, RemoveMemberModel, UpdateRoleModel } from '../../modules/org/organization.schema';
import validationMiddleware from '../../middlewares/validation.middleware';
import { AcceptInvitationDto, CreateOrgDto, InviteMemberDto, RemoveMemberDto, UpdateRoleDto } from '../../modules/org/organization.dto';
import { OrganizationService } from '../../modules/org/organization.service';
import { ApiError } from '../../core/ApiError';

export class OrganisationController extends BaseController implements Controller {
  public path: string = '/organization';
  public router: Router = Router();
  public auth = new Auth();
  public authMiddleware = this.auth.OrgAuthMiddleware;
  private OrgService = new OrganizationService();

  constructor() {
    super();

    this._initialiseRoutes();
  }

  private _initialiseRoutes() {
    this.router.post(`${this.path}/create`, this.authMiddleware, validationMiddleware(CreateOrgDto), this._createOrganisation);
    // this.router.post(`${this.path}/member/add`, this.authMiddleware, validationMiddleware(AddMemberDto), authoriseRoles([ORG_HEAD]), this._addMember);
    this.router.post(`${this.path}/member/remove`, this.authMiddleware, validationMiddleware(RemoveMemberDto), authoriseRoles([ORG_HEAD]), this._removeMember);
    this.router.post(`${this.path}/member/update-role`, this.authMiddleware, validationMiddleware(UpdateRoleDto), authoriseRoles([ORG_HEAD]), this._updateMemberRole);
    this.router.post(`${this.path}/member/invite`, this.authMiddleware, validationMiddleware(InviteMemberDto), authoriseRoles([ORG_HEAD]), this._inviteMember);
    this.router.post(`${this.path}/member/accept-invitation`, validationMiddleware(AcceptInvitationDto), this._acceptInvitation);
  }

  private _createOrganisation = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(CreateOrgModel, req.body);
    const { name, description } = req.body;
    const userId = req.body.userId;

    try {
      const organization: any = this.OrgService.createOrganization(name, description, userId);
      await this.OrgService.addAdmin(organization.id, userId);
      return new SuccessResponse('Organization created successfully', organization).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _addMember = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(AddMemberModel, req.body);
    const { organizationId, memberEmail } = req.body;

    try {
      const member = await this.OrgService.addMember(organizationId, memberEmail);
      return new SuccessResponse('Member added successfully', member).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _removeMember = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(RemoveMemberModel, req.body);
    const { organizationId, memberEmail } = req.body;
    try {
      const data = await this.OrgService.removeMember(organizationId, memberEmail);
      return new SuccessResponse(data).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _updateMemberRole = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(UpdateRoleModel, req.body);
    const { organizationId, memberEmail, role } = req.body;
    try {
      const roleUpd = await this.OrgService.updateRole(organizationId, memberEmail, role);
      return new SuccessResponse('Member role updated successfully', roleUpd).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _inviteMember = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(InviteMemberModel, req.body);
    const { organizationId, memberEmail, role } = req.body;

    try {
      const invitedMember = await this.OrgService.inviteMembersInOrg(organizationId, memberEmail, role);
      return new SuccessResponse(invitedMember).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });

  private _acceptInvitation = this.catchAsyn(async (req: Request, res: Response, _next: NextFunction) => {
    req.body = sanitizeBody(AcceptInvitationModel, req.body);
    const { invitationToken } = req.body;

    try {
      const acceptedInvite = await this.OrgService.acceptInvite(invitationToken);
      return new SuccessResponse(acceptedInvite).send(res);
    } catch (error: any) {
      return ApiError.handle(error, res);
    }
  });
}
