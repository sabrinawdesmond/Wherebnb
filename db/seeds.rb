require "faker"

ApplicationRecord.transaction do
  puts "Destroying old data..."
  Booking.destroy_all
  Review.destroy_all
  Listing.destroy_all
  User.destroy_all

  puts "Creating users..."
  demo = User.create!(
    username: "Demo-lition",
    email: "demo@user.io",
    password: "password"
  )

  users = [demo]
  10.times do
    users << User.create!(
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: "password"
    )
  end

  puts "Creating listings..."
  listings_data = [
    {
      title: "Beachfront Cottage with Ocean Views",
      description: "Wake up to the sound of waves in this charming beachfront cottage. Featuring a private deck overlooking the Pacific, a fully equipped kitchen, and cozy interiors. Perfect for couples or families looking for a coastal getaway. The cottage sleeps up to four guests and includes beach towels, chairs, and an outdoor shower.",
      address: "123 Ocean Drive",
      city: "Santa Monica",
      country: "USA",
      latitude: 34.0195,
      longitude: -118.4912,
      price: 285,
      num_beds: 2,
      num_rooms: 3,
      num_bathrooms: 1,
      photo_url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"
    },
    {
      title: "Modern Manhattan Loft in SoHo",
      description: "Sleek and sophisticated loft in the heart of SoHo. Floor-to-ceiling windows, exposed brick walls, and designer furnishings create a true New York experience. Walking distance to world-class restaurants, art galleries, and boutique shopping. The building has a 24-hour doorman and rooftop terrace.",
      address: "456 Spring Street",
      city: "New York",
      country: "USA",
      latitude: 40.7241,
      longitude: -74.0027,
      price: 420,
      num_beds: 1,
      num_rooms: 2,
      num_bathrooms: 1,
      photo_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
    },
    {
      title: "Cozy Mountain Cabin Near Ski Slopes",
      description: "Escape to this rustic-chic cabin nestled in the Rocky Mountains. A stone fireplace, outdoor hot tub, and stunning mountain panoramas await you. The cabin is steps from world-class ski trails in winter and gorgeous hiking paths in summer. Fully stocked kitchen, ski storage, and gear drying room included.",
      address: "789 Pine Ridge Road",
      city: "Aspen",
      country: "USA",
      latitude: 39.1911,
      longitude: -106.8175,
      price: 350,
      num_beds: 3,
      num_rooms: 4,
      num_bathrooms: 2,
      photo_url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800"
    },
    {
      title: "Tropical Waterfront Villa with Pool",
      description: "Luxurious villa with a private infinity pool overlooking Biscayne Bay. This sun-drenched retreat features open-plan living, a gourmet kitchen, and lush tropical gardens. Minutes from South Beach nightlife, excellent dining, and the Art Deco Historic District. Complimentary paddleboards and kayaks for guests.",
      address: "321 Bay View Drive",
      city: "Miami",
      country: "USA",
      latitude: 25.7617,
      longitude: -80.1918,
      price: 550,
      num_beds: 4,
      num_rooms: 5,
      num_bathrooms: 3,
      photo_url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800"
    },
    {
      title: "Charming Back Bay Brownstone",
      description: "Step back in time in this meticulously restored Victorian brownstone in Boston's prestigious Back Bay neighborhood. Original crown moldings, parquet floors, and soaring ceilings blend seamlessly with modern amenities. Stroll to the Public Garden, Newbury Street boutiques, and acclaimed restaurants from the front door.",
      address: "88 Commonwealth Avenue",
      city: "Boston",
      country: "USA",
      latitude: 42.3496,
      longitude: -71.0820,
      price: 210,
      num_beds: 2,
      num_rooms: 3,
      num_bathrooms: 1,
      photo_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
    },
    {
      title: "Desert Modern Home with Mountain Views",
      description: "Architect-designed desert retreat featuring floor-to-ceiling glass walls framing the Sonoran Desert and McDowell Mountains. A heated private pool, outdoor kitchen, and fire pit make evenings magical. Interiors combine warm organic textures with minimalist desert-inspired design.",
      address: "555 Camelback Road",
      city: "Scottsdale",
      country: "USA",
      latitude: 33.4942,
      longitude: -111.9261,
      price: 390,
      num_beds: 3,
      num_rooms: 4,
      num_bathrooms: 2,
      photo_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
    },
    {
      title: "Treehouse Hideaway in Old Growth Forest",
      description: "Live your childhood dream in this breathtaking treehouse perched 30 feet up in a Douglas fir canopy. Handcrafted woodwork, a spiral staircase, a covered deck, and stargazing skylights offer a truly immersive forest experience. Close enough to Portland for day trips, secluded enough to feel worlds away.",
      address: "12 Forest Lane",
      city: "Portland",
      country: "USA",
      latitude: 45.5051,
      longitude: -122.6750,
      price: 180,
      num_beds: 1,
      num_rooms: 1,
      num_bathrooms: 1,
      photo_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
    },
    {
      title: "Rustic Southern Farmhouse on 5 Acres",
      description: "Authentic 1890s farmhouse lovingly restored with all modern conveniences. Wraparound porch for morning coffee, clawfoot soaking tubs, a wood-burning stove, and five acres of rolling Tennessee pasture to explore. The farmhouse is a short drive from downtown Nashville's honky-tonks and live music scene.",
      address: "4400 Old Hickory Boulevard",
      city: "Nashville",
      country: "USA",
      latitude: 36.1627,
      longitude: -86.7816,
      price: 225,
      num_beds: 4,
      num_rooms: 6,
      num_bathrooms: 2,
      photo_url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"
    },
    {
      title: "Lakefront A-Frame with Private Dock",
      description: "Iconic A-frame cabin on the pristine shores of Lake Tahoe with your own private dock, kayaks, and paddleboards. Soaring cathedral ceilings, a wood-burning fireplace, and panoramic lake views from every room. Ski resorts are minutes away in winter; hiking and water sports fill the summer days.",
      address: "900 Lakeshore Boulevard",
      city: "South Lake Tahoe",
      country: "USA",
      latitude: 38.9399,
      longitude: -119.9772,
      price: 315,
      num_beds: 3,
      num_rooms: 4,
      num_bathrooms: 2,
      photo_url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    },
    {
      title: "River View Studio in the Loop",
      description: "Chic high-rise studio with sweeping views of the Chicago River and downtown skyline. Freshly renovated with luxury finishes, a chef's kitchen, and blackout curtains for deep sleeps. Building amenities include a rooftop pool, fitness center, and 24-hour concierge. Steps from the Riverwalk and Millennium Park.",
      address: "225 N. Michigan Avenue",
      city: "Chicago",
      country: "USA",
      latitude: 41.8858,
      longitude: -87.6245,
      price: 155,
      num_beds: 1,
      num_rooms: 1,
      num_bathrooms: 1,
      photo_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
    }
  ]

  listings = listings_data.map.with_index do |data, i|
    Listing.create!(data.merge(host_id: users[i % users.length].id))
  end

  puts "Creating reviews..."
  review_bodies = [
    "Absolutely loved this place! The host was incredibly responsive and the property was exactly as described. Would definitely come back.",
    "Perfect getaway. The space was immaculate, beautifully decorated, and had everything we needed. The location was unbeatable.",
    "Such a wonderful stay. The views were even better in person than in the photos. We didn't want to leave!",
    "Great value for the price. Clean, comfortable, and perfectly located. The host went above and beyond to make us feel welcome.",
    "We had an amazing time. The space had such a unique character and the amenities were top notch. Highly recommend!",
    "One of the best Airbnb stays we've had. The property was spotless and the check-in process was seamless.",
    "Stunning property in a perfect location. Every detail was thoughtfully considered. Already planning our return trip.",
    "A truly special place to stay. Felt like a home away from home. The host's local tips were invaluable."
  ]

  listings.each do |listing|
    rand(3..5).times do
      reviewer = users.reject { |u| u.id == listing.host_id }.sample
      Review.create!(
        reviewer_id: reviewer.id,
        listing_id: listing.id,
        body: review_bodies.sample,
        overall: rand(4..5),
        cleanliness: rand(4..5),
        accuracy: rand(4..5),
        communication: rand(4..5),
        location: rand(4..5),
        check_in: rand(4..5),
        value: rand(3..5)
      )
    end
  end

  puts "Done! Created #{User.count} users, #{Listing.count} listings, #{Review.count} reviews."
end
