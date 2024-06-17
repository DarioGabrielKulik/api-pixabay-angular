import { Component } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrl: './listar-imagen.component.css'
})
export class ListarImagenComponent {
imagenPorPagina:number=30;
paginaActual:number=1;
calcularTotalPagina:number=0;
spinner:boolean = false;
termino:string = "";
subscription:Subscription;
listImagen: any[]=[]

  constructor(private _imagenService:ImagenService){  
    this.subscription = this._imagenService.getTerminoBusqueda().subscribe(data =>{
      this.paginaActual = 1;
    this.spinner= true;
      this.termino = data; 
      this.obtenerImagenes()
    })
  }

  obtenerImagenes(){
    this._imagenService.getObtenerImagenes(this.termino, this.paginaActual, this.imagenPorPagina).subscribe(data =>{
      this.spinner=false;
      
      if(data.hits.length === 0){
        this._imagenService.setError('Opssss no se encontro el recurso');
        return;
      }
     
      this.calcularTotalPagina = Math.ceil(data.totalHits / this.imagenPorPagina)
      console.log(data)
      this.listImagen = data.hits;
    }, error =>{
      this.spinner = false;
      this._imagenService.setError('Opss..... ocurrio un error')
    })
  }

  siguientePagina(){
  this.paginaActual++;
  this.spinner = true;
  this.listImagen = []
  this.obtenerImagenes()
  }
  anteriorPagina(){
  this.paginaActual--;
  this.spinner = true;
  this.listImagen = []
  this.obtenerImagenes()
  }

  anteriorPaginaClass(){
    if(this.paginaActual === 1){
      return false;
    }else{
      return true;
    }
  }
  posteriorPaginaClass(){
    if(this.paginaActual === this.calcularTotalPagina){
      return false;
    }else{
      return true;
    }
  }
}
