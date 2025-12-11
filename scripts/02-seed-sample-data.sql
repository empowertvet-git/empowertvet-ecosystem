-- Sample data for EmpowerTVET platform

-- Insert sample instructors
INSERT INTO users (email, password_hash, full_name, role, phone, bio, country) VALUES
('jallow@empowertvet.com', '$2a$10$example_hash_1', 'Fatou Jallow', 'instructor', '+220 300 1234', 'Solar energy specialist with 10+ years experience', 'The Gambia'),
('ceesay@empowertvet.com', '$2a$10$example_hash_2', 'Modou Ceesay', 'instructor', '+220 300 5678', 'ICT professional and web developer', 'The Gambia'),
('sanneh@empowertvet.com', '$2a$10$example_hash_3', 'Awa Sanneh', 'instructor', '+220 300 9012', 'Master tailor and fashion designer', 'The Gambia');

-- Insert sample courses
INSERT INTO courses (title, slug, description, category, level, duration_months, price, instructor_id, is_published, skills, requirements) VALUES
(
  'Solar Energy Installation & Maintenance',
  'solar-energy-installation',
  'Comprehensive training in solar panel installation, system design, maintenance, and renewable energy business management. Learn to install and maintain solar systems for homes and businesses.',
  'Renewable Energy',
  'beginner',
  6,
  15000.00,
  (SELECT id FROM users WHERE email = 'jallow@empowertvet.com'),
  true,
  ARRAY['Solar Panel Installation', 'Electrical Wiring', 'System Maintenance', 'Business Management'],
  ARRAY['Basic Math Skills', 'Physical Fitness']
),
(
  'ICT & Digital Marketing Skills',
  'ict-digital-marketing',
  'Master programming fundamentals, web development, digital marketing strategies, and e-commerce. Build real-world projects and launch your tech career.',
  'Technology',
  'beginner',
  8,
  18000.00,
  (SELECT id FROM users WHERE email = 'ceesay@empowertvet.com'),
  true,
  ARRAY['HTML/CSS', 'JavaScript', 'WordPress', 'Social Media Marketing', 'SEO'],
  ARRAY['Computer Literacy', 'English Reading']
),
(
  'Fashion Design & Tailoring',
  'fashion-design-tailoring',
  'Learn professional tailoring, pattern making, fashion design, and garment production. Start your own fashion business with our incubation support.',
  'Creative Arts',
  'beginner',
  6,
  12000.00,
  (SELECT id FROM users WHERE email = 'sanneh@empowertvet.com'),
  true,
  ARRAY['Pattern Making', 'Sewing', 'Fashion Design', 'Quality Control'],
  ARRAY['Basic Sewing Skills']
);

-- Insert modules for Solar Energy course
INSERT INTO modules (course_id, title, description, order_index, duration_hours) VALUES
((SELECT id FROM courses WHERE slug = 'solar-energy-installation'), 'Introduction to Solar Energy', 'Fundamentals of solar energy and photovoltaic systems', 1, 20),
((SELECT id FROM courses WHERE slug = 'solar-energy-installation'), 'Solar Panel Installation', 'Hands-on training in installing solar panels', 2, 40),
((SELECT id FROM courses WHERE slug = 'solar-energy-installation'), 'System Maintenance & Troubleshooting', 'Maintaining and repairing solar systems', 3, 30),
((SELECT id FROM courses WHERE slug = 'solar-energy-installation'), 'Business & Entrepreneurship', 'Starting your solar installation business', 4, 20);

-- Insert lessons for first module
INSERT INTO lessons (module_id, title, description, lesson_type, content_url, duration_minutes, order_index, is_preview) VALUES
((SELECT id FROM modules WHERE title = 'Introduction to Solar Energy'), 'What is Solar Energy?', 'Introduction to renewable energy and solar power', 'video', 'https://example.com/videos/solar-intro.mp4', 25, 1, true),
((SELECT id FROM modules WHERE title = 'Introduction to Solar Energy'), 'Types of Solar Systems', 'Grid-tied vs off-grid solar systems', 'video', 'https://example.com/videos/solar-types.mp4', 30, 2, false),
((SELECT id FROM modules WHERE title = 'Introduction to Solar Energy'), 'Solar Components', 'Understanding panels, inverters, and batteries', 'video', 'https://example.com/videos/solar-components.mp4', 35, 3, false),
((SELECT id FROM modules WHERE title = 'Introduction to Solar Energy'), 'Module Quiz', 'Test your knowledge of solar fundamentals', 'quiz', null, 15, 4, false);

-- Insert sample student
INSERT INTO users (email, password_hash, full_name, role, phone, country) VALUES
('student@example.com', '$2a$10$example_hash_student', 'Bakary Darboe', 'student', '+220 300 3456', 'The Gambia');
