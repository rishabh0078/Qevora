<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::create([
            'title' => 'Wedding Venue Websites',
            'description' => 'Elegant, conversion-focused websites that showcase your venue and help couples envision their perfect day.',
            'features' => [
                'Virtual venue tours',
                'Package & pricing displays',
                'Inquiry & booking forms',
                'Photo & video galleries'
            ],
            'icon' => '💒',
            'order' => 1
        ]);

        Service::create([
            'title' => 'Hotel & Resort Websites',
            'description' => 'Premium digital experiences that reflect your brand and drive direct bookings.',
            'features' => [
                'Direct booking integration',
                'Room showcase & amenities',
                'Guest experience highlights',
                'Special offers management'
            ],
            'icon' => '🏨',
            'order' => 2
        ]);

        Service::create([
            'title' => 'Custom Web Applications',
            'description' => 'Tailored solutions including booking systems, event management dashboards, and guest portals.',
            'features' => [
                'Booking management systems',
                'Event calendars',
                'Admin dashboards',
                'CRM integration'
            ],
            'icon' => '⚙️',
            'order' => 3
        ]);

        Service::create([
            'title' => 'Maintenance & Support',
            'description' => 'Ongoing support to keep your website secure, fast, and updated with fresh content.',
            'features' => [
                'Security updates',
                'Content updates',
                'SEO optimization',
                'Technical support'
            ],
            'icon' => '🛠️',
            'order' => 4
        ]);
    }
}
