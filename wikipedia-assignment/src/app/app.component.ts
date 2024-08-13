import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {WikipediaHttpService} from "./services/wikipedia-http.service";
import { debounceTime, distinctUntilChanged, take } from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {SearchResult} from "./interfaces/searchresult";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SnippetPopupComponent} from "./components/snippet-popup/snippet-popup.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'wikipedia-assignment';
  private data: SearchResult[] = [];
  private filteredData: SearchResult[] = [];
  displayedColumns: string[] = ['title', 'snippet', 'timestamp'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChildren('snippetCell') snippetCells!: QueryList<ElementRef>;
  cellContents: Map<HTMLElement, number> = new Map(); // To store line counts for cells
  searchControl = new FormControl('');


  constructor(private wikipediaHttp: WikipediaHttpService, private dialog: MatDialog) {
    this.wikipediaHttp.getData().pipe(
      take(1)
    ).subscribe((data) => {
      this.data = data;
      this.filteredData = data;
      console.log(data);
      this.dataSource.data = this.data.map((item: SearchResult) => ({
        title: item.sectionTitle ?? item.title,
        snippet: item.sectionSnippet ?? item.snippet,
        timestamp: item.timestamp
      }));
    });
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((value) => {
      console.log(value);
      const lowerCaseValue = value?.toLowerCase();
      this.filterResults(lowerCaseValue)
    })
  }

  ngAfterViewInit() {
    this.snippetCells.changes.subscribe(() => {
      this.snippetCells.forEach((cell: ElementRef) => {
        const lineCount = this.countLines(cell.nativeElement);
        if (lineCount > 2) {
          cell.nativeElement.innerHTML = "..."
        }
        this.cellContents.set(cell.nativeElement, lineCount);
      });
    });
  }

  countLines(element: HTMLElement): number {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    const height = element.offsetHeight;
    return Math.round(height / lineHeight);
  }

  filterResults(searchWord: string | undefined) {
    if (searchWord === undefined || searchWord.length === 0) {
      this.dataSource.data = this.data.map((item: SearchResult) => ({
        title: item.sectionTitle ?? item.title,
        snippet: item.sectionSnippet ?? item.snippet,
        timestamp: item.timestamp
      }));
      return;
    }
    this.filteredData = this.data.filter((item: SearchResult) => {
      return item.title.toLowerCase().includes(searchWord) ||
        item.sectionTitle?.toLowerCase().includes(searchWord) ||
        item.snippet.toLowerCase().includes(searchWord) ||
        item.sectionSnippet?.toLowerCase().includes(searchWord)

    })
    this.dataSource.data = this.filteredData.map((item: SearchResult) => ({
      title: item.sectionTitle ?? item.title,
      snippet: item.sectionSnippet ?? item.snippet,
      timestamp: item.timestamp
    }));
  }

  showSnippet(snippet: string) {
    this.dialog.open(
      SnippetPopupComponent,
      { data: snippet }
    );
  }
}
