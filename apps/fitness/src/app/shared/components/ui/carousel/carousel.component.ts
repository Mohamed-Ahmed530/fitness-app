import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

// 1. Define the Product interface directly
export interface Product {
    id: string;
    code?: string;
    name: string;
    description?: string;
    image: string;
    price: number;
    category?: string;
    quantity?: number;
    inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
    rating?: number;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, ButtonModule, CarouselModule, TagModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  // 2. Initialize inline mock data matching the interface
    products = signal<Product[]>([
        { id: '1000', name: 'Bamboo Watch', image: 'bamboo-watch.jpg', price: 65, inventoryStatus: 'INSTOCK' },
        { id: '1001', name: 'Black Watch', image: 'black-watch.jpg', price: 72, inventoryStatus: 'OUTOFSTOCK' },
        { id: '1002', name: 'Blue Band', image: 'blue-band.jpg', price: 79, inventoryStatus: 'LOWSTOCK' },
        { id: '1003', name: 'Blue T-Shirt', image: 'blue-t-shirt.jpg', price: 29, inventoryStatus: 'INSTOCK' },
        { id: '1004', name: 'Bracelet', image: 'bracelet.jpg', price: 15, inventoryStatus: 'INSTOCK' },
        { id: '1005', name: 'Brown Purse', image: 'brown-purse.jpg', price: 120, inventoryStatus: 'OUTOFSTOCK' }
    ]);

    // 3. Set how many rows you want stacked vertically per slide 
    rowsPerColumn = 1;

    // 4. Compute chunks dynamically from the raw data
    groupedProducts = computed(() => {
        const flatList = this.products();
        const chunks: Product[][] = [];
        for (let i = 0; i < flatList.length; i += this.rowsPerColumn) {
            chunks.push(flatList.slice(i, i + this.rowsPerColumn));
        }
        return chunks;
    });

    // Control structural responsive columns
    responsiveOptions = [
        { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
        { breakpoint: '1199px', numVisible: 2, numScroll: 1 },
        { breakpoint: '767px', numVisible: 1, numScroll: 1 }
    ];

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'secondary';
        }
    }
}
