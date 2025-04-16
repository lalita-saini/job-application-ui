export class JobApplication {
    id: number;
    companyName: string;
    position: string;
    status: string;
    dateApplied: string;
  
    constructor(
      id: number = 0,  
      companyName: string = '',
      status: string = '',
      position: string = '',
      dateApplied: string = ''
    ) {
      this.id = id;
      this.companyName = companyName;
      this.status = status;
      this.position = position;
      this.dateApplied = dateApplied;
    }
  }
  