import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio = new Twilio(
    this.configService.get<string>('TWILIO_ACCOUNT_SID'),
    this.configService.get<string>('TWILIO_AUTH_TOKEN'),
  );

  constructor(private configService: ConfigService) {}

  async sendVerifyToken(phone: string) {
    return await this.client.verify.v2
      .services('VA1f159ba571391a2b1b852eb278953d01')
      .verifications.create({
        to: phone,
        channel: 'sms',
      });
  }

  async verifyCodeSent(phone: string, code: string) {
    return await this.client.verify.v2
      .services('VA1f159ba571391a2b1b852eb278953d01')
      .verificationChecks.create({
        to: phone,
        code: code,
      });
  }
}
