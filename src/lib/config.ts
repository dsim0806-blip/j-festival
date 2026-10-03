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
  eventType: process.env.NEXT_PUBLIC_EVENT_TYPE || 'wedding',
  designPreset: 'elegant-gold',
  title: process.env.NEXT_PUBLIC_TITLE || '저희, 결혼합니다',
  titleEn: 'We\'re Getting Married',
  subtitle: process.env.NEXT_PUBLIC_SUBTITLE || '여섯 번의 계절을 함께 걸어온 두 사람이 이제 같은 이름의 겨울을 맞이합니다',
  subtitleEn: 'Two people who have walked through six seasons together now welcome a winter under one shared name.',
  heroImageUrl: 'https://images.unsplash.com/photo-1517456363055-5d162a453d6d?auto=format&fit=crop&w=1080&q=80',
  gradientFrom: '#F3E8CF',
  gradientTo: '#FBF7F0',
  fontFamily: 'Nanum Myeongjo',

  // dday
  eventDate: '2026-12-19',
  eventTime: '14:00',
  eventDateLabel: '2026년 12월 19일 토요일 오후 2시',
  eventDateLabelEn: 'Saturday, December 19, 2026 at 2:00 PM',
  showCountdown: true,
  countdownStyle: 'flip' as 'flip' | 'simple',

  // hosts
  hostsTitle: '초대하는 사람',
  hostsTitleEn: 'Hosted by',
  hosts: parseJSON<HostItem[]>(process.env.NEXT_PUBLIC_HOSTS, DEMO_HOSTS),

  // location
  venueName: '라온제나 홀 3F 그랜드볼룸',
  venueNameEn: 'Raonjena Hall, 3F Grand Ballroom',
  venueAddress: '서울 강남구 테헤란로 129',
  venueAddressEn: '129 Teheran-ro, Gangnam-gu, Seoul',
  kakaoMapUrl: '',
  naverMapUrl: '',
  parkingInfo: '건물 지하 2~4층, 2시간 무료(안내데스크 등록)',
  transitInfo: '지하철 2호선·신분당선 강남역 3번 출구 도보 5분 · 버스 강남역사거리 정류장 하차',

  // gallery
  galleryImages: parseJSON<string[]>(process.env.NEXT_PUBLIC_GALLERY, [
  'https://images.unsplash.com/photo-1571753217197-b28b8f889b7a?auto=format&fit=crop&w=800&q=75',
  'https://images.unsplash.com/photo-1541538670337-c53313ad7c00?auto=format&fit=crop&w=800&q=75',
  'https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?auto=format&fit=crop&w=800&q=75',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=75',
  'https://images.unsplash.com/photo-1591604442449-ecc9943efabf?auto=format&fit=crop&w=800&q=75',
  'https://images.unsplash.com/photo-1535185384036-28bbc8035f28?auto=format&fit=crop&w=800&q=75'
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
  enableQr: false,
  kakaoJsKey: '',

  // rsvp
  rsvpTitle: '참석 여부 회신',
  rsvpTitleEn: 'RSVP',
  rsvpDescription: '참석 여부를 미리 알려주시면 정성껏 준비하겠습니다',
  rsvpUrl: '',
  rsvpButtonLabel: '참석 여부 알리기',

  // footer
  closingMessage: '저희 두 사람의 새로운 시작을 함께해 주셔서 감사합니다',
  closingMessageEn: 'Thank you for celebrating the beginning of our new journey together.',
  showPoweredBy: true,
};
