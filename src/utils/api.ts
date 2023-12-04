import {
  AddUserReq,
  AuthSignInDto,
  AuthSignInResp,
  AuthSignUpDto,
  EventCreateReq,
  EventDetail,
  EventUpdateReq,
  RemoveUserReq,
} from './dto';
import { request } from './request';

export const APIs = {
  /** signup */
  async signup(data: AuthSignUpDto) {
    return await request.post('/auth/signup', data);
  },
  /** signin */
  async signin(data: AuthSignInDto) {
    return await request.post<AuthSignInResp>('/auth/signin', data);
  },
  /** signout */
  async signout() {
    return await request.get('/auth/signout');
  },
  /** get events */
  async getEvents() {
    return await request.get<EventDetail[]>('/events');
  },
  /** get an event */
  async getEvent(id: string) {
    return await request.get<EventDetail>(`/events/${id}`);
  },
  /** create an event */
  async createEvent(data: EventCreateReq) {
    return await request.post<EventDetail>('/events', data);
  },
  /** delete an event */
  async deleteEvent(id: string) {
    return await request.delete(`/events/${id}`);
  },
  /** updateEvent */
  async updateEvent(id: string, data: EventUpdateReq) {
    return await request.put<EventDetail>(`/events/${id}`, data);
  },
  /** add user to an event */
  async addUser(data: AddUserReq) {
    return await request.post<EventDetail>('/events/add_user', data);
  },
  /** remove user from an event */
  async removeUser(data: RemoveUserReq) {
    return await request.post<EventDetail>('/events/remove_user', data);
  },
};
