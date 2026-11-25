export type NavLink = {
  text: string;
  href: string;
};

export type DeskItem = {
  label: string;
  value: string;
  detail?: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  locale: string;
  author: {
    name: string;
    role: string;
    instagram: string;
    instagramHandle: string;
    email: string;
  };
  headerNavLinks: NavLink[];
  footerNavLinks: NavLink[];
  hero: {
    headline: string;
    intro: string;
    primaryAction: NavLink;
    secondaryAction: NavLink;
    imageSrc: string;
    imageAlt: string;
    imageCaption: string;
  };
  deskNow: DeskItem[];
  questionBox: {
    /**
     * Ücretsiz Formspree (https://formspree.io/f/xxxx) veya Web3Forms endpoint adresi.
     * Boş bırakıldığında form güvenli yerel önizleme modunda çalışır.
     */
    formEndpoint: string;
  };
  ethicsNote: string;
  postsPerPage: number;
};

const siteConfig: SiteConfig = {
  name: 'Tuğba',
  title: 'Tuğba — Yazılar, Rehberlik ve Duygular Sözlüğü',
  description:
    'Bir rehber öğretmenin kaleminden psikoloji ve rehberlik notları, duygular sözlüğü, aklımda kalanlar ve kitaplık.',
  locale: 'tr-TR',
  author: {
    name: 'Tuğba',
    role: 'Psikolojik Danışmanlık ve Rehberlik',
    instagram: 'https://instagram.com/tugbadan_',
    instagramHandle: '@tugbadan_',
    email: 'merhaba@tugbadan.example'
  },
  headerNavLinks: [
    { text: 'Yazılar', href: '/yazilar' },
    { text: 'Duygular sözlüğü', href: '/duygular' },
    { text: 'Aklımda kalanlar', href: '/aklimda-kalanlar' },
    { text: 'Kitaplık', href: '/kitaplik' },
    { text: 'Rehberlik', href: '/rehberlik' },
    { text: 'Hakkımda', href: '/hakkimda' }
  ],
  footerNavLinks: [
    { text: 'Yazılar', href: '/yazilar' },
    { text: 'Duygular sözlüğü', href: '/duygular' },
    { text: 'Aklımda kalanlar', href: '/aklimda-kalanlar' },
    { text: 'Rehberlik', href: '/rehberlik' }
  ],
  hero: {
    headline: 'Hâlâ vaktin var.',
    intro:
      'Rehber öğretmenim. İnsanların dile getirmekte zorlandığı duygular, altını çizdiğim kitaplar ve okul koridorlarından artakalan mesleki notlar için sakin bir alan.',
    primaryAction: { text: 'Yazıları oku', href: '/yazilar' },
    secondaryAction: { text: 'Rehberlik köşesi', href: '/rehberlik' },
    imageSrc: '/images/hero-vadi-agac.jpg',
    imageAlt: 'Kapadokya vadisinde açık renkli tüf tepelerinin ortasında tek başına duran yeşil bir ağaç',
    imageCaption: 'Kapadokya, sabah sessizliği'
  },
  deskNow: [
    {
      label: 'Okuyorum',
      value: 'Veda Etmiyorum',
      detail: 'Han Kang'
    },
    {
      label: 'Son izlediğim',
      value: 'Guguk Kuşu',
      detail: 'Miloš Forman'
    },
    {
      label: 'Kıyıda kalan',
      value: 'Her şey değişir, her şey devinir.'
    }
  ],
  questionBox: {
    formEndpoint: ''
  },
  ethicsNote:
    'Bu sitedeki rehberlik ve psikoloji yazıları genel bilgilendirme amaçlıdır; bireysel psikolojik danışmanlık, tanı ya da acil destek yerine geçmez.',
  postsPerPage: 10
};

export default siteConfig;
