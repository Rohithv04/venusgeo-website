export interface MobilityStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  image?: string;
  tag?: string;
}

export interface IoTModule {
  title: string;
  description: string;
}

export const mobilityHomeContent = {
  hero: {
    title: 'Build Your Mobile Apps With Our Enterprise Mobility Expert Team!',
    subtitle: '25+ Years of dedication, to only build mobile apps and transform legacy applications',
    stats: [
      { value: '25+', label: 'Mobile Apps' },
      { value: '500+', label: 'functional scopes' },
      { value: '25+', label: 'Years of Experience' },
      { value: 'TOB’s', label: 'Transfer Operate Build' }
    ] as MobilityStat[],
    trustHeading: 'Why large Enterprises and Startups Trust Our Enterprise Mobility Expertise',
    trustText: 'Venusgeo Enterprise Mobility Division has mastered the art to adapt to digital dominance, and elevating our clients to run on top of newer technologies.',
    tobPoints: [
      'Legacy Systems & versions',
      'Limited Support',
      'Skill Shortage',
      'Client Agility'
    ],
    empTitle: 'Enterprise Mobility Productization (EMP) Expertise',
    empDescription: 'Building on a Complex Infra Plane, a mix of Legacy and Modern Tech Stacks, making it possible for Customers to Create Mobile Apps with us.'
  },
  engagement: {
    heading: 'What It’s Like to Engage with Venusgeo Enterprise Mobility Team',
    intro: 'Over 25+ years of enterprise engineering, we have transformed many Enterprise Customer applications from a legacy ecosystem to a hybrid digital ecosystem across different departments, bringing them the needed change and efficiency.',
    cases: [
      {
        title: 'Dining POS',
        description: 'Waiters no longer wait in queue to punch order in the fixed POS terminal',
        image: '/assets/mobility/dining-pos.png',
        tag: 'Hospitality & Dining'
      },
      {
        title: 'Bar POS',
        description: 'Increase in bar sales and revenue, no more use of order pads',
        image: '/assets/mobility/bar-pos.png',
        tag: 'Hospitality & Beverage'
      },
      {
        title: 'Retail POS',
        description: 'Changing the way guests shop in the retail stores',
        image: '/assets/mobility/retail-pos.png',
        tag: 'Retail & Commerce'
      },
      {
        title: 'TMHub',
        description: 'No more managing crew engagements via emails, phone and texts',
        tag: 'Crew Operations'
      },
      {
        title: 'TMHub Scan docs',
        description: 'Making it easy for crew members to scan, upload and OCR Contract documents',
        tag: 'Document & OCR'
      },
      {
        title: 'Asset IT Tracking',
        description: 'Trace every handheld device, across ships, across revenue centers and its current state.',
        tag: 'Fleet IT Management'
      },
      {
        title: 'MBark',
        description: 'No more long queues in the port and more hard wired podium for the agents',
        tag: 'Port Operations'
      },
      {
        title: 'Gangway',
        description: 'Souls on board and souls off board management on port days in a voyage is so easy',
        tag: 'Security & Manifest'
      },
      {
        title: 'HerdX',
        description: 'Cattle management made easy for the farmers, from cattle health to cattle inventory',
        tag: 'Agriculture & IoT'
      }
    ] as CaseStudy[]
  },
  building: {
    heading: 'What It’s Like to Build with Venusgeo Enterprise Mobility Team',
    description: 'How do we build so many apps. Venusgeo Enterprise Mobility Division is a 140-member core team, who have built 25+ apps, and over 500+ functional modules, with a high degree of digital integration dominance across the APP ecosystem. You name an APP technology our team is already working on it.',
    categories: [
      {
        name: 'Mobile Platforms',
        items: ['iOS', 'Android', 'Flutter', 'React Native', 'Xamarin', 'Maui']
      },
      {
        name: 'Frontend & Web',
        items: ['ReactJS', 'Angular']
      },
      {
        name: 'Backend & Services',
        items: ['Java', 'Kotlin', '.NET', 'Python', 'NodeJS', 'GoLang', 'REST', 'GraphQL', 'gRPC']
      },
      {
        name: 'Databases & Storage',
        items: ['Postgres', 'MySQL', 'Oracle', 'MS Azure', 'MS SQL', 'NoSQL', 'Realm', 'SQLite']
      },
      {
        name: 'Cloud & Infrastructure',
        items: ['AWS', 'Azure', 'On-Prem']
      },
      {
        name: 'CI/CD & Testing',
        items: ['Jenkins', 'Circle CI', 'Airwatch', 'Intune', 'SimplifyQA', 'TestRail', 'JIRA', 'Azure Board', 'Monday.com']
      },
      {
        name: 'Monitoring & Operations',
        items: ['Zendesk', 'AppDyanmics', 'Firebase Crashlytics', 'UXCam', 'Nagios', 'Pagerduty']
      },
      {
        name: 'Payments & Security',
        items: ['Google Pay', 'Apple Pay', 'RazorPay', 'Obfucation', 'Keychain', 'Secure Storage', 'JWT']
      },
      {
        name: 'Analytics',
        items: ['Google Analytics', 'Firebase Analytics', 'UXCAM']
      },
      {
        name: 'Biometrics & Peripherals',
        items: ['Fingerprint', 'IRIS', 'Facial', 'Passport Reader', 'Smartcard Reader', 'Magnetic Stripe Reader', 'Barcode Reader', 'Machine Readable Zone', 'RFID', 'Optical Character Read (OCR)']
      }
    ]
  },
  requirement: {
    heading: 'What is that you would require from Venusgeo Enterprise Mobility Team',
    description: 'Customers choosing Venusgeo Enterprise Mobility Team, to build their solution as a Product or as a Project, gives them the option to choose between, Build with us or Use our resource from our expertise pool to build.'
  }
};

export const xamarinContent = {
  hero: {
    title: 'Build Your Mobile Apps With Our Xamarin & MAUI Expert Team!',
    subtitle: 'Building Xamarin Apps from 2018 and transforming legacy applications',
    stats: [
      { value: '25+', label: 'Mobile Apps' },
      { value: '500+', label: 'functional scopes' },
      { value: '25+', label: 'Years of Experience' },
      { value: 'TOB’s', label: 'Transfer Operate Build' }
    ] as MobilityStat[]
  },
  choice: {
    heading: 'Xamarin & MAUI Choice for Customers',
    paragraph1: 'When engaging with enterprise customers and you learn they are running applications using .NET Framework for years, you should never hesitate to say XAMARIN/MAUI is the best choice for a app modernization investment.',
    paragraph2: 'Venusgeo has a proven record in succeeding with the choices made, in delivering the app modernization for the world largest cruise company, bringing in Xamarin & MAUI stacks into their mobile apps.'
  },
  engage: {
    heading: 'What It’s Like to Engage with Our Xamarin & MAUI Core Team',
    intro: 'Are you deciding to invest in app modernization and are you running applications in Microsoft .Net stack, Venusgeo is the right partner for your investment and our .Net Core team is the perfect delivery arm for your investment. See the apps below, we delivered to the world’s largest cruise company that uses Xamarin and MAUI and is running in 25+ ships.',
    cases: [
      {
        title: 'Dining POS',
        description: 'Waiters no longer wait in queue to punch order in the fixed POS terminal'
      },
      {
        title: 'Bar POS',
        description: 'Increase in bar sales and revenue, no more use of order pads'
      },
      {
        title: 'Retail POS',
        description: 'Changing the way guests shop in the retail stores'
      },
      {
        title: 'Photo POS',
        description: 'Pixels photo package purchases pre and during cruise.'
      }
    ]
  },
  confidence: {
    heading: 'What It’s Like To Engage with Our Xamarin & MAUI Core Team',
    description: 'We are so confident in giving you the guarantee saying Venusgeo .Net Core team is the perfect choice to go with, what you are seeing below is what our team is made of technically. To build you need proven expertise, the team should have been part of the One .Net Vision and we are the experts.',
    tagline: 'Your Best Choice Xamarin and MAUI Development Company',
    infographic: '/assets/mobility/xamarin-infographic.png'
  },
  deliverables: {
    heading: 'What Is That Our Xamarin and MAUI Team Can Do For You',
    description: 'Large enterprise customers are working with our Xamarin & MAUI experts currently to build their products and projects. Some have outsourced the entire scope to build with us and some have chosen to work with our individual team members, thus our engagement model gives you the option to choose between, Build with us or Use our resource from our expertise pool.'
  }
};

export const iotContent = {
  hero: {
    title: 'Build Your IoT Application With Our Asset IoT Expert Team!',
    subtitle: 'Trust our Enterprise IOT Expertise',
    stats: [
      { value: 'UHF HF LF', label: 'Application' },
      { value: 'Mendix', label: 'No Code Low Code' },
      { value: '25+', label: 'Years of Experience' },
      { value: 'TOB’s', label: 'Transfer Operate Build' }
    ] as MobilityStat[]
  },
  empower: {
    heading: 'Empowering Product Innovation with Enterprise IoT Expertise',
    description: 'Our Enterprise IOT expert team is currently putting together their expertise and experience in building Ultra High Frequency RFID reader with the range span of 433, 840-960 MHz and the 2.4 GHz, making it possible for the UHF reader to support a broad range of applications from Tracking to Tracing for targeted industries.'
  },
  journey: {
    heading: 'Experience the Journey of Working with the Venusgeo IoT Team',
    intro: 'Over 25+ years of enterprise engineering, our IoT team has helped enterprise customers reimagine their applications by upgrading outdated systems into intelligent, connected solutions, enabling greater efficiency, agility, and cross functional process collaboration.',
    modules: [
      {
        title: 'Power Management and Power Distribution Module',
        description: 'PMAD is a system that ensures the safe, efficient, and reliable operation of electrical systems'
      },
      {
        title: 'BLE Module',
        description: 'BLE modules used to connect devices and applications wirelessly in the Internet of Things (IoT)'
      },
      {
        title: 'WIFI Module',
        description: 'Wi-Fi module enables devices to connect wirelessly.'
      },
      {
        title: 'GSM Module',
        description: 'Allows IoT devices to communicate over cellular networks'
      },
      {
        title: 'Mesh Topology',
        description: 'Mesh topology connects devices in the Internet of Things (IoT) directly to each other, without a central hub.'
      }
    ] as IoTModule[]
  },
  creating: {
    heading: 'The Experience of Creating Solutions with the Venusgeo Enterprise IoT Team',
    description: 'Venusgeo Asset IoT Division is a 20-member core team, who have developed 5+ IoT solutions and over 25+ functional modules, showcasing a high degree of digital integration and technical dominance across the IoT ecosystem. Our expertise spans the latest IoT technologies, driving innovation and delivering cutting-edge solutions.',
    continuum: [
      'Architecture',
      'Platform Architecture',
      'The Developer Continuum',
      'CI/CD Tooling with Mendix',
      'Business logic',
      'Devops - CI/CD'
    ],
    firmwareHardware: [
      'Linux',
      'MicroController',
      'C',
      'C++',
      'Python',
      'Shell Scripting',
      'UART',
      'SPI',
      'I2C',
      'CANbus',
      'MQTT',
      'AWS IoT',
      'Azure IoT'
    ],
    pcbDesign: [
      'Schematic',
      'PCB Design',
      'SolidWorks',
      'AutoCAD',
      'Altium Designer',
      'PADS Design Software',
      'OrCAD Schematic Capture',
      'Allegro PCB Design',
      'EMI/EMC/IP67/FCC'
    ],
    infographics: [
      '/assets/mobility/iot-infographic-1.jpg',
      '/assets/mobility/iot-infographic-2.jpg',
      '/assets/mobility/iot-infographic-3.jpg'
    ]
  },
  requirement: {
    heading: 'What is that you would require from Venusgeo Enterprise IoT Team',
    description: 'Customers choosing Venusgeo Enterprise IoT Team, to build their solution as a Product or as a Project, gives them the option to choose between, Build with us or Use our resource from our expertise pool to build.'
  }
};

export const mobilityFormsContent = {
  buildWithUs: {
    title: 'Build with us',
    description: 'We have delivered Mobile App development for customers as products and projects as an outsourced engagement, end-end. We can do the same for your requirements.',
    fields: [
      { name: 'name', label: 'Name', placeholder: 'Enter your name' },
      { name: 'email', label: 'Business email', placeholder: 'Enter your business email' },
      { name: 'phone', label: 'Phone Number', placeholder: 'Enter phone number' },
      { name: 'subject', label: 'Subject', placeholder: 'Enter subject' },
      { name: 'scope', label: 'Short Scope', placeholder: 'Describe your project or product scope' }
    ]
  },
  useOurResource: {
    title: 'Use our resource',
    description: 'Customers have used our team members to accelerate the development of mobile apps to build their products and projects. You can still pick resources from our expertise pool.',
    fields: [
      { name: 'name', label: 'Name', placeholder: 'Enter your name' },
      { name: 'email', label: 'Business email', placeholder: 'Enter your business email' },
      { name: 'phone', label: 'Phone Number', placeholder: 'Enter phone number' },
      { name: 'subject', label: 'Subject', placeholder: 'Enter subject' },
      { name: 'scope', label: 'Short Scope', placeholder: 'Describe required technical skills or roles' }
    ]
  },
  contactOffice: {
    title: 'Venusgeo Solutions Inc',
    division: 'Enterprise Mobility',
    address: '3750 NW 87th Avenue, Suite 700, Doral, Florida 33166'
  }
};
