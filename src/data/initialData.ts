import {
  Directorate,
  Event,
  FaqItem,
  GalleryItem,
  News,
  Publication,
  Sector,
  SiteSetting,
  AdminUser,
  ContactMessage
} from '../types';

export const initialAdminUser: AdminUser = {
  id: 'usr_admin_1',
  name: 'Afar SITB System Administrator',
  email: 'admin@sitb.afar.gov.et',
  role: 'SUPER_ADMIN'
};

export const initialSiteSettings: SiteSetting = {
  id: 'setting_1',
  missionAf:
    'Effektiivi-le teknoolojii warsiisak, doorsiisak, ellecabo horsiisak kee taamah gaceenamah cabiimu saynis kee teknoolojii horoyaay tabaatabsak rakaakay caddol xiqewaay.',
  missionAm:
    'ውጤታማ ቴክኖሎጂዎችን ማፈላለግ፣ መምረጥ፣ ማላማድ፣ መፍጠርና መጠቀም የሚያስችል ሳይንስና ቴክኖሎጂ በማልማትና በማሸጋገር የክልሉን ሁለንተናዊ ዕድገት ማረጋገጥ።',
  missionEn:
    "To ensure the Afar region's sustainable growth by developing, adapting, and transferring science and technology that enables the identification, deployment, and utilization of high-impact technological solutions.",

  visionAf:
    'Xiinisso kee cuglisak duudusiime ineewaa teknoolojii daddossiiy askaasita, amaanat-le sistem horoysiiy dijitaal xaqbo massowak rakaakay ummattah cateynay xiqewaay.',
  visionAm:
    'በጥናትና ምርምር የተደገፈ የኢንፎርሜሽን ቴክኖሎጂ መሰረተ ልማቶችን በማልማትና ደህንነቱ የተጠበቀ ሲስተሞችን በማበልጸግ እና ዲጂታል አገልግሎት በማስፋፋት የክልሉን ማህበረሰብ ተጠቃሚነት ማረጋገጥ።',
  visionEn:
    "To build a digitally empowered and secure Afar region by advancing research-backed ICT infrastructure, resilient cyber systems, and accessible e-government services for all communities.",

  valuesAf:
    'Cakki-le kalah (Integrity)\nXiinisso duudusiime ubla (Deep Insight)\nCusa cateyna horsiisa (Creating Distinction)\nUmmattah xaqbi le tanim (Service Orientation)\nCasi-le teknoolojii cateynay (Advanced Tech Adoption)\nQusba ellecabo daddosa (Fostering Innovation)\nTaama kalah kee dudda (Dedication & Diligence)\nMassaqaltinnu (Accountability)',
  valuesAm:
    'ቀናነትና ታማኝነት (Integrity)\nጥልቅ ምልከታና ምርምር (Deep Insight)\nልዩነትና ጥራት መፍጠር (Excellence)\nህዝባዊ አገልጋይነት (Service Orientation)\nየላቀ የቴክኖሎጂ ተጠቃሚነት (Tech Adoption)\nአዳዲስ ፈጠራዎችን ማመንጨት (Innovation)\nየስራ ፍቅርና ትጋት (Diligence)\nግልጽነትና ተጠያቂነት (Accountability)',
  valuesEn:
    'Integrity & Transparency\nDeep Insight & Applied Research\nCommitment to Excellence\nCitizen-Centric Service\nCutting-Edge Technology Adoption\nFostering Grassroots Innovation\nDiligence & Professional Dedication\nInstitutional Accountability',

  historyAf:
    'Qafar Agatih Rakaakayih Doolatak Saynis, Innoveshin kee Teknolojik Biiro sanatah 2005 E.C. addat qimbiseeni. Rakaakayal dijital tabaatabsih daddos kee sayber amni dacayrih taama miraacisak geytima.',
  historyAm:
    'የአፋር ብሔራዊ ክልላዊ መንግሥት ሳይንስ፣ ኢኖቬሽን እና ቴክኖሎጂ ቢሮ በክልሉ የሳይንስና ቴክኖሎጂ አቅምን ለማሳደግ፣ የመንግስት አሰራርን ለማዘመንና አስተማማኝ የመረጃ ደህንነትን ለማስፈን ተቋቁሞ ሰፊ ስራዎችን በማከናወን ላይ ይገኛል።',
  historyEn:
    'The Afar National Regional State Science Innovation and Technology Bureau was established with the core mandate of safeguarding information infrastructure, digitizing government workflows, accelerating startup innovation, and providing secure telematics and ICT networks across all zones.',

  bureauHeadName: 'Eng. Saeed Mohammed',
  bureauHeadPhoto: '/uploads/gallery/583713910_1370145308140505_2477020799977289523_n.jpg',
  bureauHeadMsgAf:
    'Qafar Rakaakayak Saynis Teknoloji Kee Innoveshin Komishinik Komishiner Injineer Saqid Macammad Ta Tadeera Abtol Asisak Rakaakay Luddal Taamitoonuh Ekraariseenih Yanin Cato Lem Qaddoysak, Ta Inistituyut Rakaakayitte Fanah Cugaysoosa Baahoonuh Abak Geytiman Macal Bisoh Axcelem Kassiise.',
  bureauHeadMsgAm:
    'የአፋር ክልል የሳይንስ፣ ቴክኖሎጂ እና ኢኖቬሽን ኮሚሽን ኮሚሽነር ኢንጂነር ሰኢድ ሙሃመድ እንደገለጹት፤ በክልሉ የተጀመረው የዲጂታላይዜሽን እና የሳይበር ደህንነት ስራ ዘመናዊ አስተዳደርን ለማስፈን እና ለወጣቶች የፈጠራ ስራ እድል ለመፍጠር ወሳኝ ሚና እየተጫወተ ይገኛል። ሁሉንም አጋሮች ለቀጣይ ትብብር ጥሪ እናቀርባለን።',
  bureauHeadMsgEn:
    'The Afar Region Science, Technology and Innovation Commission is firmly committed to driving regional digital sovereignty, securing critical infrastructures, and bridging technological capabilities for our communities, students, and institutions.',

  phone: '+251 33 666 0192 / +251 33 666 0450',
  email: 'info@sitb.afar.gov.et',
  addressAf: 'Biiro Waqdi Adda, Semera, Qafar Agatih Rakaakay, Itiyoophiya',
  addressAm: 'ዋናው ቢሮ፡ ሰመራ፣ አፋር ብሔራዊ ክልላዊ መንግሥት፣ ኢትዮጵያ',
  addressEn: 'Bureau Headquarters, Semera, Afar National Regional State, Ethiopia',

  facebookUrl: 'https://facebook.com/AfarInnovationBureau',
  telegramUrl: 'https://t.me/afarinnovation',
  twitterUrl: 'https://twitter.com/AfarTechBureau',
  instagramUrl: 'https://instagram.com/afartech',
  youtubeUrl: 'https://youtube.com/@AfarInnovationBureau',
  updatedAt: new Date().toISOString()
};

export const initialDirectorates: Directorate[] = [
  {
    id: 'dir_1',
    order: 1,
    nameAf: 'Sayber Amnih Xayrektoreet',
    nameAm: 'የሳይበር ደህንነት ዳይሬክቶሬት',
    nameEn: 'Cyber Security Directorate',
    descriptionAf:
      'Agat Caddol Dafesen Boliisitte Kee Amrittek Ugut Abak Rakaakay Doolat Kee Kalah Tan Faxximta Institutionitte Sayber Amni Dacayrih Taama Miraacisak, Koobaahisak Abinosaanam Kinnim Qaddoosen.',
    descriptionAm:
      'የዳይሬክቶሬቱ ዋና ኃላፊነት የክልሉን የመንግስት እና ሌሎች ወሳኝ ተቋማትን የሳይበር ደህንነት ጥበቃ በብሔራዊ ደረጃ የተቀመጡ ፖሊሲዎች፣ አዋጆች እና መመሪያዎች መሰረት በማድረግ መምራት፣ ማስተባበር እና ማስፈፀም ነው።',
    descriptionEn:
      "This directorate's primary responsibility is to oversee, coordinate, and enforce robust cybersecurity defense for government departments and critical regional infrastructure, adhering to national cyber defense standards and emergency incident responses.",
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'dir_2',
    order: 2,
    nameAf: 'Qusbaamih hadal kee teknoloojih qimbo dariifa wagittaamal tabaatabsa kee qokol xayrektereet',
    nameAm: 'የኢኖቬሽንና ቴክኖሎጂ ስታርትፕ ስነ ምህዳር ሽግግርና ድጋፍ ዳይሬክቶሬት',
    nameEn: 'Directorate of Innovation & Technology Start-up Ecosystem Transition and Support',
    descriptionAf:
      'Teknoloojih tatrusso jaamiqatittek, kusaq xisoosa, interpiraayizittee kee iroh waklentit inxastari fan, doolat xisoosa kee qimmo kampaanitte fan, oggol luddittel kee tellemmo gexsititte.',
    descriptionAm:
      'የዳይሬክቶሬቱ ዋና ኃላፊነት ከዩኒቨርሲቲዎች፣ ከምርምር ተቋማትና ከጀማሪዎች የሚመጡ ፈጠራዎችን ወደ ተግባራዊ ኢኮኖሚያዊ ውጤት ለማሸጋገር ምቹ የስነ ምህዳር ድጋፍ፣ የፈጠራ ውድድርና የገበያ ትስስር ማመቻቸት ነው።',
    descriptionEn:
      'Facilitates technology transfer from universities and research hubs to local startups and enterprises, empowering entrepreneurs through business incubation, tech adaptation, and commercialization pathways.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'dir_3',
    order: 3,
    nameAf: 'Xiytalayzeeshin Ayfaf kee Assabalta Daddosih Xayrektoreet',
    nameAm: 'ዲጂታላይዜሽን አገልግሎት እና አፕልኬሽን ልማት ዳይሬክቶሬት',
    nameEn: 'Digitalization Service and Application Development Directorate',
    descriptionAf: 'Rakaakayal Xijitaal Teknoloojih Calli Ekraarisak Abinosa.',
    descriptionAm:
      'የክልሉን የመንግስት አገልግሎቶች ዲጂታላይዝ ማድረግ፣ ብጁ ድረ-ገጾችን፣ የመረጃ ቋቶችን እና የህዝብ አገልግሎት አፕሊኬሽኖችን በማልማት የተቀላጠፈ አገልግሎት እንዲኖር ማስቻል ነው።',
    descriptionEn:
      'Architects and deploys scalable e-government software, mobile apps, database systems, and automated portals to streamline public service delivery for residents across Afar.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'dir_4',
    order: 4,
    nameAf: 'Doolatak Ecote Network kee Infrastructure Xizaayin kee Konstrukshin Xayrektoreet',
    nameAm: 'የመንግስት ኢኮቴ ኔትወርክና መሰረተ ልማት ዲዛይንና ግንባታ ዳይሬክቶሬት',
    nameEn: 'Directorate of State ICT Network and Infrastructure Design and Construction',
    descriptionAf:
      'Rakaakay Teknolojih Dudda Diggoosaanam Kee Qasri Dijital Tabaatabsih Tadeerah Uguugus Akah Yayfoofen Innah Abak Geytiman Exxa Kinnim Qaddoosen.',
    descriptionAm:
      'የክልሉን የቴክኖሎጂ አቅም ለማጠናከርና ለዘመናዊ የዲጂታል ለውጥ መርሃ ግብር መሠረት የሚሆኑ የፋይበር ኔትወርኮች፣ የዳታ ማዕከላትና የግንኙነት መሰረተ ልማቶችን ዲዛይን ያደርጋል፣ ይገነባል፣ ያስተዳድራል።',
    descriptionEn:
      'Designs, expands, and maintains high-speed fiber optic backbones, secure data centers, server rooms, and wireless connectivity reaching regional and woreda administrative centers.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'dir_5',
    order: 5,
    nameAf: 'Elektiromekanikaal Silaacitte Dambiyoo kee Asqassaabe Xayrektereet',
    nameAm: 'የኤሌክትሮ መካኒክ መሳሪያዎች ጥገናና እድሳት ዳይሬክቶሬት',
    nameEn: 'Directorate of Maintenance and Renovation of Electromechanical Equipment',
    descriptionAf:
      'Rakaakayak Teknolojih Dudda Maqarroosaanam kee Qasri Industirih Uguugus Teknolojih Tabaatabsa Bicisoonuh Masquliyyat Le.',
    descriptionAm:
      'የመንግስትና የህዝብ ተቋማትን የኤሌክትሮ መካኒክ መሳሪያዎች፣ የሃይል ማመንጫዎች፣ የላብራቶሪ እቃዎችና የኤሌክትሮኒክስ ሲስተሞች ጥገና፣ እድሳትና የጥራት ቁጥጥር ስራዎችን በብቃት ያከናውናል።',
    descriptionEn:
      'Provides mission-critical repair, preventive servicing, calibration, and refurbishment for electromechanical machines, solar power setups, laboratory hardware, and institutional hardware across the state.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  }
];

export const initialSectors: Sector[] = [
  {
    id: 'sec_1',
    order: 1,
    nameAf: 'Innovation and Technology Capacity Building',
    nameAm: 'የኢኖቬሽንና ቴክኖሎጂ አቅም ግንባታ',
    nameEn: 'Innovation and Technology Capacity Building',
    descriptionAf: 'Rakaakay addat teknoloojih dudda diggoosak tabsa.',
    descriptionAm: 'ለክልሉ ሰራተኞች፣ ወጣቶችና ተመራማሪዎች ተግባራዊ የዲጂታል ክህሎትና የፈጠራ አቅም ግንባታ ስልጠና መስጠት።',
    descriptionEn: 'Equipping civil servants, university students, and entrepreneurs with advanced digital competencies.'
  },
  {
    id: 'sec_2',
    order: 2,
    nameAf: 'Web Development and App Demand Study',
    nameAm: 'የዌብ ልማትና አፕልኬሽን ፍላጎት ጥናት',
    nameEn: 'Web Development and App Demand Study',
    descriptionAf: 'Rakaakay doolat xisoosah websaytitte kee applikeshin wagittaamal kusaq abba.',
    descriptionAm: 'የመንግስት ቢሮዎችና ማህበረሰቡ የሚፈልጓቸውን ድረ-ገጾች እና ዲጂታል አፕሊኬሽኖች ፍላጎት መለየትና ማጥናት።',
    descriptionEn: 'Feasibility assessments and technical specification studies for government digital solutions.'
  },
  {
    id: 'sec_3',
    order: 3,
    nameAf: 'Software System and Database Development',
    nameAm: 'የሶፍትዌር፤ ሲስተም፤ አፕሊኬሽንና ዳታቤዝ ልማት',
    nameEn: 'Software System and Database Development',
    descriptionAf: 'Qasri sooftiweer, sistem kee dataa beez bicisaanam.',
    descriptionAm: 'ለክልሉ ተቋማት ዘመናዊና የተሳሰሩ የሶፍትዌር ሲስተሞች፣ ዳታቤዞች እና አውቶሜሽን ቴክኖሎጂዎችን ማበልጸግ።',
    descriptionEn: 'Custom software engineering, relational database warehousing, and microservice infrastructure.'
  },
  {
    id: 'sec_4',
    order: 4,
    nameAf: 'Cyber Assessment and Management',
    nameAm: 'የሳይበር ግምገማና አስተዳደር',
    nameEn: 'Cyber Assessment and Management',
    descriptionAf: 'Sayber amni gimgam kee dacayrih qidaddo.',
    descriptionAm: 'የተቋማትን የመረጃ ደህንነት ተጋላጭነት መገምገም እና አስተማማኝ የመከላከያ እርምጃዎችን መተግበር።',
    descriptionEn: 'Penetration testing, risk posture scoring, and cybersecurity governance compliance.'
  },
  {
    id: 'sec_5',
    order: 5,
    nameAf: 'Data Center & ICT Infrastructure Management',
    nameAm: 'የዳታ ማዕከልና አይሲቲ መሰረተ ልማት አስተዳደር፤ ጥበቃ፤ ጥገናና ድጋፍ',
    nameEn: 'Data Center & ICT Infrastructure Management',
    descriptionAf: 'Dataa center kee ICT network dacayrih taama.',
    descriptionAm: 'የክልሉን ማዕከላዊ ዳታ ሴንተርና የአይሲቲ መሰረተ ልማት ማስተዳደር፣ 24/7 ጥበቃና ፈጣን የቴክኒክ ድጋፍ መስጠት።',
    descriptionEn: '24/7 datacenter operations, server cluster monitoring, power redundancy, and network uptime.'
  },
  {
    id: 'sec_6',
    order: 6,
    nameAf: 'Innovation and Technology Infrastructure Design and Construction',
    nameAm: 'የኢኖቬሽንና ቴክኖሎጂ መሰረተ ልማት ዲዛይንና ግንባታ',
    nameEn: 'Innovation and Technology Infrastructure Design and Construction',
    descriptionAf: 'Teknolojih infrastructure xizaayin kee daddos.',
    descriptionAm: 'የኢኖቬሽን ማዕከላት፣ የቴክኖሎጂ ፓርኮችና የፋይበር ኔትወርክ መስመሮች ዲዛይንና የግንባታ ቁጥጥር።',
    descriptionEn: 'Civil and structural engineering for regional tech incubation hubs and ICT corridors.'
  },
  {
    id: 'sec_7',
    order: 7,
    nameAf: 'Cybersecurity Incident Monitoring and Response',
    nameAm: 'የሳይበር ደህንነት ክስተት ክትትል እና ምላሽ (CSIRT)',
    nameEn: 'Cybersecurity Incident Monitoring and Response (CSIRT)',
    descriptionAf: 'Sayber amni kaxxan tabaatabsa.',
    descriptionAm: 'በክልሉ ላይ የሚቃጡ የሳይበር ጥቃቶችን 24/7 መከታተል፣ መመከትና አፋጣኝ ምላሽ መስጠት።',
    descriptionEn: 'Real-time security operations center (SOC) monitoring and digital forensics.'
  },
  {
    id: 'sec_8',
    order: 8,
    nameAf: 'Sharing and Passing on Indigenous Knowledge',
    nameAm: 'ሀገር በቀል እውቀት ማስፋፋትና ማሸጋገር',
    nameEn: 'Sharing and Passing on Indigenous Knowledge',
    descriptionAf: 'Qafarih garaba kee ixxiga daddosaanam.',
    descriptionAm: 'የአፋር ህዝብ ባህላዊና ሀገር በቀል እውቀቶችን በሳይንሳዊ መንገድ መመዝገብ፣ ማልማትና ለትውልድ ማሸጋገር።',
    descriptionEn: 'Digitization and scientific enhancement of indigenous Afar agricultural, medicinal, and pastoral knowledge.'
  },
  {
    id: 'sec_9',
    order: 9,
    nameAf: 'Technology Patent Validation',
    nameAm: 'የቴክኖሎጂ የፈጠራ ባለቤትነት መብት ማረጋገጥ',
    nameEn: 'Technology Patent Validation',
    descriptionAf: 'Patenti xaqbi diggoosaanam.',
    descriptionAm: 'በክልሉ ለተፈጠሩ የፈጠራ ስራዎችና ቴክኖሎጂዎች ህጋዊ የፈጠራ ባለቤትነት (ፓተንት) ጥበቃ ማረጋገጥ።',
    descriptionEn: 'Intellectual property registration, patent legal filings, and innovation protection.'
  },
  {
    id: 'sec_10',
    order: 10,
    nameAf: 'Quality Control & Tech Standards',
    nameAm: 'የቴክኖሎጂ የጥራት ቁጥጥርና ደረጃ ማረጋገጫ',
    nameEn: 'Technology Quality Control & Certification',
    descriptionAf: 'Teknoloji qalaat dacayri.',
    descriptionAm: 'ወደ ክልሉ የሚገቡ የቴክኖሎጂ እቃዎችና ሶፍትዌሮች ጥራትና ደህንነት ደረጃቸውን የጠበቁ መሆናቸውን ማረጋገጥ።',
    descriptionEn: 'Benchmarking and quality assurance validation for procurement of tech devices.'
  },
  {
    id: 'sec_11',
    order: 11,
    nameAf: 'Repair and Refurbishment of Electromechanical Equipment',
    nameAm: 'የኤሌክትሮ መካኒክ መሳሪያዎች ጥገናና እድሳት',
    nameEn: 'Repair and Refurbishment of Electromechanical Equipment',
    descriptionAf: 'Elektiromekanikaal dambiyoo.',
    descriptionAm: 'የመንግስት ተቋማት የኤሌክትሮ መካኒክ መሳሪያዎችን መጠገን፣ ማደስና ለቀጣይ አገልግሎት ዝግጁ ማድረግ።',
    descriptionEn: 'Heavy hardware maintenance, circuit diagnostics, and generator/solar grid overhauls.'
  },
  {
    id: 'sec_12',
    order: 12,
    nameAf: 'Speeding up Tech Transfer in Institutions Using AI and Modernizing Operations',
    nameAm: 'አርቴፊሻል ኢንተለጀንስ (AI) አላምዶ የተቋማትን አሰራር ማዘመን',
    nameEn: 'AI Adoption and Modernization of Public Institutions',
    descriptionAf: 'Artificial Intelligence horoysiyya.',
    descriptionAm: 'አርቴፊሻል ኢንተለጀንስን (AI) እና ዘመናዊ ቴክኖሎጂዎችን በመጠቀም የመንግስት አሰራርን ማፋጠንና ማዘመን።',
    descriptionEn: 'Deploying AI document processing, predictive resource allocation, and workflow automation.'
  }
];

export const initialNews: News[] = [
  {
    id: 'news_1',
    slug: 'national-space-and-gis-day-celebration-semera',
    titleAf: 'Asanat Agat Space Kee Baadak GIS Ayroh Massakaxxa Qafar Agatih Rakaakayih Doolat Gexisse',
    titleAm: 'የዘንድሮው ብሄራዊ የስፔስና ዓለም አቀፍ የጂአይኤስ ቀን በአል በአፋር ብሄራዊ ክልላዊ መንግሥት ተካሄደ',
    titleEn: "National Space and International GIS Day celebrated at Afar National Regional State Headquarters",
    excerptAf:
      'Qafar Rakaakayak Saynis Teknoloji Kee Innoveshin Komishinik Komishiner Injineer Saqid Macammad Ta Tadeera Abtol Asisak Rakaakay Luddal Taamitoonuh Ekraariseenih Yanin Cato Lem Qaddoysak...',
    excerptAm:
      'የዘንድሮው ብሄራዊ የስፔስና ዓለም አቀፍ የጂአይኤስ ቀን በአል ማጠቃለያ ዝግጅት በአፋር ብሄራዊ ክልላዊ መንግሥት በድምቀት ተካሂዷል።',
    excerptEn:
      "This year's National Space and International GIS Day concluded successfully at the Afar National Regional Government in Semera.",
    contentAf:
      "Asanat Agat Space Kee Baadak GIS Ayroh Massakaxxa Qafar Agatih Rakaakayih Doolat Gexisse. Qafar Rakaakayak Saynis Teknoloji Kee Innoveshin Komishinik Komishiner Injineer Saqid Macammad Ta Tadeera Abtol Asisak Rakaakay Luddal Taamitoonuh Ekraariseenih Yanin Cato Lem Qaddoysak, Ta Inistituyut Rakaakayitte Fanah Cugaysoosa Baahoonuh Abak Geytiman Macal Bisoh Axcelem Kassiise.",
    contentAm:
      "የዘንድሮው ብሄራዊ የስፔስና ዓለም አቀፍ የጂአይኤስ ቀን በአል ማጠቃለያ ዝግጅት በአፋር ብሄራዊ ክልላዊ መንግሥት ተካሂዷል። የአፋር ክልል የሳይንስ፣ ቴክኖሎጂ እና ኢኖቬሽን ኮሚሽን ኮምሽነር ኢንጂነር ሰኢድ ሙሃመድ የፕሮግራም መካሄድ ክልሉ በዘርፉ ለመስራት የያዘውን እቅድ እንደሚያግዝ አንስተው ኢንስቲትዩቱ ፕሮጀክቶችን ወደ ክልሎች ለማውረድ የጀመረውን ጥረት አጠናክሮ እንዲቀጥል ጠይቀዋል። በዚህም የጂአይኤስ (GIS) እና የሳተላይት መረጃዎችን ለግብርና፣ ለአደጋ ቅድመ ማስጠንቀቂያና ለአካባቢ ጥበቃ የመጠቀም ስራዎችን በስፋት ለማከናወን ስምምነት ላይ ተደርሷል።",
    contentEn:
      "This year's National Space and International GIS Day took place at the Afar National Regional Government. Eng. Saeed Mohammed, Commissioner of the Afar Region Science, Technology and Innovation Commission, said that carrying out the program will support the region's plan to develop the sector and asked the institute to keep working on bringing projects to the region.\n\nThe discussions highlighted the strategic integration of Geographic Information Systems (GIS) and remote satellite sensing data to improve natural resource management, flood warning mechanisms across the Awash basin, and agricultural productivity in the region.",
    coverImage: '/uploads/news/583713910_1370145308140505_2477020799977289523_n.jpg',
    published: true,
    publishedAt: '2026-08-07T09:00:00Z',
    createdAt: '2026-08-07T09:00:00Z',
    updatedAt: '2026-08-07T09:00:00Z'
  },
  {
    id: 'news_2',
    slug: 'regional-cybersecurity-resilience-summit',
    titleAf: 'Sayber Amnih Dacayrih Tadeera Semeral Gexsitak Geytimta',
    titleAm: 'የአፋር ክልል የመንግስት ተቋማት የሳይበር ደህንነት ማጠናከሪያ ስልጠና ተሰጠ',
    titleEn: 'Afar SITB Conducts High-Level Cyber Defense Training for Regional Bureaus',
    excerptAf: 'Biiro doolat xisoosah sayber amni dacayrih dudda diggoosak geytima.',
    excerptAm: 'የቢሮው የሳይበር ደህንነት ዳይሬክቶሬት ለክልሉ ሴክተር መስሪያ ቤቶች የመረጃ ጥበቃና የድንገተኛ ጥቃት መከላከያ ዙሪያ ተግባራዊ ስልጠና ሰጥቷል።',
    excerptEn:
      'The Cyber Security Directorate completed a week-long technical audit and cyber hygiene workshop for 40 regional public entities.',
    contentAf:
      'Qafar SITB sayber amni xayrektoreet doolat xisoosah sistemiteey daata centerittek amni dacayrih taama diggoosaak, qasri tekinoloojit gexsi geytiman.',
    contentAm:
      'የአፋር ክልል ሳይንስ፣ ኢኖቬሽንና ቴክኖሎጂ ቢሮ የሳይበር ደህንነት ዳይሬክቶሬት በክልሉ የመንግስት መስሪያ ቤቶች የመረጃ ቋት እና የውስጥ ኔትወርክ ደህንነትን ለማጠናከር ያለመ ተግባራዊ ስልጠና በሰመራ አካሂዷል። በስልጠናው ወቅት ወሳኝ የመንግስት መረጃዎች ከማንኛውም ያልተፈቀደ የሳይበር ጥቃት እንዴት መጠበቅ እንደሚችሉና የድንገተኛ ምላሽ ቡድን (CSIRT) አሰራር በዝርዝር ተብራርቷል።',
    contentEn:
      'The Directorate of Cyber Security at Afar SITB has completed comprehensive threat modeling and incident mitigation workshops for regional bureau directors and IT officers in Semera. The initiative equips civil departments with incident containment protocols, encrypted communications, and secure server management.',
    coverImage: '/uploads/news/583874978_1370144934807209_223835636339610176_n.jpg',
    published: true,
    publishedAt: '2026-08-10T14:30:00Z',
    createdAt: '2026-08-10T14:30:00Z',
    updatedAt: '2026-08-10T14:30:00Z'
  },
  {
    id: 'news_3',
    slug: 'innovation-startup-incubation-grant-launch',
    titleAf: 'Qusbaamih kee Startup daddosih qokol doolat kobox gexsitak geytima',
    titleAm: 'ለፈጠራ ባለቤቶችና ለጀማሪ ቴክኖሎጂ ስታርትፖች ድጋፍ የሚሰጥበት አዲስ ፕሮግራም ይፋ ተደረገ',
    titleEn: 'Afar SITB Launches Tech Innovation & Regional Startup Incubation Fund',
    excerptAf: 'Samara Jaamiqat kee SITB gubat qusba qunxaaneytah teknolooji cato aban.',
    excerptAm: 'የኢኖቬሽንና ቴክኖሎጂ ስታርትፕ ዳይሬክቶሬት ከሰመራ ዩኒቨርሲቲ ጋር በመተባበር ለወጣት የቴክኖሎጂ ፈጣሪዎች የገንዘብና የቦታ ድጋፍ የሚያደርግ መርሃ ግብር ጀምሯል።',
    excerptEn:
      'In partnership with Samara University, the Bureau has unveiled a seed acceleration initiative targeting grassroots fintech, agritech, and solar innovations.',
    contentAf:
      'Biiro qusbaamih xayrektoreet Samara Jaamiqat liddal taamitoonuh kobox abak, qunxaaneytah teknoloojih qusbaamita yewceenih yanin.',
    contentAm:
      'የአፋር ክልል ሳይንስ ኢኖቬሽንና ቴክኖሎጂ ቢሮ ከሰመራ ዩኒቨርሲቲ ጋር በመተባበር ለወጣት ተመራማሪዎችና ፈጣሪዎች የቴክኖሎጂ ማስጀመሪያ ድጋፍ የሚሰጥበትን መርሃ ግብር በይፋ አስጀምሯል። ይህ መርሃ ግብር የፈጠራ ስራዎች ወደ ገበያ እንዲወጡ፣ የፈጠራ ባለቤትነት እንዲረጋገጥ እና የስራ እድል እንዲፈጠር ከፍተኛ ድጋፍ ያደርጋል።',
    contentEn:
      'The Directorate of Innovation & Technology Start-up Ecosystem Transition and Support officially announced an incubation challenge in collaboration with Samara University. Winners will receive mentorship, hardware prototyping lab access, and financial seed support to scale digital solutions for regional development.',
    coverImage: '/uploads/news/583900841_1370145114807191_4607858137429374137_n.jpg',
    published: true,
    publishedAt: '2026-08-12T11:00:00Z',
    createdAt: '2026-08-12T11:00:00Z',
    updatedAt: '2026-08-12T11:00:00Z'
  }
];

export const initialEvents: Event[] = [
  {
    id: 'evt_1',
    slug: 'afar-hackathon-and-digital-summit-2026',
    titleAf: 'Qafar Agatih Dijital Summit kee Hackathon 2026',
    titleAm: 'የአፋር ክልላዊ የዲጂታል ሰሚት እና የሃካቶን ውድድር 2026',
    titleEn: 'Afar Regional Digital Summit & Youth Hackathon 2026',
    descriptionAf:
      'Rakaakay addat qunxaaneytah dijital hackathon kobox Semera Jaamiqat addat gexsitelon.',
    descriptionAm:
      'በሰመራ ከተማ የሚካሄደው ይህ ታላቅ ሰሚት የክልሉን የዲጂታል ሽግግር አቅጣጫዎች የሚዳስስ እና ወጣት የሶፍትዌር አልሚዎች የሚወዳደሩበት የ3 ቀናት የሃካቶን መርሃ ግብር ይዟል።',
    descriptionEn:
      'A premier gathering of government leaders, university tech researchers, software developers, and startup founders converging in Semera to showcase groundbreaking digital public utilities.',
    location: 'Semera University Grand Hall, Semera, Afar',
    coverImage: '/uploads/gallery/photo_2026-08-06_17-43-26.jpg',
    startDate: '2026-09-15T08:30:00Z',
    endDate: '2026-09-17T17:00:00Z',
    published: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'evt_2',
    slug: 'cybersecurity-awareness-week-2026',
    titleAf: 'Sayber Amnih Kassis Ayroota',
    titleAm: 'የሳይበር ደህንነት የግንዛቤ ማስጨበጫ ሳምንት',
    titleEn: 'Regional Cybersecurity & Data Protection Awareness Week',
    descriptionAf: 'Sayber amni kassis tadeera inkih doolat xisoosah gexsiton.',
    descriptionAm: 'ለክልሉ የመንግስት መስሪያ ቤቶች እና የትምህርት ተቋማት የመረጃ ደህንነት ግንዛቤ ማስጨበጫ ሳምንት ይካሄዳል።',
    descriptionEn: 'Interactive security clinics, password hygiene drills, and ethical hacking demonstrations for institutional personnel.',
    location: 'Afar SITB Training Center, Semera',
    coverImage: '/uploads/gallery/photo_2026-08-06_17-41-13.jpg',
    startDate: '2026-10-05T09:00:00Z',
    endDate: '2026-10-09T16:00:00Z',
    published: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  }
];

export const initialPublications: Publication[] = [
  {
    id: 'pub_1',
    titleAf: 'Qafar Rakaakayih Dijital Tabaatabsi Ekraaro (2025-2030)',
    titleAm: 'የአፋር ብሔራዊ ክልላዊ መንግሥት የዲጂታል ትራንስፎርሜሽን ስትራቴጂ ሰነድ (2025-2030)',
    titleEn: 'Afar Regional Digital Transformation Master Strategy (2025–2030)',
    descriptionAf: 'Rakaakay addal 5 sanatih dijital tabaatabsih qasri ekraaro.',
    descriptionAm: 'የክልሉን ሁሉን አቀፍ የዲጂታላይዜሽን፣ የመሠረተ ልማት እና የሳይበር ደህንነት ግቦች የያዘ ስትራቴጂካዊ ሰነድ።',
    descriptionEn: 'Comprehensive 5-year roadmap detailing e-governance deployment, broadband expansion, and capacity building milestones.',
    fileUrl: '#',
    coverImage: '/uploads/gallery/583874978_1370144934807209_223835636339610176_n.jpg',
    published: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'pub_2',
    titleAf: 'Sayber Amnih Qasri Boliisitte Kee Amrittek Kitaaba',
    titleAm: 'የክልሉ ሴክተር መስሪያ ቤቶች የሳይበር ደህንነት መመሪያና ማዕቀፍ',
    titleEn: 'Institutional Cybersecurity Compliance Framework & Standards',
    descriptionAf: 'Sayber amni dacayrih amrittee kee dambiyo.',
    descriptionAm: 'ለመንግስት መስሪያ ቤቶች የመረጃ አያያዝ፣ የኔትወርክ አጠቃቀምና የመረጃ ጥበቃ አስገዳጅ መመሪያዎች።',
    descriptionEn: 'Official regulatory baseline and compliance manual for data confidentiality, backups, and network authorization in regional public offices.',
    fileUrl: '#',
    coverImage: '/uploads/gallery/584118047_1370144971473872_3426836401078017356_n.jpg',
    published: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  }
];

export const initialGalleryItems: GalleryItem[] = [
  {
    id: 'gal_1',
    titleAf: 'Space & GIS Ayroh Massakaxxa Semeral',
    titleAm: 'የስፔስና ጂአይኤስ ቀን ማጠቃለያ በሰመራ',
    titleEn: 'National Space and GIS Day Concluding Event in Semera',
    imageUrl: '/uploads/gallery/583713910_1370145308140505_2477020799977289523_n.jpg',
    type: 'IMAGE',
    createdAt: '2026-08-07T10:00:00Z'
  },
  {
    id: 'gal_2',
    titleAf: 'Biiro Amoytitte kobox',
    titleAm: 'የቢሮው አመራሮችና ባለሙያዎች ውይይት',
    titleEn: 'Strategic Consultation Meeting with Bureau Leadership',
    imageUrl: '/uploads/gallery/583874978_1370144934807209_223835636339610176_n.jpg',
    type: 'IMAGE',
    createdAt: '2026-08-07T10:05:00Z'
  },
  {
    id: 'gal_3',
    titleAf: 'Teknolooji Xayrektoreet Taama',
    titleAm: 'የቴክኖሎጂ ልማት ዳይሬክቶሬት ስራዎች',
    titleEn: 'Technical Team Workshop and Infrastructure Review',
    imageUrl: '/uploads/gallery/583900841_1370145114807191_4607858137429374137_n.jpg',
    type: 'IMAGE',
    createdAt: '2026-08-07T10:10:00Z'
  },
  {
    id: 'gal_4',
    titleAf: 'Qafar SITB Komishiner Warqi',
    titleAm: 'የኮሚሽነር ኢንጂነር ሰኢድ ሙሃመድ ማብራሪያ',
    titleEn: 'Commissioner Keynote Address on Innovation Horizons',
    imageUrl: '/uploads/gallery/584221158_1370145271473842_1363217271285870021_n.jpg',
    type: 'IMAGE',
    createdAt: '2026-08-07T10:15:00Z'
  },
  {
    id: 'gal_5',
    titleAf: 'Doolat Wakiiltah Sawaay',
    titleAm: 'የተቋማት ተወካዮች የጋራ ፎቶ',
    titleEn: 'Delegation Group Photo at the Regional Commission',
    imageUrl: '/uploads/gallery/585705753_1370144668140569_6845058224892262712_n.jpg',
    type: 'IMAGE',
    createdAt: '2026-08-07T10:20:00Z'
  },
  {
    id: 'gal_6',
    titleAf: 'Semera Datacenter & ICT Lab Tour',
    titleAm: 'የዳታ ማዕከል እና የአይሲቲ ላብራቶሪ ጉብኝት',
    titleEn: 'Semera Datacenter and Tech Infrastructure Inspection',
    imageUrl: '/uploads/gallery/photo_2026-08-06_17-43-14.jpg',
    type: 'IMAGE',
    createdAt: '2026-08-06T17:43:14Z'
  }
];

export const initialFaqItems: FaqItem[] = [
  {
    id: 'faq_1',
    order: 1,
    questionAf: 'Qafar SITB biiro kah tanim iyya?',
    questionAm: 'የአፋር ሳይንስ ኢኖቬሽንና ቴክኖሎጂ ቢሮ ዋና ተልዕኮ ምንድን ነው?',
    questionEn: 'What is the primary mandate of the Afar Science Innovation and Technology Bureau?',
    answerAf:
      'Biiro rakaakay doolat xisoosah sayber amni dacayri, dijital xaqbo daddosaanam kee qusba teknolooji tabaatabsa akah abaanam kinnim.',
    answerAm:
      'የቢሮው ዋና ተልዕኮ የክልሉን የሳይበር ደህንነት ማረጋገጥ፣ የመንግስት አገልግሎቶችን በዘመናዊ ቴክኖሎጂ ዲጂታላይዝ ማድረግ፣ የቴክኖሎጂ መሰረተ ልማትን ማስፋፋት እና ለጀማሪ ፈጣሪዎች የስታርትፕ ድጋፍ መስጠት ነው።',
    answerEn:
      'The Bureau spearheads digital public services, builds and secures high-speed ICT networks, orchestrates cybersecurity response protocols, and provides incubation resources for technological innovation across the Afar Region.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'faq_2',
    order: 2,
    questionAf: 'Qunxaaneytah qusbaamih cato akah geyan inna manna?',
    questionAm: 'የቴክኖሎጂ ፈጠራ ያላቸው ወጣቶችና ጀማሪዎች ከቢሮው ምን ዓይነት ድጋፍ ማግኘት ይችላሉ?',
    questionEn: 'How can young tech innovators and startups receive assistance from the Bureau?',
    answerAf:
      'Qusbaamih xayrektoreet fanah sokkiimee hinnay iimeelal nee xagnisak kusaq kee cato geyaanam duddan.',
    answerAm:
      'የፈጠራ ስራ ያላቸው ወጣቶች በኢኖቬሽንና ቴክኖሎጂ ስታርትፕ ዳይሬክቶሬት በኩል የላብራቶሪ መገልገያ፣ የባለሙያ ድጋፍ፣ የፓተንት መብት ማስከበሪያ እና የመነሻ ካፒታል የውድድር እድሎችን ማግኘት ይችላሉ።',
    answerEn:
      'Innovators can access incubation coaching, hardware testing labs, patent filing assistance, and participate in competitive seed grant challenges via our Directorate of Innovation & Technology Start-up Ecosystem.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'faq_3',
    order: 3,
    questionAf: 'Doolat xisoosa sayber amni dacayrih cato akah geyta inna?',
    questionAm: 'የመንግስት መስሪያ ቤቶች የሳይበር ደህንነት ድጋፍ እንዴት ማግኘት ይችላሉ?',
    questionEn: 'How do public regional institutions request cybersecurity auditing and CSIRT incident response?',
    answerAf:
      'Sayber amni xayrektoreet fanah 24/7 cato geytimaah iimeel hinnay sokkiimeet cugayso gexsitan.',
    answerAm:
      'መስሪያ ቤቶች በይፋዊ ደብዳቤ፣ በድረ-ገጻችን አግኙን ቅጽ ወይም ለሳይበር ደህንነት ዳይሬክቶሬት በቀጥታ ጥሪ በማድረግ የደህንነት ኦዲትና የአደጋ ጊዜ ምላሽ (CSIRT) ድጋፍ ወዲያውኑ ማግኘት ይችላሉ።',
    answerEn:
      'Institutions can dispatch an official request or contact our Cyber Security Directorate via the emergency desk for rapid vulnerability audits, firewall configurations, and real-time threat neutralization.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z'
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg_1',
    name: 'Ahmed Ali',
    email: 'ahmed.ali@samara.edu.et',
    phone: '+251 91 123 4567',
    subject: 'Partnership in AI & GIS Agricultural Modeling',
    message:
      'Greetings from Samara University Department of Computer Science. We would like to collaborate on the GIS Satellite sensing project for pastoral drought monitoring in Zone 3.',
    createdAt: '2026-08-14T09:20:00Z',
    isRead: false
  },
  {
    id: 'msg_2',
    name: 'Fatima Omar',
    email: 'fatima.o@awash.gov.et',
    phone: '+251 92 876 5432',
    subject: 'Request for Office LAN Network Audit',
    message:
      'Our woreda administration office in Asayita requires technical inspection of server connections and cybersecurity baseline setup.',
    createdAt: '2026-08-16T11:45:00Z',
    isRead: true
  }
];
