# Supabase Setup Guide

Complete guide to setting up Supabase for authentication and database management.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Sign in
3. Click "New Project"
4. Fill in details:
   - Name: `starbucks-coffee`
   - Database Password: (secure password)
   - Region: Choose closest to your users
   - Pricing Plan: Free tier is perfect for this project

## Step 2: Database Schema

### Create Tables

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Profile Table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  rewards_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Products Table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Orders Table
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  delivery_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  customizations JSONB
);

-- Favorites Table
CREATE TABLE favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Stores Table
CREATE TABLE stores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'USA',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  hours JSONB,
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

### Insert Sample Data

```sql
-- Insert Sample Products
INSERT INTO products (name, description, category, price, image_url, rating, reviews_count) VALUES
('Caramel Macchiato', 'Freshly steamed milk with vanilla-flavored syrup, marked with espresso and topped with caramel drizzle', 'Hot Coffee', 5.95, 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62', 4.9, 2845),
('Iced White Mocha', 'White chocolate mocha with espresso and milk over ice', 'Cold Beverages', 6.25, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735', 4.8, 1932),
('Pumpkin Spice Latte', 'Espresso and steamed milk with pumpkin, cinnamon, nutmeg and clove', 'Seasonal', 6.45, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d', 4.9, 3421),
('Java Chip Frappuccino', 'Mocha sauce and Frappuccino chips blended with coffee and ice', 'Frappuccino', 5.75, 'https://images.unsplash.com/photo-1587080413959-06b859fb107d', 4.7, 2156),
('Nitro Cold Brew', 'Starbucks Cold Brew infused with nitrogen', 'Cold Brew', 5.45, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7', 4.8, 1678),
('Matcha Green Tea Latte', 'Smooth and creamy matcha sweetened just right', 'Hot Teas', 5.95, 'https://images.unsplash.com/photo-1536013669715-42bab8b45d11', 4.6, 1423);

-- Insert Sample Stores
INSERT INTO stores (name, address, city, state, zip_code, latitude, longitude, phone, features) VALUES
('Starbucks Reserve Roastery', '1124 Pike St', 'Seattle', 'WA', '98101', 47.6101, -122.3421, '206-624-0173', ARRAY['Reserve Bar', 'Roastery', 'Food', 'Merchandise']),
('Downtown Starbucks', '123 Main Street', 'New York', 'NY', '10001', 40.7589, -73.9851, '212-555-0100', ARRAY['Mobile Order', 'Drive-Thru', 'WiFi']),
('Airport Starbucks', '100 Airport Blvd', 'Los Angeles', 'CA', '90045', 33.9425, -118.4081, '310-555-0200', ARRAY['Mobile Order', 'Grab & Go']);
```

## Step 3: Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Orders: Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Products: Public read access
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

-- Favorites: Users can manage their own favorites
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Reviews: Anyone can read, users can create
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Stores: Public read access
CREATE POLICY "Anyone can view stores" ON stores
  FOR SELECT USING (true);
```

## Step 4: Create Database Functions

```sql
-- Function to update product rating when review is added
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET 
    rating = (SELECT AVG(rating) FROM reviews WHERE product_id = NEW.product_id),
    reviews_count = (SELECT COUNT(*) FROM reviews WHERE product_id = NEW.product_id)
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for review insert
CREATE TRIGGER update_rating_on_review
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_product_rating();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
```

## Step 5: Get API Credentials

1. Go to Project Settings (gear icon)
2. Navigate to API section
3. Copy:
   - Project URL: `https://xxxxx.supabase.co`
   - anon/public key: `eyJhbGc...`

4. Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

## Step 6: Configure Authentication

1. Go to Authentication → Providers
2. Enable Email provider
3. Configure Email Templates (optional)
4. Enable Social Providers (optional):
   - Google
   - GitHub
   - Facebook

### Email Templates

Customize these in Authentication → Email Templates:

- **Confirm Signup**
- **Invite User**
- **Magic Link**
- **Reset Password**

## Step 7: Storage Setup (Optional)

For user avatars and product images:

1. Go to Storage
2. Create new bucket: `avatars` (public)
3. Create new bucket: `products` (public)
4. Set up bucket policies:

```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'products');

-- Allow authenticated users to upload avatars
CREATE POLICY "Users can upload avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## Step 8: Test Connection

Create a test file `src/test/supabaseTest.js`:

```javascript
import { supabase } from '../lib/supabaseClient';

async function testConnection() {
  // Test database connection
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(5);
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success! Products:', data);
  }
}

testConnection();
```

## Environment Variables Checklist

- [ ] VITE_SUPABASE_URL added to `.env`
- [ ] VITE_SUPABASE_ANON_KEY added to `.env`
- [ ] Environment variables added to Vercel project
- [ ] `.env` file added to `.gitignore`

## Common Issues & Solutions

### Issue: RLS blocks all queries
**Solution:** Make sure RLS policies are set up correctly and user is authenticated

### Issue: Can't connect to Supabase
**Solution:** Check if environment variables are loaded (must start with `VITE_`)

### Issue: Tables not showing
**Solution:** Refresh Supabase dashboard, check if tables were created in correct schema (public)

## Next Steps

1. ✅ Implement authentication UI components
2. ✅ Create product listing page
3. ✅ Add to cart functionality
4. ✅ Order management
5. ✅ User profile page
6. ✅ Favorites system

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Project:** Starbucks Coffee Company Website
**Developer:** Aadi
**For:** Frontend Hackathon & Cloud Computing Project

