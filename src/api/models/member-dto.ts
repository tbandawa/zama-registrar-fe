/* tslint:disable */
/* eslint-disable */
import { PhotoDto } from '../models/photo-dto';
import { UserDto } from '../models/user-dto';
export interface MemberDto {
  addedBy?: UserDto;
  created?: string;
  district: string;
  id?: number;
  isActive?: number;
  isCard?: number;
  membershipNumber?: string;
  names: string;
  nationalIdNumber: string;
  photo?: PhotoDto;
  position: string;
  surname: string;
}
