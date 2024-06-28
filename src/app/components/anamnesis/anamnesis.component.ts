import { Component } from '@angular/core';
import { CEP } from '../../model/cepAPI';
import { CommonService } from '../../services/common/common.service';
import { Router } from '@angular/router';

enum Tab{
  BASIC = 'basic',
  CLINICAL = 'clinical',
  TEST = 'test',
  MEDIA = 'media'
}

@Component({
  selector: 'app-anamnesis',
  templateUrl: './anamnesis.component.html',
  styleUrl: './anamnesis.component.css'
})

export class AnamnesisComponent {
  Tab = Tab;
  public activeTab : Tab = Tab.BASIC;
  public loading : boolean = false;
  public zipCode : string = "";
  public city : string = "";
  public state : string = "";
  public address : string = "";
  public neighborhood : string = "";

  constructor(private commonServices : CommonService, private router : Router){}

  public fillFieldsWithObtainedInfo(){
    if(this.zipCode === "" || this.zipCode.length < 8){
      return;
    }
    this.loading = true;
    this.commonServices.getZipCodeInfo(this.zipCode).subscribe({
      next: (res : CEP) => {
        this.loading = false;
        this.city = res.localidade;
        this.state = res.uf;
        this.address = res.logradouro;
        this.neighborhood = res.bairro;
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }

  public backToHome(){
    this.router.navigate(['/']);
  }
  
}
