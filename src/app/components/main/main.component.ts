import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../services/patients/patients.service';
import { Patient } from '../../model/Patient';
import { Pageable } from '../../model/Pageable';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  public list: Patient[] = [];
  public keyword: string = "";
  public loading: boolean = true;
  public curPatientPage : number = 0;
  public hasMorePages : boolean = true;
  public constructor(private patientService: PatientsService) {
      this.getPatientList();
  }
  ngOnInit(): void {

  }

  public searchByName() {
    this.loading = true;
    this.patientService.getPatientsByName(this.keyword).subscribe({
      next: (res: Patient[]) => {
        this.list = res;
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }

  public getPatientList(){
    this.loading = true;
    this.patientService.getAllPatients(this.curPatientPage).subscribe({
      next: (res: Pageable) => {
        this.hasMorePages = !res.last;
        this.loading = false;
        this.list = res.content;
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }

  public loadMorePatients(){
    this.curPatientPage++;
    this.loading = true;
    this.patientService.getAllPatients(this.curPatientPage).subscribe({
      next: (res: Pageable) => {
        this.loading = false;
        this.hasMorePages = !res.last;
        let morePatients : Patient[] = res.content;
        this.list = this.list.concat(morePatients);
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }

}
