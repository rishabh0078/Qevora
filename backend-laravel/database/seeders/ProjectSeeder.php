<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Project::create([
            'title' => 'Vintage Greens',
            'category' => 'Luxury Wedding Venue',
            'description' => 'A premium wedding venue website with elegant design',
            'image' => '/images/portfolio-1.png',
            'gallery' => ['/images/portfolio-1.png'],
            'featured' => true,
            'link' => null
        ]);

        \App\Models\Project::create([
            'title' => 'Royal Heritage Hotel',
            'category' => 'Luxury Hotel',
            'description' => 'A luxurious hotel website showcasing premium amenities',
            'image' => '/images/luxury_hotel.png',
            'gallery' => ['/images/luxury_hotel.png'],
            'featured' => true,
            'link' => null
        ]);

        \App\Models\Project::create([
            'title' => 'Garden View Resort',
            'category' => 'Premium Resort',
            'description' => 'A serene resort website with stunning visuals',
            'image' => '/images/luxury_resort.png',
            'gallery' => ['/images/luxury_resort.png'],
            'featured' => true,
            'link' => null
        ]);
    }
}
