/* tslint:disable */
/* eslint-disable */
import { MemberDto } from '../models/member-dto';
export interface PagedMembersDto {
  count?: number;
  currentPage?: number;
  nextPage?: number;
  perPage?: number;
  results?: Array<MemberDto>;
}
