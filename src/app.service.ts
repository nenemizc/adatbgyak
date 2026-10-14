import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Festmeny } from './festmenyek.js';

const mySqlConnection = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'',
  database:'festmenyek'
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async festmenyekDb() {
      const [results,fields] = await mySqlConnection.execute('SELECT COUNT(*) AS db FROM festmenyek');
      const rows = results as any;
      return rows[0].db as number;
    }

    async festmenyLista(minev: number){
      const [results] = await mySqlConnection.execute('SELECT id, title, painter, painted_at FROM festmenyek WHERE painted_at >= ?'
      [minev]
      );
      const rows = results as Festmeny[];
      return rows;
    }
}
