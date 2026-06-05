import type { Member } from '@shared-types/member/member.types';
import type {
  CreateMemberRequestDto,
  UpdateMemberRequestDto,
} from '@shared-types/member/member.dto';
import { webAppConfig } from '@/config/env';

function placeholder<T>(operation: string): Promise<T> {
  console.info(`${operation} API placeholder`, {
    apiBaseUrl: webAppConfig.apiBaseUrl,
  });

  return Promise.reject(
    new Error(`${operation} is not wired to a backend endpoint yet.`),
  );
}

export const membersApi = {
  getMembers(): Promise<Member[]> {
    return placeholder<Member[]>('getMembers');
  },

  createMember(input: CreateMemberRequestDto): Promise<Member> {
    void input;
    return placeholder<Member>('createMember');
  },

  updateMember(id: number, input: UpdateMemberRequestDto): Promise<Member> {
    void id;
    void input;
    return placeholder<Member>('updateMember');
  },

  deleteMember(id: number): Promise<void> {
    void id;
    return placeholder<void>('deleteMember');
  },
};
