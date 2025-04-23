export const CreateTeamSchema = {
  organizationId: '',
  name: '',
  description: '',
  userId: '',
};

export const AddTeamMemberSchema = {
  organizationId: '',
  teamId: '',
  memberEmail: '',
};

export const RemoveTeamMemberSchema = {
  teamId: '',
  memberEmail: '',
};

export const InviteMemberSchema = {
  organizationId: '',
  teamId: '',
  memberEmail: '',
};
