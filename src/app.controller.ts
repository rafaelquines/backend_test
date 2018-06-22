import { Get, Controller, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('/ping')
  ping(@Req() req: Request, @Res() res: Response) {
    const authHeader = req.headers['authorization'];
    // console.log('authHeader: ' + authHeader);
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.status(HttpStatus.UNAUTHORIZED);
    } else {
      const hash = authHeader.split(' ')[1];
      const compare = Buffer.from('admin:admin').toString('base64');
      // console.log(hash + " - " + compare);
      if (hash === compare) {
        res.status(HttpStatus.OK);
      } else {
        res.status(HttpStatus.UNAUTHORIZED);
      }
    }
    res.send();
  }

  @Get('/customers')
  getCustomers(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK);
    const body = [
      { id: 1, name: 'Customer 1' },
      { id: 2, name: 'Customer 2' },
      { id: 3, name: 'Customer 3' },
      { id: 4, name: 'Customer 4' },
      { id: 5, name: 'Customer 5' },
    ];
    res.send(body);
  }
}
