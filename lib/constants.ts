import { BookOpen, Users, Award, TrendingUp } from 'lucide-react'

export const programs = [
  {
    id: 'solar-energy',
    category: 'RENEWABLE ENERGY',
    title: 'Solar Energy Installation',
    description: 'Learn solar panel installation, maintenance, and renewable energy systems',
    duration: '6 months',
    image: '/african-student-installing-solar-panels-gambia.jpg',
    details: 'Comprehensive training in solar PV systems, from basic electrical theory to advanced installation and troubleshooting. Students learn to design, install, and maintain residential and commercial solar systems.',
    expectations: 'Hands-on workshops, site visits to active solar installations, and safety certification training. You will work with industry-standard tools and equipment.',
    prospects: 'Solar technician, system designer, energy consultant, or renewable energy entrepreneur. Graduates often start their own installation companies or work for major energy providers.'
  },
  {
    id: 'ict-digital-skills',
    category: 'TECHNOLOGY',
    title: 'ICT & Digital Skills',
    description: 'Master programming, web development, and digital marketing skills',
    duration: '8 months',
    image: '/african-students-learning-coding-computer-lab.jpg',
    details: 'Full-stack development, digital marketing strategies, and IT essentials. The curriculum covers HTML/CSS, JavaScript, React, and modern marketing tools.',
    expectations: 'Real-world projects, hackathons, and industry mentorship. You will build a professional portfolio and collaborate on team projects.',
    prospects: 'Web developer, digital marketer, IT support specialist, or tech startup founder. High demand in the growing Gambian tech sector.'
  },
  {
    id: 'construction-technical-trades',
    category: 'CONSTRUCTION',
    title: 'Construction & Technical Trades',
    description: 'Professional training in building, plumbing, electrical, and construction management',
    duration: '7 months',
    image: '/construction-technical-trades.jpg',
    details: 'Modern construction techniques, plumbing systems, electrical wiring, and project management. Focus on sustainable building practices and technical skills.',
    expectations: 'Practical site work, plumbing and electrical workshops, safety training, and tool mastery. Students participate in real community building projects.',
    prospects: 'Site supervisor, skilled mason, plumber, electrician, or construction contractor. Opportunities in residential and commercial development.'
  },
  {
    id: 'hospitality-culinary',
    category: 'HOSPITALITY',
    title: 'Hospitality & Culinary Arts',
    description: 'Culinary skills, hotel management, and customer service excellence',
    duration: '5 months',
    image: '/african-chef-culinary-training.jpg',
    details: 'International cuisine, food safety, and front-of-house management. Training in both local Gambian dishes and international standards.',
    expectations: 'Kitchen labs, internship placements in top hotels, and event catering experience.',
    prospects: 'Chef, restaurant manager, catering business owner, or hotel operations staff. The tourism sector offers vast opportunities.'
  },
  {
    id: 'fashion-tailoring',
    category: 'CREATIVE ARTS',
    title: 'Fashion & Tailoring',
    description: 'Fashion design, tailoring, and garment production techniques',
    duration: '6 months',
    image: '/african-fashion-designer-tailoring-workshop.jpg',
    details: 'Pattern making, garment construction, and fashion business fundamentals. Learn to create custom designs and manage a fashion brand.',
    expectations: 'Design studio sessions, fashion shows, and portfolio development. Access to industrial sewing machines and design software.',
    prospects: 'Fashion designer, boutique owner, textile artist, or costume designer. Graduates frequently launch their own clothing lines.'
  },
  {
    id: 'agri-processing',
    category: 'AGRICULTURE',
    title: 'Agri-Processing',
    description: 'Food processing, packaging, and agricultural value chain management',
    duration: '6 months',
    image: '/african-agriculture-food-processing.jpg',
    details: 'Value addition, food preservation, and supply chain logistics. Techniques for processing fruits, vegetables, and grains for local and export markets.',
    expectations: 'Processing lab practice, market analysis, and product development. Learn packaging design and quality control standards.',
    prospects: 'Food processor, agribusiness manager, product exporter, or quality control inspector. Vital for reducing post-harvest losses and boosting the economy.'
  }
]

export const stats = [
  { icon: Users, label: 'Students Trained', value: '2,500+' },
  { icon: Award, label: 'Active Programs', value: '450+' },
  { icon: TrendingUp, label: 'Employment Rate', value: '87%' },
  { icon: BookOpen, label: 'Graduate Startups', value: '150+' }
]

export const successStories = [
  {
    name: 'Fatou Jallow',
    business: 'Solar Solutions Gambia',
    description: 'After completing solar training, Fatou started her own installation company serving 50+ homes',
    revenue: '$3,500',
    image: '/professional-african-woman-solar-business-owner.jpg'
  },
  {
    name: 'Modou Ceesay',
    business: 'TechHub Banjul',
    description: 'ICT graduate now runs a digital marketing agency with 8 employees',
    revenue: '$5,200',
    image: '/young-african-tech-entrepreneur-office.jpg'
  },
  {
    name: 'Awa Sanneh',
    business: "Awa's Fashion House",
    description: 'Tailoring graduate creating custom designs for clients across West Africa',
    revenue: '$2,800',
    image: '/african-fashion-designer-entrepreneur.jpg'
  }
]
