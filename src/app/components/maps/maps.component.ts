import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, GoogleMap, MapAdvancedMarker],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {


  center: google.maps.LatLngLiteral = {lat: 19.25147659883843, lng: -99.70381354282799};
  zoom = 15;
  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = {gmpDraggable: false};
  advancedMarkerPositions: google.maps.LatLngLiteral[] = [
    { lat: 19.25147659883843, lng: -99.70381354282799 }
  ];
  

}
