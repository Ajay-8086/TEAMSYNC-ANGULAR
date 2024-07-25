import { formatDistanceToNow } from 'date-fns';
import { Pipe } from "@angular/core";
@Pipe({
    name: 'timeAgo'
  })
export class TimeAgoPipe{
    // pipe for transforming the date input into an how much time ago 
    transform(value: Date | string | undefined): string {
        if (!value) {
          return 'Unknown time';
        }
        return formatDistanceToNow(new Date(value), { addSuffix: true });
      }
}