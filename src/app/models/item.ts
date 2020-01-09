import { Type } from 'class-transformer';

export class Item {
  id: number;
  name: string;
  description: string;
  @Type(() => Date) countDate: string;
  count: number;
  type: string;

  get countDateFormatted(): string {
    const date = new Date(this.countDate);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
