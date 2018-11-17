import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {HttpErrorResponse} from '@angular/common/http';
import 'babel-polyfill';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

    public currNames = [];
    public currPrices = [];
    public currVal;
    public convCurrVal = 'Click See Reult To Convert Currency';
    public fromCurr = 'EUR';
    public toCurr = 'AED';
    public resultCurRates = [];
    rForm: FormGroup;
    loginChk = false;
    constructor(private dataService: DataService, private fb: FormBuilder) {
        this.rForm = fb.group({
            'figure': [null, Validators.required],
            'calculated': [null, Validators.required],
        });
    }

    ngOnInit() {
        this.getAllCurrencies();
    }
    getAllCurrencies() {
        this.dataService.getAllCurrencies().subscribe(
            result => {
                // alert(JSON.stringify(result));
                var all=JSON.stringify(result);
                var allParsed=JSON.parse(all);
                // console.log(JSON.stringify(result));
                this.currNames = Object.keys(allParsed.rates);
                this.resultCurRates=Object.entries(allParsed.rates).map(([currencyName, currencyRate]) => ({currencyName,currencyRate}));

            },(err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    alert("Client-side error occured.");
                } else {
                    alert("Server-side error occured."+JSON.stringify(err));
                }
            });
    }
    checkResult() {
        this.dataService.convertCurrency(this.fromCurr,this.toCurr,this.currVal).subscribe(
            result =>{

                // OWN LOGIC iS USED BECAUSE FREE SUBSCRIPTION PLAN DOES NOT SUPPORT CONVERSION API ON FIXER.IO.
                let fromBaseRate=0;
                let toBaseRate=0;
                for(let i=0; i<this.resultCurRates.length;i++) {
                    if(this.toCurr==this.resultCurRates[i].currencyName){
                        toBaseRate=this.resultCurRates[i].currencyRate;
                        this.convCurrVal=JSON.stringify(this.currVal*toBaseRate);
                    }
                }

            });
    }
    /*setCurrName(e){
       this.fromCurr=e;
    }*/
    setConvertToCurrName(e){
       this.toCurr=e;
    }

}
