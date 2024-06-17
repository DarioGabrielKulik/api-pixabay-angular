import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from './../../services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent{
texto:string = '';
mostrar:boolean = false;
suscripcion:Subscription

constructor(private _ImagenService:ImagenService){

  this.suscripcion = this._ImagenService.getError().subscribe(date =>{
    this.mostrar = true
    this.texto = date;
  })

}

ngOndestroy():void{
  this.suscripcion.unsubscribe;
}



}
