<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Package;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Package::create([
            'name' => 'The Essential',
            'price' => 'Starting from ₹45,000',
            'description' => 'Perfect for boutique wedding venues and banquet halls.',
            'features' => [
                'Luxury Responsive Website',
                'Premium Animations & UI',
                'Contact Form Integration',
                'SEO Optimization',
                'WhatsApp Chat Support'
            ],
            'featured' => false,
            'order' => 1
        ]);

        Package::create([
            'name' => 'The Growth',
            'price' => 'Starting from ₹1.2 Lakh',
            'description' => 'Ideal for hotels needing content control and more leads.',
            'features' => [
                'Everything in Essential',
                'Custom Admin Panel (CMS)',
                'Dynamic Photo Gallery',
                'Booking Inquiry System',
                'Blog & News Section'
            ],
            'featured' => true,
            'order' => 2
        ]);

        Package::create([
            'name' => 'The Premium',
            'price' => 'Custom Quote',
            'description' => 'For luxury chains requiring a full digital ecosystem.',
            'features' => [
                'Full Custom Web Application',
                'Real-time Booking Engine',
                'Guest Portal & Dashboard',
                'Advanced Analytics',
                'Dedicated Account Manager'
            ],
            'featured' => false,
            'order' => 3
        ]);
    }
}
