import { Component } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrl: './buscar-imagen.component.css'
})
export class BuscarImagenComponent {
nombreImagen:string = '';  
constructor(private _serviceImage:ImagenService){}

buscarImagenes(){
  if(this.nombreImagen === ''){
    this._serviceImage.setError('Ingrese una palabra para buscar una imagen');
    return;
  }

  this._serviceImage.setTerminoBusqueda(this.nombreImagen);
}



}
