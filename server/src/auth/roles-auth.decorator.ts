import { SetMetadata } from '@nestjs/common';

export const Roles_Key  = 'Roles';

export const Roles = (...roles: string[]) => SetMetadata(Roles_Key, roles);


