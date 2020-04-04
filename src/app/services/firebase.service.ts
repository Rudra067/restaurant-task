import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Restaurant } from 'src/app/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firestore: AngularFirestore) {}

  getRestaurants() {
    return this.firestore.collection('restaurants').snapshotChanges();
  }

  getRestaurantDetailById(restaurantId) {
    return this.firestore.collection('restaurants').doc(restaurantId).valueChanges();
  }
  createRestaurant(restaurant: Restaurant){
    return this.firestore.collection('restaurants').add(restaurant);
  }

  updateRestaurant(restaurant: Restaurant){
    delete restaurant.id;
    this.firestore.doc('restaurants/' + restaurant.id).update(restaurant);
  }

  deleteRestaurant(restaurantId: string){
    this.firestore.doc('restaurants/' + restaurantId).delete();
  }

  searchRestaurants(searchValue) {
    return this.firestore.collection('restaurants', ref => ref.where('name', '>=', searchValue)
      .where('name', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();

  }
}
