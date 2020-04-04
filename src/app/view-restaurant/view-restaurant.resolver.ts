import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class ViewRestaurantrResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const restaurantId = route.paramMap.get('id');
      this.firebaseService.getRestaurantDetailById(restaurantId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
