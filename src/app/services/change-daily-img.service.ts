import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangeDailyImgService {
  url = environment.serverURL_changeImg;

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<any[]> {
    return this.http.get<any[]>(this.url)
      .pipe(map((data) => data));
  }


}
