import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss'],
})
export class BasicTableComponent implements OnInit {
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(false);
  }
}
