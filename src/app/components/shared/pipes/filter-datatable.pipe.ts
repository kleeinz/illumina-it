import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filterDataTable'
})
export class FilterDataTablePipe implements PipeTransform {

  transform(values: any[], input: string, model: string) : any {
     if (input && model === "users")
        return _.filter(values, row => row.username.indexOf(input) > -1);
     if (input && model === "clients")
        return _.filter(values, row => row.name.indexOf(input) > -1);
      return values;
  }

}
