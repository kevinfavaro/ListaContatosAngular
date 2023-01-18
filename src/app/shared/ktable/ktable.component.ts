import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ktable',
  templateUrl: './ktable.component.html',
  styleUrls: ['./ktable.component.scss']
})
export class KtableComponent implements AfterViewInit {

  @Input() columns : any = null;
  @Input() data : any[] = [];

  @Output() rowClick = new EventEmitter<any>();

  @ViewChild(MatTable) table: MatTable<any>|undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator|undefined;
  @ViewChild(MatSort) sort: MatSort|undefined;


  displayedColumns : string[] = [];
  dataSource = new MatTableDataSource<any>(this.data); 

  constructor(private _liveAnnouncer: LiveAnnouncer) {
  } 

  ngOnInit(){
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
  }

  ngOnChanges() {
    this.updateTable();
  }

  updateTable(){
    this.displayedColumns = this.columns ?? Object.keys(this.data[0]);
    this.dataSource.data = this.data;
  }

  clickRow(row: any){
    this.rowClick.emit(row);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}