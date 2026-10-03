// ──────────────────────────────────────
// Invitation Config — auto-generated
// ──────────────────────────────────────

const _basePath = process.env.NEXT_PUBLIC_REPO_NAME ? `/${process.env.NEXT_PUBLIC_REPO_NAME}` : '';

// ── 타입 ────────────────────────────

interface HostItem {
  name: string; nameEn?: string;
  role: string; roleEn?: string;
  phone?: string; avatarUrl?: string;
}

interface AccountItem {
  label: string; bankName: string;
  accountNumber: string; holder: string;
}

interface ContactItem {
  name: string; phone: string; role?: string;
}

// ── 헬퍼 ────────────────────────────

function parseJSON<T>(env: string | undefined, fallback: T): T {
  if (!env) return fallback;
  try { return JSON.parse(env) as T; } catch { return fallback; }
}

// ── 데모 데이터 ─────────────────────

const DEMO_HOSTS: HostItem[] = [
  {
    name: '김민준',
    nameEn: 'Minjun Kim',
    role: '신랑 · 김영호·박정숙의 장남',
    roleEn: 'Groom · Son of Youngho Kim & Jeongsuk Park',
    phone: '010-2345-6789',
  },
  {
    name: '이서연',
    nameEn: 'Seoyeon Lee',
    role: '신부 · 이재현·최은주의 차녀',
    roleEn: 'Bride · Second Daughter of Jaehyun Lee & Eunju Choi',
    phone: '010-9876-5432',
  }
];

const DEMO_ACCOUNTS: AccountItem[] = [
  { label: '신랑측', bankName: '국민은행', accountNumber: '123456-04-789012', holder: '김민준' },
  { label: '신부측', bankName: '신한은행', accountNumber: '110-234-567890', holder: '이서연' }
];

const DEMO_CONTACTS: ContactItem[] = [
  { name: '김민준', phone: '010-2345-6789', role: '신랑' },
  { name: '이서연', phone: '010-9876-5432', role: '신부' }
];

// ── config ──────────────────────────

export const siteConfig = {
  // hero
  eventType: process.env.NEXT_PUBLIC_EVENT_TYPE || 'custom',
  designPreset: 'elegant-gold',
  title: process.env.NEXT_PUBLIC_TITLE || '2026 J-FESTIVAL',
  titleEn: '',
  subtitle: process.env.NEXT_PUBLIC_SUBTITLE || '우리의 실력을 자랑함이 아닌 주님을 높여드리기를 원합니다',
  subtitleEn: '',
  heroImageUrl: `${_basePath}/images/1791006556401-upload.webp`,
  gradientFrom: '#F3E8CF',
  gradientTo: '#FBF7F0',
  fontFamily: 'Nanum Myeongjo',

  // dday
  eventDate: '2026-10-24',
  eventTime: '17:00',
  eventDateLabel: '2026년 10월 24일 토요일 오후 5시',
  eventDateLabelEn: '',
  showCountdown: true,
  countdownStyle: 'flip' as 'flip' | 'simple',

  // hosts
  hostsTitle: '초대하는 사람',
  hostsTitleEn: 'Hosted by',
  hosts: parseJSON<HostItem[]>(process.env.NEXT_PUBLIC_HOSTS, DEMO_HOSTS),

  // location
  venueName: '안양교회 본당 2층',
  venueNameEn: '',
  venueAddress: '경기도 안양시 동안구 동편로 49번길 24',
  venueAddressEn: '',
  kakaoMapUrl: '',
  naverMapUrl: 'https://map.naver.com/p/search/%EC%95%88%EC%96%91%EA%B5%90%ED%9A%8C/place/692335633?placePath=%2Fhome%3Fbk_query%3D%EC%95%88%EC%96%91%EA%B5%90%ED%9A%8C%26entry%3Dbmp%26from%3Dmap%26fromPanelNum%3D2%26timestamp%3D202610031456%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%95%88%EC%96%91%EA%B5%90%ED%9A%8C',
  parkingInfo: '건물 지하 2~3층',
  transitInfo: '지하철 4호선 인덕원역 8번 출구 도보 10분 · 버스 60-1번,80번,마을버스8번 강남역사거리 정류장 하차',

  // gallery
  galleryImages: parseJSON<string[]>(process.env.NEXT_PUBLIC_GALLERY, [
  `${_basePath}/images/1791007357788-upload.webp`,
  `${_basePath}/images/1791007398668-upload.webp`,
  `${_basePath}/images/1791007423671-upload.webp`,
  `${_basePath}/images/1791007459104-upload.webp`,
  `${_basePath}/images/1791007485703-upload.webp`,
  `${_basePath}/images/1791007510878-upload.webp`,
  `${_basePath}/images/1791007544399-upload.webp`,
  `${_basePath}/images/1791007583277-upload.webp`,
  `${_basePath}/images/1791007664690-upload.webp`
]),
  galleryColumns: 3,

  // account
  accountTitle: '마음 전하기',
  accountTitleEn: 'Send Your Wishes',
  accounts: parseJSON<AccountItem[]>(process.env.NEXT_PUBLIC_ACCOUNTS, DEMO_ACCOUNTS),
  kakaoPayUrl: '',

  // contact
  contacts: parseJSON<ContactItem[]>(process.env.NEXT_PUBLIC_CONTACTS, DEMO_CONTACTS),

  // message
  messageTitle: '초대합니다',
  messageTitleEn: 'INVITE',
  messageBody: '안양교회 청소년부 아이들이\n워십,CCD,성극 등\n주님을 높이며 찬양하는\n페스티벌을 합니다\n\n귀한 걸음 하시어\n함께 찬양하며 우리 아이들을 \n축복해 주시면\n감사하겠습니다.',
  messageAlign: 'center' as 'center' | 'left',

  // share
  shareTitle: '초대장 공유하기',
  shareTitleEn: 'Share',
  enableKakao: true,
  enableCopy: true,
  enableQr: true,
  kakaoJsKey: '',

  // rsvp
  rsvpTitle: '참석 여부 회신',
  rsvpTitleEn: 'RSVP',
  rsvpDescription: '참석 여부를 미리 알려주시면 정성껏 준비하겠습니다',
  rsvpUrl: '',
  rsvpButtonLabel: '참석 여부 알리기',

  // footer
  closingMessage: '저희 청소년부의 J페스티벌에 함께 해주시고 기도해 주시면 감사하겠습니다 ',
  closingMessageEn: '',
  showPoweredBy: true,
};
