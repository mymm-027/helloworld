-- =============================================================================
-- EduPulse AI — Seed Data
-- Initial data for departments, rooms, semester, courses, demo users, settings
-- =============================================================================

-- Departments
INSERT INTO departments (department_name, department_code, building) VALUES
    ('Computer Science', 'CS', 'Science Building'),
    ('Mathematics', 'MATH', 'Science Building')
ON CONFLICT (department_code) DO NOTHING;

-- Rooms (from current CSV data: Room 204, Room 305, Room 401, Room 501)
INSERT INTO rooms (room_number, building, capacity, room_type, equipment) VALUES
    ('Room 204', 'Science Building', 30, 'Lecture Hall', ARRAY['projector', 'camera', 'whiteboard']),
    ('Room 305', 'Science Building', 30, 'Lecture Hall', ARRAY['projector', 'camera', 'whiteboard']),
    ('Room 401', 'Science Building', 30, 'Lecture Hall', ARRAY['projector', 'camera', 'whiteboard']),
    ('Room 501', 'Science Building', 30, 'Lecture Hall', ARRAY['projector', 'camera', 'whiteboard'])
ON CONFLICT (room_number, building) DO NOTHING;

-- Semesters
INSERT INTO semesters (semester_id, semester_name, start_date, end_date, is_active) VALUES
    ('SPRING2026', 'Spring 2026', '2026-02-09', '2026-05-31', TRUE)
ON CONFLICT (semester_id) DO NOTHING;

-- Courses
INSERT INTO courses (course_code, course_name, department_id, credit_hours, description) VALUES
    ('CS301', 'Artificial Intelligence',
        (SELECT department_id FROM departments WHERE department_code = 'CS'), 3,
        'Fundamentals of AI including search, reasoning, and machine learning'),
    ('CS302', 'Data Science Fundamentals',
        (SELECT department_id FROM departments WHERE department_code = 'CS'), 3,
        'Introduction to data science, statistical analysis, and data visualization'),
    ('CS401', 'Advanced Machine Learning',
        (SELECT department_id FROM departments WHERE department_code = 'CS'), 4,
        'Advanced topics in ML including deep learning, NLP, and reinforcement learning'),
    ('MATH201', 'Statistics for Data Analysis',
        (SELECT department_id FROM departments WHERE department_code = 'MATH'), 3,
        'Statistical methods for data analysis and interpretation')
ON CONFLICT (course_code) DO NOTHING;

-- User accounts are intentionally not seeded with fixed credentials.
-- Create real accounts via /auth/signup (or admin SQL scripts) after deployment.

-- Semester Weeks (16 weeks: Feb 9 - May 24, 2026)
INSERT INTO semester_weeks (semester_id, academic_week, week_label, start_date, end_date, status) VALUES
    ('SPRING2026', 1,  'Week 1',  '2026-02-09', '2026-02-15', 'completed'),
    ('SPRING2026', 2,  'Week 2',  '2026-02-16', '2026-02-22', 'completed'),
    ('SPRING2026', 3,  'Week 3',  '2026-02-23', '2026-03-01', 'completed'),
    ('SPRING2026', 4,  'Week 4',  '2026-03-02', '2026-03-08', 'completed'),
    ('SPRING2026', 5,  'Week 5',  '2026-03-09', '2026-03-15', 'completed'),
    ('SPRING2026', 6,  'Week 6',  '2026-03-16', '2026-03-22', 'completed'),
    ('SPRING2026', 7,  'Week 7',  '2026-03-23', '2026-03-29', 'completed'),
    ('SPRING2026', 8,  'Week 8',  '2026-03-30', '2026-04-05', 'completed'),
    ('SPRING2026', 9,  'Week 9',  '2026-04-06', '2026-04-12', 'completed'),
    ('SPRING2026', 10, 'Week 10', '2026-04-13', '2026-04-19', 'completed'),
    ('SPRING2026', 11, 'Week 11', '2026-04-20', '2026-04-26', 'completed'),
    ('SPRING2026', 12, 'Week 12', '2026-04-27', '2026-05-03', 'completed'),
    ('SPRING2026', 13, 'Week 13', '2026-05-04', '2026-05-10', 'active'),
    ('SPRING2026', 14, 'Week 14', '2026-05-11', '2026-05-17', 'scheduled'),
    ('SPRING2026', 15, 'Week 15', '2026-05-18', '2026-05-24', 'scheduled'),
    ('SPRING2026', 16, 'Week 16', '2026-05-25', '2026-05-31', 'scheduled')
ON CONFLICT (semester_id, academic_week) DO NOTHING;

-- Mock User Accounts for Testing (password: EduPulse#2026)
-- Email addresses as provided by user
INSERT INTO users (username, email, password_hash, role, institution_id, is_active) VALUES
    ('lindahmed05', 'lindahmed05@gmail.com', '$2b$12$CWKRn/VoDczoTxwwiya5U.U9jITzkAYfY36E/mZjBIW0WrIe9XBzy', 'student', 'S001', TRUE),
    ('minayoussef', 'Minayoussef027@gmail.com', '$2b$12$CWKRn/VoDczoTxwwiya5U.U9jITzkAYfY36E/mZjBIW0WrIe9XBzy', 'admin', 'A001', TRUE),
    ('linda2ahmed', 'linda2ahmed02@gmail.com', '$2b$12$CWKRn/VoDczoTxwwiya5U.U9jITzkAYfY36E/mZjBIW0WrIe9XBzy', 'lecturer', 'L001', TRUE),
    ('rawanelsawaby', 'rawanelsawaby@gmail.com', '$2b$12$CWKRn/VoDczoTxwwiya5U.U9jITzkAYfY36E/mZjBIW0WrIe9XBzy', 'student', 'S002', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Student Profiles
INSERT INTO students (user_id, student_code, full_name, enrollment_year) VALUES
    ((SELECT user_id FROM users WHERE email = 'lindahmed05@gmail.com'), 'S001', 'Linda Ahmed', EXTRACT(YEAR FROM NOW())::integer),
    ((SELECT user_id FROM users WHERE email = 'rawanelsawaby@gmail.com'), 'S002', 'Rawan Elsawaby', EXTRACT(YEAR FROM NOW())::integer)
ON CONFLICT (user_id) DO NOTHING;

-- Lecturer Profile
INSERT INTO lecturers (user_id, lecturer_code, full_name) VALUES
    ((SELECT user_id FROM users WHERE email = 'linda2ahmed02@gmail.com'), 'L001', 'Dr. Linda Ahmed')
ON CONFLICT (user_id) DO NOTHING;

-- Admin Profile
INSERT INTO admins (user_id, full_name) VALUES
    ((SELECT user_id FROM users WHERE email = 'Minayoussef027@gmail.com'), 'Mina Youssef')
ON CONFLICT (user_id) DO NOTHING;

-- Student Groups
INSERT INTO student_groups (group_name, group_code, course_id, semester_id) VALUES
    ('Group A - CS301', 'GRP_A_CS301', (SELECT course_id FROM courses WHERE course_code = 'CS301'), 'SPRING2026'),
    ('Group B - CS301', 'GRP_B_CS301', (SELECT course_id FROM courses WHERE course_code = 'CS301'), 'SPRING2026'),
    ('Group A - CS302', 'GRP_A_CS302', (SELECT course_id FROM courses WHERE course_code = 'CS302'), 'SPRING2026')
ON CONFLICT (group_code, semester_id) DO NOTHING;

-- Group Memberships (add students to groups)
INSERT INTO group_memberships (group_id, student_id) VALUES
    ((SELECT group_id FROM student_groups WHERE group_code = 'GRP_A_CS301'), 
     (SELECT student_id FROM students WHERE student_code = 'S001')),
    ((SELECT group_id FROM student_groups WHERE group_code = 'GRP_B_CS301'), 
     (SELECT student_id FROM students WHERE student_code = 'S002')),
    ((SELECT group_id FROM student_groups WHERE group_code = 'GRP_A_CS302'), 
     (SELECT student_id FROM students WHERE student_code = 'S001'))
ON CONFLICT (group_id, student_id) DO NOTHING;

-- Lecturer Course Assignments
INSERT INTO lecturer_course_assignments (lecturer_id, course_id, group_id, semester_id, role) VALUES
    ((SELECT user_id FROM users WHERE email = 'linda2ahmed02@gmail.com'),
     (SELECT course_id FROM courses WHERE course_code = 'CS301'),
     (SELECT group_id FROM student_groups WHERE group_code = 'GRP_A_CS301'),
     'SPRING2026', 'primary'),
    ((SELECT user_id FROM users WHERE email = 'linda2ahmed02@gmail.com'),
     (SELECT course_id FROM courses WHERE course_code = 'CS301'),
     (SELECT group_id FROM student_groups WHERE group_code = 'GRP_B_CS301'),
     'SPRING2026', 'primary'),
    ((SELECT user_id FROM users WHERE email = 'linda2ahmed02@gmail.com'),
     (SELECT course_id FROM courses WHERE course_code = 'CS302'),
     (SELECT group_id FROM student_groups WHERE group_code = 'GRP_A_CS302'),
     'SPRING2026', 'primary')
ON CONFLICT (lecturer_id, course_id, group_id, semester_id) DO NOTHING;

-- Mock Lectures for Weeks 1-13 (weeks 1-12 completed, week 13 in progress)
-- Week 1 lectures
INSERT INTO lectures (assignment_id, group_id, lecture_date, start_time, end_time, room_id, status, topic) VALUES
    ((SELECT assignment_id FROM lecturer_course_assignments WHERE 
      lecturer_id = (SELECT user_id FROM users WHERE email = 'linda2ahmed02@gmail.com') 
      AND course_id = (SELECT course_id FROM courses WHERE course_code = 'CS301')),
     (SELECT group_id FROM student_groups WHERE group_code = 'GRP_A_CS301'),
     '2026-02-09'::date, '09:00:00'::time, '10:30:00'::time,
     (SELECT room_id FROM rooms WHERE room_number = 'Room 204'), 'analyzed', 'Introduction to AI'),
    ((SELECT assignment_id FROM lecturer_course_assignments WHERE 
      lecturer_id = (SELECT user_id FROM users WHERE email = 'linda2ahmed02@gmail.com') 
      AND course_id = (SELECT course_id FROM courses WHERE course_code = 'CS301')),
     (SELECT group_id FROM student_groups WHERE group_code = 'GRP_B_CS301'),
     '2026-02-10'::date, '11:00:00'::time, '12:30:00'::time,
     (SELECT room_id FROM rooms WHERE room_number = 'Room 305'), 'analyzed', 'Introduction to AI')
ON CONFLICT DO NOTHING;

-- Week 13 lectures (active, current week)
INSERT INTO lectures (assignment_id, group_id, lecture_date, start_time, end_time, room_id, status, topic) VALUES
    ((SELECT assignment_id FROM lecturer_course_assignments WHERE 
      lecturer_id = (SELECT user_id FROM users WHERE email = 'linda2ahmed02@gmail.com') 
      AND course_id = (SELECT course_id FROM courses WHERE course_code = 'CS301')),
     (SELECT group_id FROM student_groups WHERE group_code = 'GRP_A_CS301'),
     '2026-05-05'::date, '09:00:00'::time, '10:30:00'::time,
     (SELECT room_id FROM rooms WHERE room_number = 'Room 204'), 'in_progress', 'Advanced Topics: Week 13'),
    ((SELECT assignment_id FROM lecturer_course_assignments WHERE 
      lecturer_id = (SELECT user_id FROM users WHERE email = 'linda2ahmed02@gmail.com') 
      AND course_id = (SELECT course_id FROM courses WHERE course_code = 'CS301')),
     (SELECT group_id FROM student_groups WHERE group_code = 'GRP_B_CS301'),
     '2026-05-06'::date, '11:00:00'::time, '12:30:00'::time,
     (SELECT room_id FROM rooms WHERE room_number = 'Room 305'), 'in_progress', 'Advanced Topics: Week 13')
ON CONFLICT DO NOTHING;

-- Mock Attendance Records for Week 1 lectures
INSERT INTO attendance_records (student_id, lecture_id, status, first_seen_at, last_seen_at, total_absence_minutes, attendance_pct) VALUES
    ((SELECT student_id FROM students WHERE student_code = 'S001'),
     (SELECT lecture_id FROM lectures WHERE topic = 'Introduction to AI' AND lecture_date = '2026-02-09'::date LIMIT 1),
     'Present', NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days', 0, 100.0),
    ((SELECT student_id FROM students WHERE student_code = 'S002'),
     (SELECT lecture_id FROM lectures WHERE topic = 'Introduction to AI' AND lecture_date = '2026-02-10'::date LIMIT 1),
     'Present', NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days', 0, 100.0)
ON CONFLICT (student_id, lecture_id) DO NOTHING;

-- Mock Emotion Records for Week 1 (varied emotions: Happy, Neutral, Confused, Bored)
INSERT INTO emotion_records (student_id, lecture_id, recorded_at, time_minute, emotion, confidence, engagement_score, focus_score, is_present, source, model_name) VALUES
    ((SELECT student_id FROM students WHERE student_code = 'S001'),
     (SELECT lecture_id FROM lectures WHERE topic = 'Introduction to AI' AND lecture_date = '2026-02-09'::date LIMIT 1),
     (NOW() - INTERVAL '30 days')::timestamp, 0, 'Happy', 0.92, 0.85, 0.88, TRUE, 'live_camera', 'EduPulse_v1.0'),
    ((SELECT student_id FROM students WHERE student_code = 'S001'),
     (SELECT lecture_id FROM lectures WHERE topic = 'Introduction to AI' AND lecture_date = '2026-02-09'::date LIMIT 1),
     (NOW() - INTERVAL '30 days' + INTERVAL '5 minutes')::timestamp, 5, 'Neutral', 0.78, 0.72, 0.75, TRUE, 'live_camera', 'EduPulse_v1.0'),
    ((SELECT student_id FROM students WHERE student_code = 'S001'),
     (SELECT lecture_id FROM lectures WHERE topic = 'Introduction to AI' AND lecture_date = '2026-02-09'::date LIMIT 1),
     (NOW() - INTERVAL '30 days' + INTERVAL '10 minutes')::timestamp, 10, 'Confused', 0.85, 0.55, 0.60, TRUE, 'live_camera', 'EduPulse_v1.0'),
    ((SELECT student_id FROM students WHERE student_code = 'S002'),
     (SELECT lecture_id FROM lectures WHERE topic = 'Introduction to AI' AND lecture_date = '2026-02-10'::date LIMIT 1),
     (NOW() - INTERVAL '30 days')::timestamp, 0, 'Happy', 0.88, 0.82, 0.80, TRUE, 'live_camera', 'EduPulse_v1.0'),
    ((SELECT student_id FROM students WHERE student_code = 'S002'),
     (SELECT lecture_id FROM lectures WHERE topic = 'Introduction to AI' AND lecture_date = '2026-02-10'::date LIMIT 1),
     (NOW() - INTERVAL '30 days' + INTERVAL '5 minutes')::timestamp, 5, 'Bored', 0.76, 0.45, 0.50, TRUE, 'live_camera', 'EduPulse_v1.0')
ON CONFLICT DO NOTHING;

-- System Settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description) VALUES
    ('confusion_threshold', '0.30', 'float', 'Threshold for confusion spike alerts (percentage of confused students)'),
    ('boredom_threshold', '0.30', 'float', 'Threshold for boredom spike alerts'),
    ('capture_interval_seconds', '5', 'integer', 'Seconds between camera frame captures'),
    ('model_name', 'EduPulse_v1.0', 'string', 'Default emotion detection model name'),
    ('session_timeout_hours', '24', 'integer', 'Login session expiration in hours'),
    ('max_login_attempts', '5', 'integer', 'Max failed login attempts before lockout'),
    ('app_version', '0.3.0', 'string', 'Current application version'),
    ('institution_name', 'University', 'string', 'Institution display name')
ON CONFLICT (setting_key) DO NOTHING;
