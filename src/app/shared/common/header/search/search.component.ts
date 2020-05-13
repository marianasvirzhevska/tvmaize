import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchString: string;
  showInput = false;

  constructor() { }

  @Output() onSearchChange = new EventEmitter();

  onSearch(event): void {
    this.onSearchChange.emit(event);
  }

  clear(): void {
    this.searchString = '';
    this.onSearchChange.emit('');
    this.showInput = !this.showInput;
  }

  handleShowInput(): void {
    this.showInput = !this.showInput;
  }
}
