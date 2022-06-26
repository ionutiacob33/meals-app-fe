import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/service/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes().subscribe();
    console.log('Fetching from DB');
  }
}
