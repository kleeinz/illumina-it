import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filterDataTable'
})
export class FilterDataTablePipe implements PipeTransform {

  transform(values: any[], input: string) : any {
     if (input)
        return _.filter(values, row => row.username.indexOf(input) > -1);
      return values;
  }

}
