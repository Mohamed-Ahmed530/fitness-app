import { Component, signal, computed, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ExploreCardComponent } from "../explore-card/explore-card.component";

// 1. Define the Product interface directly
export interface Item {
    _id: string;
    name: string;
    image: string;
    link?:string;
}

@Component({
    selector: 'app-carousel',
    imports: [CommonModule, ButtonModule, CarouselModule, TagModule, ExploreCardComponent],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
    responsiveOptions: any[] | undefined;
        carouselItems = input.required<Item[]>();
    // Set how many rows you want stacked vertically per slide 
    rowsPerColumn = input.required<number>();
    defaultImage = input<string>();

    ngOnInit(): void {
        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }


    //  Compute chunks dynamically from the raw data
    groupedItems = computed(() => {
        const flatList = this.carouselItems();
        const chunks: Item[][] = [];
        for (let i = 0; i < flatList.length; i += this.rowsPerColumn()) {
            chunks.push(flatList.slice(i, i + this.rowsPerColumn()));
        }
        return chunks;
    });


}
