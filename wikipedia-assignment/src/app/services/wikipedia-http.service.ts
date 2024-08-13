import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {map, Observable} from "rxjs";
import {SearchResult} from "../interfaces/searchresult";

@Injectable({
  providedIn: 'root'
})
export class WikipediaHttpService {

  private wikipediaUrl = environment.wikipediaUrl;
  constructor(private http: HttpClient) { }

  getData(): Observable<SearchResult[]> {
    const params = {
      action: 'query',
      format: 'json',
      list: 'search',
      utf8: '', 'formatversion': '2',
      srsearch: 'Angular',
      srprop: 'sectiontitle|sectionsnippet|snippet|timestamp',
      origin: '*',
    };
    return this.http.get(
      this.wikipediaUrl,
      { params }
    ).pipe(
      map((result: any): SearchResult[] => {
        return result.query.search.map((item: any) => ({
          title: item.title,
          snippet: item.snippet,
          sectionTitle: item.sectiontitle,
          sectionSnippet: item.sectionsnippet,
          timestamp: item.timestamp
        }))
      })
    )
  }
}
