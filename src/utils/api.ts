import {
  AddUserReq,
  AuthSignInDto,
  AuthSignInResp,
  AuthSignUpDto,
  ChangeHostReq,
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
    return await request.patch<EventDetail>(`/events/${id}`, data);
  },
  /** add user to an event */
  async addUser(eventId: string, data: AddUserReq) {
    return await request.patch<EventDetail>(`/events/${eventId}/add_user`, data);
  },
  /** remove user from an event */
  async removeUser(eventId: string, data: RemoveUserReq) {
    return await request.patch<EventDetail>(`/events/${eventId}/remove_user`, data);
  },
  /** change event's host */
  async changeHost(eventId: string, data: ChangeHostReq) {
    return await request.patch<EventDetail>(`/events/${eventId}/change_host`, data);
  },
};
