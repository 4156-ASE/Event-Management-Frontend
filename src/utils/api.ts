import { AuthSignInDto, AuthSignInResp, AuthSignUpDto, EventCreateReq, EventDetail } from './dto';
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
  /** create an event */
  async createEvent(data: EventCreateReq) {
    return await request.post<EventDetail>('/events', data);
  },
};
