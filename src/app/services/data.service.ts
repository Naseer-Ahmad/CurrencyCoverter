import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    dataURL = 'http://data.fixer.io/api/';
    access_key = '644b364a998d0936db17dad48953f6fc';

// get the most recent exchange rates via the "latest" endpoint:
   /* $.ajax({
               url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,
    dataType: 'jsonp',
    success: function(json) {

        // exchange rata data is stored in json.rates
        alert(json.rates.GBP);

        // base currency is stored in json.base
        alert(json.base);

        // timestamp can be accessed in json.timestamp
        alert(json.timestamp);

    }
});*/
    constructor(private http:HttpClient) { }
    getAllCurrencies(){
        return this.http.get(this.dataURL + '/latest'+ '?access_key=' + this.access_key);
        /*.map((res:Response)=>res.json());*/
    }
    convertCurrency(from,to,amount){
        return this.http.get(this.dataURL + '/convert'+ '?access_key=' + this.access_key+'&from'+from+'$to'+to+'$amount'+amount+'');
        /*.map((res:Response)=>res.json());*/
    }
}
