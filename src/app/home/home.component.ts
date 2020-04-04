import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  restaurants: any;
  searchValue: string = "";

  mapType: string;
  lat: any;
  long: any;
  selectedMarker;
  markers = [];
  
  showList: boolean;

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
      this.showList = true;
      this.getRestaurants();
  }

  getRestaurants() {
    this.firebaseService.getRestaurants().subscribe(data => {
      this.restaurants = data.map(e => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data()
        };
      });
    });
  }

  viewDetails(restaurantId){
    this.router.navigate(['/details/' + restaurantId]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    const value = this.searchValue.toUpperCase();
    if (value !== '') {
      this.firebaseService.searchRestaurants(value)
      .subscribe(result => {
        this.restaurants = result.map(e => {
          return {
            id: e.payload.doc.id,
            data: e.payload.doc.data()
          };
        });
      });
    } else {
      this.getRestaurants();
    }
  }

  deleteRestaurant(restaurantId) {
    this.firebaseService.deleteRestaurant(restaurantId);
    this.getRestaurants();
  }

  onItemChange(event) {
    if (event.target.value === 'list') {
      this.showList = true;
    } else {
      this.showList = false;
      this.showMapView();
    }
  }

  showMapView() {
    this.mapType = 'roadmap';
    this.restaurants.forEach(element => {
      this.lat = parseFloat(element.data['location']['lat']);
      this.long = parseFloat(element.data['location']['long']);
      const obj = {lat: this.lat, lng: this.long, alpha: 1};
      this.markers.push(obj);
    });
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

}
