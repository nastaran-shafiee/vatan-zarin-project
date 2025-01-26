import { ResponseType } from "#/schema/Utils";

type user = {
  username: string;
  password: string;
};
type res = {
  id: string;
  userName: string;
  email: string;
  token: string;
};
export type response = ResponseType<res>;
