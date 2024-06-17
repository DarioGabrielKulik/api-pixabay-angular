import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {


private error$ = new Subject<string>(); 
private terminoBusqueda$ = new Subject<string>();
constructor(private https:HttpClient){}

  setError(message:string){
    this.error$.next(message);
  }

  getError():Observable<string>{
    return this.error$.asObservable();
  }

  setTerminoBusqueda(message:string){
    this.terminoBusqueda$.next(message);
  }

  getTerminoBusqueda():Observable<string>{
    return this.terminoBusqueda$.asObservable();
  }

  getObtenerImagenes(busqueda:string, paginaActual:number, imagenPorPagina:number):Observable<any>{
    const URL = 'https://pixabay.com/api/?key=36018845-09cec70273603d362a71a4cdf&q='+busqueda+'&image_type=photo&per_page='+imagenPorPagina+'&page='+paginaActual;
   return this.https.get(URL);
  }
}
