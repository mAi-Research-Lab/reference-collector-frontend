import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Çeviri nesneleri - Common
const enCommon = {
  "brand": "RefCite",
  "navigation": {
    "home": "Home",
    "features": "Features",
    "download": "Download",
    "about": "About",
    "contact": "Contact",
    "pricing": "Pricing",
    "signin": "Sign In",
    "signup": "Get Started"
  },
  "buttons": {
    "download": "Download",
    "downloadFree": "Download Free",
    "getStarted": "Get Started",
    "getStartedOnline": "Get Started Online",
    "startFreeTrial": "Start Free Trial",
    "contactSales": "Contact Sales",
    "contactSupport": "Contact Support",
    "learnMore": "Learn More",
    "viewPricing": "View Pricing",
    "sendMessage": "Send Message"
  },
  "footer": {
    "description": "RefCite is a modern reference management application designed for researchers, students, and academics.",
    "product": "Product",
    "company": "Company",
    "support": "Support",
    "legal": "Legal",
    "features": "Features",
    "pricing": "Pricing",
    "download": "Download",
    "about": "About",
    "blog": "Blog",
    "careers": "Careers",
    "help": "Help Center",
    "contact": "Contact",
    "documentation": "Documentation",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service",
    "cookiePolicy": "Cookie Policy",
    "copyright": "© 2024 RefCite. All rights reserved."
  },
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "warning": "Warning",
    "info": "Information",
    "required": "Required",
    "optional": "Optional",
    "email": "Email",
    "password": "Password",
    "name": "Name",
    "username": "Username"
  },
  "contact": {
    "title": "Get in Touch",
    "subtitle": "Have questions? We'd love to hear from you.",
    "description": "Send us a message and we'll respond as soon as possible.",
    "form": {
      "nameLabel": "Full Name",
      "namePlaceholder": "Enter your full name",
      "emailLabel": "Email Address",
      "emailPlaceholder": "Enter your email address",
      "subjectLabel": "Subject",
      "subjectPlaceholder": "What's this about?",
      "messageLabel": "Message",
      "messagePlaceholder": "Tell us more about your question or feedback...",
      "sendButton": "Send Message"
    },
    "info": {
      "title": "Other ways to reach us",
      "email": "Email us directly",
      "emailAddress": "hello@refcite.com",
      "support": "Need help?",
      "supportAddress": "support@refcite.com",
      "sales": "Sales inquiries",
      "salesAddress": "sales@refcite.com"
    },
    "success": {
      "title": "Message sent!",
      "description": "Thank you for contacting us. We'll get back to you as soon as possible.",
      "backToHome": "Back to Home"
    }
  }
};

const trCommon = {
  "brand": "RefCite",
  "navigation": {
    "home": "Ana Sayfa",
    "features": "Özellikler",
    "download": "İndir",
    "about": "Hakkında",
    "contact": "İletişim",
    "pricing": "Fiyatlandırma",
    "signin": "Giriş Yap",
    "signup": "Kayıt Ol"
  },
  "buttons": {
    "download": "İndir",
    "downloadFree": "Ücretsiz İndir",
    "getStarted": "Başla",
    "getStartedOnline": "Online Başla",
    "startFreeTrial": "Ücretsiz Deneme Başlat",
    "contactSales": "Satış Ekibiyle İletişim",
    "contactSupport": "Destek Al",
    "learnMore": "Daha Fazla Bilgi",
    "viewPricing": "Fiyatları Görüntüle",
    "sendMessage": "Mesaj Gönder"
  },
  "footer": {
    "description": "RefCite, araştırmacılar, öğrenciler ve akademisyenler için tasarlanmış modern bir referans yönetim uygulamasıdır.",
    "product": "Ürün",
    "company": "Şirket",
    "support": "Destek",
    "legal": "Yasal",
    "features": "Özellikler",
    "pricing": "Fiyatlandırma",
    "download": "İndir",
    "about": "Hakkında",
    "blog": "Blog",
    "careers": "Kariyer",
    "help": "Yardım Merkezi",
    "contact": "İletişim",
    "documentation": "Dokümantasyon",
    "privacyPolicy": "Gizlilik Politikası",
    "termsOfService": "Kullanım Şartları",
    "cookiePolicy": "Çerez Politikası",
    "copyright": "© 2024 RefCite. Tüm hakları saklıdır."
  },
  "common": {
    "loading": "Yükleniyor...",
    "error": "Hata",
    "success": "Başarılı",
    "warning": "Uyarı",
    "info": "Bilgi",
    "required": "Zorunlu",
    "optional": "İsteğe Bağlı",
    "email": "E-posta",
    "password": "Şifre",
    "name": "İsim",
    "username": "Kullanıcı Adı"
  },
  "contact": {
    "title": "İletişime Geçin",
    "subtitle": "Sorularınız mı var? Sizden haber almaktan memnuniyet duyarız.",
    "description": "Bize bir mesaj gönderin, en kısa sürede size geri döneceğiz.",
    "form": {
      "nameLabel": "Ad Soyad",
      "namePlaceholder": "Ad soyadınızı girin",
      "emailLabel": "E-posta Adresi",
      "emailPlaceholder": "E-posta adresinizi girin",
      "subjectLabel": "Konu",
      "subjectPlaceholder": "Bu ne hakkında?",
      "messageLabel": "Mesaj",
      "messagePlaceholder": "Sorunuz veya geri bildiriminiz hakkında daha fazla bilgi verin...",
      "sendButton": "Mesaj Gönder"
    },
    "info": {
      "title": "Bize ulaşmanın diğer yolları",
      "email": "Doğrudan e-posta gönderin",
      "emailAddress": "hello@refcite.com",
      "support": "Yardıma mı ihtiyacınız var?",
      "supportAddress": "support@refcite.com",
      "sales": "Satış sorguları",
      "salesAddress": "sales@refcite.com"
    },
    "success": {
      "title": "Mesaj gönderildi!",
      "description": "Bizimle iletişime geçtiğiniz için teşekkür ederiz. En kısa sürede size geri döneceğiz.",
      "backToHome": "Ana Sayfaya Dön"
    }
  }
};

// Home çevirileri
const enHome = {
  "hero": {
    "title": "Modern Reference",
    "titleHighlight": "Management",
    "description": "Powerful, intuitive reference management for researchers, students, and academics. Simplicity and efficiency, redefined.",
    "availableForPlatforms": "Available for Mac, Windows, Linux",
    "trustIndicators": {
      "freeForIndividuals": "Free for individuals",
      "noCreditCardRequired": "No credit card required",
      "worksOffline": "Works offline"
    },
    "statistics": {
      "activeUsers": "Active Users",
      "universities": "Universities",
      "referencesManaged": "References Managed"
    },
    "features": {
      "fastAndEasy": {
        "title": "Fast & Easy",
        "description": "Organize your references in minutes with intuitive design and smart features. Focus on your research instead of complex processes."
      },
      "secure": {
        "title": "Secure & Private",
        "description": "Your data is protected with end-to-end encryption. Whether stored locally or in the cloud, your privacy is always our priority."
      },
      "accessible": {
        "title": "Access Anywhere",
        "description": "Desktop, web, or mobile - syncs across all your devices. Stay productive even in offline environments with offline access."
      }
    }
  },
  "features": {
    "title": "Everything you need to manage references",
    "description": "RefCite combines the power of traditional reference managers with modern, intuitive design and seamless collaboration features.",
    "items": {
      "smartOrganization": {
        "title": "Smart Organization",
        "description": "Automatically organize your references with intelligent tagging, categorization, and machine learning-powered metadata extraction. Never lose track of important papers again."
      },
      "powerfulSearch": {
        "title": "Powerful Search",
        "description": "Find any reference instantly with advanced search, full-text indexing, and smart filters. Search by author, title, keywords, or even content within PDFs."
      },
      "teamCollaboration": {
        "title": "Team Collaboration",
        "description": "Share libraries, create group collections, and collaborate with colleagues in real-time. Perfect for research teams, departments, and academic institutions."
      },
      "quickCitation": {
        "title": "Quick Citation",
        "description": "Generate perfectly formatted citations in over 500 styles including APA, MLA, Chicago, and journal-specific formats. One-click bibliography creation."
      }
    }
  },
  "whyChoose": {
    "title": "Why Choose RefCite?",
    "description": "Built by researchers, for researchers. RefCite addresses the real challenges faced by the academic community with innovative solutions.",
    "items": {
      "noVendorLockIn": {
        "title": "No Vendor Lock-in",
        "description": "Your data belongs to you. Export your library at any time in multiple formats including BibTeX, RIS, and EndNote. Switch between tools without losing your work."
      },
      "lightningFast": {
        "title": "Lightning Fast Performance",
        "description": "Optimized for speed with local-first architecture. Search through thousands of references instantly, even when offline. Built with modern web technologies."
      },
      "academicFirst": {
        "title": "Academic-First Design",
        "description": "Every feature is designed with academic workflows in mind. From dissertation writing to systematic reviews, RefCite adapts to your research methodology."
      }
    },
    "trustedInstitutions": {
      "title": "Trusted by Leading Institutions",
      "quote": "RefCite has transformed how our research department manages citations. The collaboration features are exactly what we needed.",
      "author": "Dr. Sarah Williams, Research Director"
    }
  },
  "download": {
    "title": "Available on all platforms",
    "description": "Download RefCite for your preferred operating system and start managing your references today.",
    "downloadFor": "Download for",
    "version": "Version",
    "requirements": "System requirements: Windows 10+, macOS 10.14+, or Ubuntu 18.04+",
    "features": "Features:",
    "platforms": {
      "windows": {
        "features": {
          "desktopApp": "Desktop app",
          "officeIntegration": "Office integration", 
          "offlineSync": "Offline sync"
        }
      },
      "macos": {
        "features": {
          "nativeDesign": "Native design",
          "quickLook": "Quick Look",
          "spotlightSearch": "Spotlight search"
        }
      },
      "linux": {
        "features": {
          "appImageFormat": "AppImage format",
          "commandLineTools": "Command line tools",
          "packageManagers": "Package managers"
        }
      }
    }
  },
  "testimonials": {
    "title": "Trusted by researchers worldwide",
    "description": "See what our users have to say about RefCite",
    "items": {
      "drSarahJohnson": {
        "quote": "RefCite has completely transformed how I manage my research. The AI-powered organization and seamless collaboration features have saved me countless hours. The interface is intuitive and the citation accuracy is unmatched.",
        "name": "Dr. Sarah Johnson",
        "role": "Research Scientist",
        "institution": "MIT",
        "field": "Computational Biology"
      },
      "profMichaelChen": {
        "quote": "Our entire research team has adopted RefCite, and it's been game-changing. The real-time collaboration and advanced search capabilities make literature reviews so much more efficient. Best investment we've made.",
        "name": "Prof. Michael Chen",
        "role": "University Professor", 
        "institution": "Stanford University",
        "field": "Machine Learning"
      },
      "emmaRodriguez": {
        "quote": "As a PhD student, I need tools that work seamlessly across devices and don't slow me down. RefCite delivers on both fronts. The offline sync is perfect for fieldwork, and the citation styles are comprehensive.",
        "name": "Emma Rodriguez",
        "role": "PhD Student",
        "institution": "University of Oxford", 
        "field": "Environmental Science"
      },
      "drJamesThompson": {
        "quote": "We've implemented RefCite across our entire library system. The institutional features and admin controls are excellent. Students love the user experience, and faculty appreciate the advanced features.",
        "name": "Dr. James Thompson",
        "role": "Librarian & Research Coordinator",
        "institution": "University of Cambridge",
        "field": "Information Science"
      }
    }
  },
  "cta": {
    "title": "Ready to get started?",
    "description": "Join thousands of researchers who trust RefCite to manage their references."
  }
};

const trHome = {
  "hero": {
    "title": "Modern Referans",
    "titleHighlight": "Yönetimi",
    "description": "Araştırmacılar, öğrenciler ve akademisyenler için güçlü, sezgizel referans yönetimi. Basitlik ve verimlilik, yeniden tanımlandı.",
    "availableForPlatforms": "Mac, Windows, Linux için kullanılabilir",
    "trustIndicators": {
      "freeForIndividuals": "Bireyler için ücretsiz",
      "noCreditCardRequired": "Kredi kartı gerektirmez",
      "worksOffline": "Çevrimdışı çalışır"
    },
    "statistics": {
      "activeUsers": "Aktif Kullanıcı",
      "universities": "Üniversite",
      "referencesManaged": "Yönetilen Referans"
    },
    "features": {
      "fastAndEasy": {
        "title": "Hızlı ve Kolay",
        "description": "Sezgisel tasarım ve akıllı özelliklerle referanslarınızı dakikalar içinde düzenleyin. Karmaşık süreçler yerine araştırmanıza odaklanın."
      },
      "secure": {
        "title": "Güvenli ve Gizli",
        "description": "Verileriniz uçtan uca şifreleme ile korunur. İster yerel ister bulutta saklayın, gizliliğiniz her zaman önceliğimizdir."
      },
      "accessible": {
        "title": "Her Yerden Erişim",
        "description": "Masaüstü, web veya mobil - tüm cihazlarınızda senkronize çalışır. Çevrimdışı erişim ile internetsiz ortamlarda bile üretken kalın."
      }
    }
  },
  "features": {
    "title": "Referans yönetimi için ihtiyacınız olan her şey",
    "description": "RefCite, geleneksel referans yöneticilerinin gücünü modern, sezgisel tasarım ve kusursuz işbirliği özellikleriyle birleştirir.",
    "items": {
      "smartOrganization": {
        "title": "Akıllı Organizasyon",
        "description": "Akıllı etiketleme, kategorilendirme ve makine öğrenmesi destekli metadata çıkarma ile referanslarınızı otomatik olarak düzenleyin. Önemli makaleleri bir daha kaybetmeyin."
      },
      "powerfulSearch": {
        "title": "Güçlü Arama",
        "description": "Gelişmiş arama, tam metin indeksleme ve akıllı filtrelerle herhangi bir referansı anında bulun. Yazar, başlık, anahtar kelimeler veya PDF'lerin içeriğine göre arama yapın."
      },
      "teamCollaboration": {
        "title": "Takım İşbirliği",
        "description": "Kütüphaneleri paylaşın, grup koleksiyonları oluşturun ve meslektaşlarınızla gerçek zamanlı işbirliği yapın. Araştırma ekipleri, bölümler ve akademik kurumlar için mükemmel."
      },
      "quickCitation": {
        "title": "Hızlı Alıntılama",
        "description": "APA, MLA, Chicago ve dergiye özel formatlar dahil 500'den fazla stilde mükemmel biçimlendirilmiş alıntılar oluşturun. Tek tıkla bibliyografya oluşturma."
      }
    }
  },
  "whyChoose": {
    "title": "Neden RefCite'ı Seçmelisiniz?",
    "description": "Araştırmacılar tarafından, araştırmacılar için geliştirildi. RefCite, akademik topluluğun karşılaştığı gerçek zorlukları yenilikçi çözümlerle ele alır.",
    "items": {
      "noVendorLockIn": {
        "title": "Satıcı Bağımlılığı Yok",
        "description": "Verileriniz size aittir. Kütüphanenizi istediğiniz zaman BibTeX, RIS ve EndNote dahil birden fazla formatta dışa aktarın. İşinizi kaybetmeden araçlar arasında geçiş yapın."
      },
      "lightningFast": {
        "title": "Yıldırım Hızında Performans",
        "description": "Yerel öncelikli mimari ile hız için optimize edilmiştir. Çevrimdışıyken bile binlerce referans arasında anında arama yapın. Modern web teknolojileriyle geliştirilmiştir."
      },
      "academicFirst": {
        "title": "Akademik Odaklı Tasarım",
        "description": "Her özellik akademik iş akışları göz önünde bulundurularak tasarlanmıştır. Tez yazımından sistematik incelemelere kadar RefCite, araştırma metodolojinize uyum sağlar."
      }
    },
    "trustedInstitutions": {
      "title": "Önde Gelen Kurumlar Tarafından Güvenilir",
      "quote": "RefCite, araştırma bölümümüzün alıntıları nasıl yönettiğini dönüştürdü. İşbirliği özellikleri tam olarak ihtiyacımız olan şeydi.",
      "author": "Dr. Sarah Williams, Araştırma Direktörü"
    }
  },
  "download": {
    "title": "Tüm platformlarda mevcut",
    "description": "Tercih ettiğiniz işletim sistemi için RefCite'ı indirin ve referanslarınızı yönetmeye bugün başlayın.",
    "downloadFor": "İndir:",
    "version": "Sürüm",
    "requirements": "Sistem gereksinimleri: Windows 10+, macOS 10.14+, veya Ubuntu 18.04+",
    "features": "Özellikler:",
    "platforms": {
      "windows": {
        "features": {
          "desktopApp": "Masaüstü uygulaması",
          "officeIntegration": "Office entegrasyonu",
          "offlineSync": "Çevrimdışı senkronizasyon"
        }
      },
      "macos": {
        "features": {
          "nativeDesign": "Yerel tasarım",
          "quickLook": "Hızlı Bakış",
          "spotlightSearch": "Spotlight arama"
        }
      },
      "linux": {
        "features": {
          "appImageFormat": "AppImage formatı",
          "commandLineTools": "Komut satırı araçları",
          "packageManagers": "Paket yöneticileri"
        }
      }
    }
  },
  "testimonials": {
    "title": "Dünya çapında araştırmacılar tarafından güvenilir",
    "description": "Kullanıcılarımızın RefCite hakkında söylediklerini görün",
    "items": {
      "drSarahJohnson": {
        "quote": "RefCite araştırmalarımı nasıl yönettiğimi tamamen dönüştürdü. AI destekli organizasyon ve kusursuz işbirliği özellikleri bana sayısız saat kazandırdı. Arayüz sezgisel ve alıntı doğruluğu eşsiz.",
        "name": "Dr. Sarah Johnson",
        "role": "Araştırma Bilimci",
        "institution": "MIT",
        "field": "Hesaplamalı Biyoloji"
      },
      "profMichaelChen": {
        "quote": "Tüm araştırma ekibimiz RefCite'ı benimsedi ve bu oyun değiştirici oldu. Gerçek zamanlı işbirliği ve gelişmiş arama yetenekleri literatür incelemelerini çok daha verimli hale getiriyor. Yaptığımız en iyi yatırım.",
        "name": "Prof. Michael Chen",
        "role": "Üniversite Profesörü",
        "institution": "Stanford Üniversitesi",
        "field": "Makine Öğrenmesi"
      },
      "emmaRodriguez": {
        "quote": "Doktora öğrencisi olarak, cihazlar arasında sorunsuz çalışan ve beni yavaşlatmayan araçlara ihtiyacım var. RefCite her iki konuda da başarılı. Çevrimdışı senkronizasyon saha çalışması için mükemmel ve alıntı stilleri kapsamlı.",
        "name": "Emma Rodriguez",
        "role": "Doktora Öğrencisi",
        "institution": "Oxford Üniversitesi",
        "field": "Çevre Bilimi"
      },
      "drJamesThompson": {
        "quote": "RefCite'ı tüm kütüphane sistemimizde uyguladık. Kurumsal özellikler ve yönetici kontrolleri mükemmel. Öğrenciler kullanıcı deneyimini seviyor ve öğretim üyeleri gelişmiş özellikleri takdir ediyor.",
        "name": "Dr. James Thompson",
        "role": "Kütüphaneci ve Araştırma Koordinatörü",
        "institution": "Cambridge Üniversitesi",
        "field": "Bilgi Bilimi"
      }
    }
  },
  "cta": {
    "title": "Başlamaya hazır mısınız?",
    "description": "Referanslarını yönetmek için RefCite'a güvenen binlerce araştırmacıya katılın."
  }
};

// Pricing çevirileri
const enPricing = {
  "hero": {
    "title": "Choose Your",
    "titleHighlight": "RefCite",
    "titleEnd": "Plan",
    "description": "Start free and upgrade as your research grows. All plans include our core reference management features.",
    "moneyBackGuarantee": "30-day money-back guarantee"
  },
  "plans": {
    "free": {
      "name": "Free",
      "description": "Perfect for individual researchers and students",
      "features": {
        "references": "Up to 1,000 references",
        "citationStyles": "Basic citation styles",
        "storage": "Local storage"
      }
    },
    "individual": {
      "name": "Individual Pro",
      "description": "For power users who need advanced features",
      "mostPopular": "Most Popular",
      "features": {
        "unlimitedReferences": "Unlimited references",
        "allCitationStyles": "All citation styles (500+)",
        "cloudSync": "Cloud sync across devices",
        "advancedSearch": "Advanced search and filters",
        "customTags": "Custom tags and folders"
      }
    },
    "enterprise": {
      "name": "Enterprise",
      "description": "For institutions, libraries, and large teams",
      "contactUs": "Contact Us",
      "features": {
        "everythingInPro": "Everything in Individual Pro",
        "unlimitedTeam": "Unlimited team members",
        "adminControls": "Advanced admin controls",
        "sso": "Single Sign-On (SSO)",
        "customBranding": "Custom branding",
        "analytics": "Advanced analytics and reporting",
        "apiAccess": "API access",
        "customIntegrations": "Custom integrations"
      }
    },
    "whatsIncluded": "What's included:",
    "getStartedFree": "Get Started Free",
    "startFreeTrial": "Start Free Trial",
    "contactSales": "Contact Sales",
    "billed": "Billed"
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "description": "Got questions? We've got answers.",
    "items": {
      "upgradeDowngrade": {
        "question": "Can I upgrade or downgrade my plan at any time?",
        "answer": "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your current billing period."
      },
      "dataAfterCancel": {
        "question": "What happens to my data if I cancel?",
        "answer": "Your data remains accessible in read-only mode for 30 days after cancellation. You can export all your data during this period."
      },
      "studentDiscount": {
        "question": "Do you offer student discounts?",
        "answer": "Students can use our free plan, which includes all essential features. For advanced features, we offer a 50% student discount on Individual Pro plans."
      },
      "deviceLimit": {
        "question": "Is there a limit to how many devices I can use?",
        "answer": "Individual plans can be used on up to 5 devices. Enterprise plans have no device limits."
      },
      "refunds": {
        "question": "Do you offer refunds?",
        "answer": "We offer a 30-day money-back guarantee for all paid plans. Contact support for refund requests."
      }
    },
    "stillHaveQuestions": "Still have questions?",
    "contactSupport": "Contact Support"
  },
  "cta": {
    "title": "Ready to transform your research?",
    "description": "Join thousands of researchers who trust RefCite to organize their references.",
    "startFreeTrial": "Start Your Free Trial"
  }
};

const trPricing = {
  "hero": {
    "title": "",
    "titleHighlight": "RefCite",
    "titleEnd": "Planınızı Seçin",
    "description": "Ücretsiz başlayın ve araştırmanız büyüdükçe yükseltin. Tüm planlar temel referans yönetimi özelliklerimizi içerir.",
    "moneyBackGuarantee": "30 günlük para iade garantisi"
  },
  "plans": {
    "free": {
      "name": "Ücretsiz",
      "description": "Bireysel araştırmacılar ve öğrenciler için mükemmel",
      "features": {
        "references": "1.000 referansa kadar",
        "citationStyles": "Temel alıntı stilleri",
        "storage": "Yerel depolama"
      }
    },
    "individual": {
      "name": "Bireysel Pro",
      "description": "Gelişmiş özelliklere ihtiyaç duyan güçlü kullanıcılar için",
      "mostPopular": "En Popüler",
      "features": {
        "unlimitedReferences": "Sınırsız referans",
        "allCitationStyles": "Tüm alıntı stilleri (500+)",
        "cloudSync": "Cihazlar arası bulut senkronizasyonu",
        "advancedSearch": "Gelişmiş arama ve filtreler",
        "customTags": "Özel etiketler ve klasörler"
      }
    },
    "enterprise": {
      "name": "Kurumsal",
      "description": "Kurumlar, kütüphaneler ve büyük ekipler için",
      "contactUs": "Bize Ulaşın",
      "features": {
        "everythingInPro": "Bireysel Pro'daki her şey",
        "unlimitedTeam": "Sınırsız takım üyesi",
        "adminControls": "Gelişmiş yönetici kontrolleri",
        "sso": "Tek Oturum Açma (SSO)",
        "customBranding": "Özel markalama",
        "analytics": "Gelişmiş analitik ve raporlama",
        "apiAccess": "API erişimi",
        "customIntegrations": "Özel entegrasyonlar"
      }
    },
    "whatsIncluded": "Neler dahil:",
    "getStartedFree": "Ücretsiz Başla",
    "startFreeTrial": "Ücretsiz Deneme Başlat",
    "contactSales": "Satış Ekibiyle İletişim",
    "billed": "Faturalandırılır"
  },
  "faq": {
    "title": "Sıkça Sorulan Sorular",
    "description": "Sorularınız mı var? Cevaplarımız var.",
    "items": {
      "upgradeDowngrade": {
        "question": "Planımı istediğim zaman yükseltebilir veya düşürebilir miyim?",
        "answer": "Evet, planınızı istediğiniz zaman değiştirebilirsiniz. Yükseltmeler hemen etkili olur, düşürmeler ise mevcut faturalama döneminizin sonunda etkili olur."
      },
      "dataAfterCancel": {
        "question": "İptal edersem verilerime ne olur?",
        "answer": "Verileriniz iptalden sonra 30 gün boyunca salt okunur modda erişilebilir kalır. Bu süre içinde tüm verilerinizi dışa aktarabilirsiniz."
      },
      "studentDiscount": {
        "question": "Öğrenci indirimi sunuyor musunuz?",
        "answer": "Öğrenciler tüm temel özellikleri içeren ücretsiz planımızı kullanabilir. Gelişmiş özellikler için Bireysel Pro planlarında %50 öğrenci indirimi sunuyoruz."
      },
      "deviceLimit": {
        "question": "Kaç cihazda kullanabileceğim konusunda bir sınır var mı?",
        "answer": "Bireysel planlar 5 cihaza kadar kullanılabilir. Kurumsal planların cihaz sınırı yoktur."
      },
      "refunds": {
        "question": "Para iadesi sunuyor musunuz?",
        "answer": "Tüm ücretli planlar için 30 günlük para iade garantisi sunuyoruz. İade talepleri için destek ekibiyle iletişime geçin."
      }
    },
    "stillHaveQuestions": "Hâlâ sorularınız mı var?",
    "contactSupport": "Destek Al"
  },
  "cta": {
    "title": "Araştırmanızı dönüştürmeye hazır mısınız?",
    "description": "Referanslarını düzenlemek için RefCite'a güvenen binlerce araştırmacıya katılın.",
    "startFreeTrial": "Ücretsiz Denemenizi Başlatın"
  }
};

// Auth çevirileri
const enAuth = {
  "signin": {
    "title": "Welcome back",
    "subtitle": "Sign in to your RefCite account",
    "emailLabel": "Email address",
    "emailPlaceholder": "Enter your email",
    "passwordLabel": "Password",
    "passwordPlaceholder": "Enter your password",
    "rememberMe": "Remember me",
    "forgotPassword": "Forgot your password?",
    "signInButton": "Sign in",
    "noAccount": "Don't have an account?",
    "signUpLink": "Sign up",
    "orContinueWith": "Or continue with",
    "signInWithGoogle": "Sign in with Google",
    "signInWithGitHub": "Sign in with GitHub"
  },
  "signup": {
    "title": "Create your account",
    "subtitle": "Join thousands of researchers using RefCite",
    "firstNameLabel": "First name",
    "firstNamePlaceholder": "Enter your first name",
    "lastNameLabel": "Last name",
    "lastNamePlaceholder": "Enter your last name",
    "emailLabel": "Email address",
    "emailPlaceholder": "Enter your email",
    "passwordLabel": "Password",
    "passwordPlaceholder": "Create a password",
    "confirmPasswordLabel": "Confirm password",
    "confirmPasswordPlaceholder": "Confirm your password",
    "agreeToTerms": "I agree to the",
    "termsOfService": "Terms of Service",
    "and": "and",
    "privacyPolicy": "Privacy Policy",
    "signUpButton": "Create account",
    "alreadyHaveAccount": "Already have an account?",
    "signInLink": "Sign in",
    "orContinueWith": "Or continue with",
    "signUpWithGoogle": "Sign up with Google",
    "signUpWithGitHub": "Sign up with GitHub",
    "benefits": {
      "title": "What Can You Do with RefCite?",
      "unlimitedReferences": {
        "title": "Unlimited References",
        "description": "Add as many articles and sources as you want"
      },
      "automaticCitation": {
        "title": "Automatic Citation",
        "description": "Auto-format in 500+ different citation styles"
      },
      "teamCollaboration": {
        "title": "Team Collaboration",
        "description": "Easily share with your research team"
      },
      "signinPrompt": "Sign in now and access your references"
    }
  },
  "forgotPassword": {
    "title": "Reset your password",
    "subtitle": "Enter your email address and we'll send you a link to reset your password",
    "emailLabel": "Email address",
    "emailPlaceholder": "Enter your email",
    "sendResetLinkButton": "Send reset link",
    "backToSignIn": "Back to sign in",
    "checkEmail": "Check your email",
    "resetLinkSent": "We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.",
    "didntReceiveEmail": "Didn't receive the email?",
    "resendLink": "Resend link"
  }
};

const trAuth = {
  "signin": {
    "title": "Tekrar hoş geldiniz",
    "subtitle": "RefCite hesabınıza giriş yapın",
    "emailLabel": "E-posta adresi",
    "emailPlaceholder": "E-posta adresinizi girin",
    "passwordLabel": "Şifre",
    "passwordPlaceholder": "Şifrenizi girin",
    "rememberMe": "Beni hatırla",
    "forgotPassword": "Şifrenizi mi unuttunuz?",
    "signInButton": "Giriş yap",
    "noAccount": "Hesabınız yok mu?",
    "signUpLink": "Kayıt ol",
    "orContinueWith": "Veya devam edin:",
    "signInWithGoogle": "Google ile giriş yap",
    "signInWithGitHub": "GitHub ile giriş yap"
  },
  "signup": {
    "title": "Hesabınızı oluşturun",
    "subtitle": "RefCite kullanan binlerce araştırmacıya katılın",
    "firstNameLabel": "Ad",
    "firstNamePlaceholder": "Adınızı girin",
    "lastNameLabel": "Soyad",
    "lastNamePlaceholder": "Soyadınızı girin",
    "emailLabel": "E-posta adresi",
    "emailPlaceholder": "E-posta adresinizi girin",
    "passwordLabel": "Şifre",
    "passwordPlaceholder": "Bir şifre oluşturun",
    "confirmPasswordLabel": "Şifre onayı",
    "confirmPasswordPlaceholder": "Şifrenizi onaylayın",
    "agreeToTerms": "Kabul ediyorum:",
    "termsOfService": "Kullanım Şartları",
    "and": "ve",
    "privacyPolicy": "Gizlilik Politikası",
    "signUpButton": "Hesap oluştur",
    "alreadyHaveAccount": "Zaten hesabınız var mı?",
    "signInLink": "Giriş yap",
    "orContinueWith": "Veya devam edin:",
    "signUpWithGoogle": "Google ile kayıt ol",
    "signUpWithGitHub": "GitHub ile kayıt ol",
    "benefits": {
      "title": "RefCite ile Neler Yapabilirsiniz?",
      "unlimitedReferences": {
        "title": "Sınırsız Referans",
        "description": "Dilediğiniz kadar makale ve kaynak ekleyin"
      },
      "automaticCitation": {
        "title": "Otomatik Alıntı",
        "description": "500+ farklı alıntı stilinde otomatik format"
      },
      "teamCollaboration": {
        "title": "Takım İşbirliği",
        "description": "Araştırma ekibinizle kolayca paylaşın"
      },
      "signinPrompt": "Hemen giriş yapın ve referanslarınıza erişin"
    }
  },
  "forgotPassword": {
    "title": "Şifrenizi sıfırlayın",
    "subtitle": "E-posta adresinizi girin, şifrenizi sıfırlamak için size bir bağlantı gönderelim",
    "emailLabel": "E-posta adresi",
    "emailPlaceholder": "E-posta adresinizi girin",
    "sendResetLinkButton": "Sıfırlama bağlantısı gönder",
    "backToSignIn": "Giriş sayfasına dön",
    "checkEmail": "E-postanızı kontrol edin",
    "resetLinkSent": "E-posta adresinize şifre sıfırlama bağlantısı gönderdik. Lütfen gelen kutunuzu kontrol edin ve şifrenizi sıfırlamak için talimatları izleyin.",
    "didntReceiveEmail": "E-postayı almadınız mı?",
    "resendLink": "Tekrar gönder"
  }
};

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    pricing: enPricing,
    auth: enAuth,
  },
  tr: {
    common: trCommon,
    home: trHome,
    pricing: trPricing,
    auth: trAuth,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // varsayılan dil
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common', 'home', 'pricing', 'auth'],
    defaultNS: 'common',
  });

export default i18n; 