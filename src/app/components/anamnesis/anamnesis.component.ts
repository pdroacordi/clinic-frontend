import { Component, OnInit } from '@angular/core';
import { CEP } from '../../model/cepAPI';
import { CommonService } from '../../services/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../model/Patient';
import { PatientsService } from '../../services/patients/patients.service';
import { format, parseISO } from 'date-fns';
import { PathToFile } from '../../model/PathToFile';
import { UploadService } from '../../services/upload/upload.service';
import { Media } from '../../model/Media';

enum Tab {
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

export class AnamnesisComponent implements OnInit {
  Tab = Tab;
  public activeTab: Tab = Tab.BASIC;
  public loading: boolean = false;
  public patient: Patient = new Patient();
  private idPatient: string = "";
  public file: File | null = null;
  public mediaDesc : string = "";

  public alertMsg: string = "";
  public alertTitle: string = "";

  constructor(private commonServices: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private patientService: PatientsService,
    private uploadService: UploadService) {
    this.idPatient = this.activatedRoute.snapshot.params["id"];
    this.getPatient(parseInt(this.idPatient));
  }

  ngOnInit(): void { }

  public fillFieldsWithObtainedInfo() {
    if (this.patient.zipCode === "" || this.patient.zipCode.length < 8) {
      return;
    }
    this.loading = true;
    this.commonServices.getZipCodeInfo(this.patient.zipCode).subscribe({
      next: (res: CEP) => {
        this.loading = false;
        this.patient.city = res.localidade;
        this.patient.state = res.uf;
        this.patient.address = res.logradouro;
        this.patient.neighborhood = res.bairro;
      },
      error: (err: any) => {
        this.loading = false;
      }
    })
  }

  public backToHome() {
    this.router.navigate(['/']);
  }

  public savePatient() {
    if (this.idPatient === "new")
      this.createPatient();
    else
      this.updatePatient();
  }

  public createPatient() {
    this.loading = true;
    this.patientService.createPatient(this.patient).subscribe({
      next: (res: Patient) => {
        this.loading = false;
        this.idPatient = res.id.toString();
        this.router.navigate([`/anamnesis/${this.idPatient}`]);
        this.showAlert("Sucesso", "Paciente cadastrado com sucesso");
      },
      error: (err: any) => {
        this.loading = false;
        this.showAlert("Erro", "Erro ao cadastrar");
      }
    })
  }

  public updatePatient() {
    this.loading = true;
    this.patientService.updatePatient(this.patient).subscribe({
      next: (res: Patient) => {
        this.loading = false;
        this.showAlert("Sucesso", "Paciente atualizado");
      },
      error: (err: any) => {
        this.loading = false;
        this.showAlert("Erro", "Erro ao atualizar");
      }
    })
  }

  public getPatient(id: number): void {
    if (isNaN(id)) {
      return;
    }
    this.loading = true;
    this.patientService.getPatientById(id).subscribe({
      next: (res: Patient) => {
        this.loading = false;
        this.patient = res;
        this.patient.birthday = format(parseISO(res.birthday), 'yyyy-MM-dd');
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 404) {
          this.showAlert("Erro", "Paciente não encontrado");
          this.router.navigate(['anamnesis/new'])
        }
      }
    });
  }

  public uploadProfilePicture(data: any) {
    let file = data.target.files[0];
    let formData = new FormData();
    formData.append("file", file, file.name);
    this.loading = true;
    this.uploadService.uploadFile(formData).subscribe({
      next: (res: PathToFile) => {
        this.loading = false;
        console.log(res.path);
        this.showAlert("Sucesso", "Envio de mídia realizado com sucesso");
        this.patient.diagnosis.pictureLink = res.path;
      },
      error: (err: any) => {
        this.loading = false;
        this.showAlert("Erro", "Falha ao realizar envio de mídia");
      }
    });
  }

  public showAlert(title: string, msg: string) {
    document.getElementById("btnModalAlert")?.click();
    this.alertMsg = msg;
    this.alertTitle = title;
  }

  public showMediaForm() {
    document.getElementById("btnModalMedia")?.click();
  }

  public onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  public saveMedia(): void {
    if (this.file) {
      let formData = new FormData();
      formData.append("file", this.file, this.file.name);
      this.loading = true;
      this.uploadService.uploadFile(formData).subscribe({
        next: (res: PathToFile) => {
          this.loading = false;
          let m : Media = new Media();
          m.link = res.path;
          m.name = this.mediaDesc;
          this.patient.media.push(m);
        },
        error: (err: any) => {
          this.loading = false;
          this.showAlert("Erro", "Falha ao realizar envio de mídia");
        }
      });
    }
  }

}
