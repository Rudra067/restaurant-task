import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.scss']
})
export class ViewRestaurantComponent implements OnInit {

  restaurantDetail: object;

  mapType: string;

  lat: any;
  long: any;
  selectedMarker;
  markers = [];

  constructor(public firebaseService: FirebaseService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      this.restaurantDetail = routeData['data'];
    });

    this.mapType = 'roadmap';
    this.lat = parseFloat(this.restaurantDetail['location']['lat']);
    this.long = parseFloat(this.restaurantDetail['location']['long']);
    const obj = {lat: this.lat, lng: this.long, alpha: 1};
    this.markers.push(obj);
  }

  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
