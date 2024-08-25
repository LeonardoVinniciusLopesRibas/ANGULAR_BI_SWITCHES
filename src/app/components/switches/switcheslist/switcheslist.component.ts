import { Component, inject } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Switches } from '../../../model/switches';
import { SwitchesService } from '../../../services/switches.service';
import { Button, ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switcheslist',
  standalone: true,
  imports: [TableModule, ButtonModule, ProgressSpinnerModule, CommonModule, 
    MdbFormsModule, FormsModule],
  templateUrl: './switcheslist.component.html',
  styleUrls: ['./switcheslist.component.scss']
})
export class SwitcheslistComponent {
  switchesList!: Switches[];
  query: string = '';
  first = 0;
  rows = 20;
  isLoading = true;

  constructor() { }

  switchesService = inject(SwitchesService);

  recebeQuery(query: string){
    this.query = query;
    this.loadSwitches();
  }

  private loadSwitches() {
    this.isLoading = true;

    this.switchesService.get(this.query).subscribe(
      (data: Switches[]) => {
        this.switchesList = data;
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching switches', error);
        this.isLoading = false;
      }
    );
  }

  ngOnInit() {
    this.loadSwitches();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: TablePageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.switchesList ? this.first === this.switchesList.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.switchesList ? this.first === 0 : true;
  }
}
