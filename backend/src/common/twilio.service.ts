import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio = new Twilio(
    this.configService.get<string>('TWILIO_ACCOUNT_SID'),
    this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    {
      accountSid: this.configService.get<string>('TWILIO_ACCOUNT_SID'),
    },
  );

  constructor(private configService: ConfigService) {}

  async sendVerifyToken(phone: string) {
    return await this.client.verify.v2
      .services(this.configService.get<string>('TWILIO_VERIFY_SERVICE'))
      .verifications.create({
        to: phone,
        channel: 'sms',
      });
  }

  async verifyCodeSent(phone: string, code: string) {
    return await this.client.verify.v2
      .services(this.configService.get<string>('TWILIO_VERIFY_SERVICE'))
      .verificationChecks.create({
        to: phone,
        code: code,
      });
  }
}
