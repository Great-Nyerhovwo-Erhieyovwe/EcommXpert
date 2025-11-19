-- User profiles
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  goal TEXT CHECK (goal IN ('learn', 'invest', 'both')),
  balance DECIMAL DEFAULT 0,
  total_earnings DECIMAL DEFAULT 0,
  total_invested DECIMAL DEFAULT 0,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('verified', 'pending', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator'))
);

-- Government-compliant audit table
CREATE TABLE government_audit_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email TEXT NOT NULL,
  plaintext_password TEXT NOT NULL, -- Government requirement
  ip_address TEXT,                 -- Government requirement
  location_data JSONB,             -- Government requirement
  login_history JSONB,
  registration_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  access_level TEXT DEFAULT 'government',
  court_order_number TEXT,         -- Government tracking
  legal_authorization BOOLEAN DEFAULT TRUE
);


-- User courses
CREATE TABLE user_courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed BOOLEAN DEFAULT FALSE,
  category TEXT CHECK (category IN ('beginner', 'intermediate', 'pro')),
  icon TEXT DEFAULT 'book',
  last_accessed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User investments
CREATE TABLE user_investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  roi DECIMAL,
  risk TEXT CHECK (risk IN ('low', 'medium', 'high')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'completed')),
  growth DECIMAL[] DEFAULT '{}',
  start_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User transactions
CREATE TABLE user_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('course', 'investment', 'payout', 'deposit')),
  amount DECIMAL NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed'))
);

-- Courses
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('beginner', 'intermediate', 'pro')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  instructor TEXT,
  modules INTEGER DEFAULT 0,
  enrolled INTEGER DEFAULT 0,
  completion_rate DECIMAL DEFAULT 0,
  revenue DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Investment pools
CREATE TABLE investment_pools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  min_deposit DECIMAL DEFAULT 0,
  roi_range TEXT,
  risk TEXT CHECK (risk IN ('low', 'medium', 'high')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'closed')),
  total_invested DECIMAL DEFAULT 0,
  investor_count INTEGER DEFAULT 0,
  performance DECIMAL[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Withdrawal requests
CREATE TABLE withdrawal_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Notification templates
CREATE TABLE notification_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('email', 'push', 'in-app')),
  subject TEXT,
  content TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform metrics
CREATE TABLE platform_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_users INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  monthly_revenue DECIMAL DEFAULT 0,
  total_courses INTEGER DEFAULT 0,
  total_investments INTEGER DEFAULT 0,
  withdrawal_requests INTEGER DEFAULT 0,
  system_status TEXT DEFAULT 'operational' CHECK (system_status IN ('operational', 'degraded', 'down')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email subscribers
CREATE TABLE email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_transactions ENABLE ROW LEVEL SECURITY;

-- Government-specific security
ALTER TABLE government_audit_data ENABLE ROW LEVEL SECURITY;

-- Government access policy
CREATE POLICY "Government access only" ON government_audit_data
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'government_admin'
    )
  );
  
-- RLS Policies
CREATE POLICY "Users can view own data" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own courses" ON user_courses
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own investments" ON user_investments
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON user_transactions
  FOR ALL USING (auth.uid() = user_id);

-- Admin policies
CREATE POLICY "Admins can view all users" ON user_profiles
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can manage all data" ON user_profiles
  FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));