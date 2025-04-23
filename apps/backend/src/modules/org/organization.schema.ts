export const CreateOrgModel = {
  name: '',
  description: '',
  userId: '',
};

export const AddMemberModel = {
  organizationId: '',
  memberEmail: '',
  userId: '',
};

export const InviteMemberModel = {
  organizationId: '',
  memberEmail: '',
  role: '',
  userId: '',
};

export const AcceptInvitationModel = {
  invitationToken: '',
  userId: '',
};

export const RemoveMemberModel = {
  organizationId: '',
  memberEmail: '',
  userId: '',
};

export const UpdateRoleModel = {
  organizationId: '',
  memberEmail: '',
  role: '',
  userId: '',
};
