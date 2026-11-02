import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Search, Bell, User, ShoppingBag, TrendingUp, Sparkles, 
  ChevronRight, Heart, Bookmark, ArrowUpRight, MessageSquare,
  Home, CreditCard, LineChart, PieChart, Check, X,
  Shield, Settings, Clock, ChevronLeft, Lock, Trash2
} from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // [추가] 알림 / 세일 혜택 / 이벤트 상세 페이지 상태
  const [subPage, setSubPage] = useState(null); // { type: 'notifications' | 'sale' | 'event', brand }

  // 찜한 브랜드 중앙 상태 관리
  const [likedBrands, setLikedBrands] = useState(['스타벅스', '나이키', '올리브영', '무신사']);

  const toggleLike = (brandName) => {
    if (likedBrands.includes(brandName)) {
      setLikedBrands(likedBrands.filter(b => b !== brandName));
    } else {
      setLikedBrands([...likedBrands, brandName]);
    }
  };

  return (
    <div className={`max-w-md mx-auto min-h-screen pb-20 font-sans relative shadow-xl transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* [추가] 알림 / 세일 혜택 / 이벤트 상세 화면 */}
      {subPage ? (
        <SubPageView 
          subPage={subPage} 
          onClose={() => setSubPage(null)} 
          isDarkMode={isDarkMode} 
        />
      ) : selectedIssue ? (
        /* 댓글 상세 화면 모달 */
        <CommentView 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
          isDarkMode={isDarkMode}
        />
      ) : isSearchOpen ? (
        /* 검색 화면 모달 */
        <SearchView 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => setIsSearchOpen(false)}
          isDarkMode={isDarkMode}
        />
      ) : (
        <>
          {/* Header */}
          <header className={`sticky top-0 backdrop-blur-md z-50 px-4 py-3 flex items-center justify-between border-b transition-colors ${isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-100'}`}>
            <div className="flex items-center gap-2">
              {activeTab === 'myPage' ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveTab('home')} className={`p-1 -ml-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    <ChevronLeft size={24} />
                  </button>
                  <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>My Page</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-600 font-bold block leading-none">00증권</span>
                    <span className={`text-base font-black leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>TrendFolio</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              {activeTab !== 'myPage' && (
                <>
                  <button onClick={() => setIsSearchOpen(true)} className={`p-1.5 rounded-full ${isDarkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}>
                    <Search size={20} />
                  </button>
                  {/* [수정] 알림 버튼 → 알림 페이지로 이동 */}
                  <button 
                    onClick={() => setSubPage({ type: 'notifications' })}
                    className={`p-1.5 rounded-full relative ${isDarkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
                  >
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                </>
              )}
              <button 
                onClick={() => setActiveTab('myPage')}
                className={`p-1.5 rounded-full transition-colors ${activeTab === 'myPage' ? 'bg-blue-600 text-white' : isDarkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                <User size={18} />
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-4 space-y-6">
            {activeTab === 'home' && (
              <HomeView 
                setActiveTab={setActiveTab} 
                onOpenSearch={(query = '') => {
                  setSearchQuery(query);
                  setIsSearchOpen(true);
                }}
                onOpenComment={(issue) => setSelectedIssue(issue)}
                onOpenDetail={(page) => setSubPage(page)}
                isDarkMode={isDarkMode}
              />
            )}
            {activeTab === 'myExpense' && (
              <MyExpenseView likedBrands={likedBrands} toggleLike={toggleLike} setLikedBrands={setLikedBrands} isDarkMode={isDarkMode} />
            )}
            {activeTab === 'stockTrend' && (
              <StockTrendView isDarkMode={isDarkMode} />
            )}
            {activeTab === 'investmentInfo' && (
              <InvestmentInfoView isDarkMode={isDarkMode} />
            )}
            {activeTab === 'myPage' && (
              <MyPageView 
                likedBrands={likedBrands} 
                setLikedBrands={setLikedBrands} 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode} 
              />
            )}
          </main>

          {/* Bottom Nav */}
          <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto backdrop-blur-md border-t px-6 py-2.5 flex justify-between items-center z-50 transition-colors ${isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'}`}>
            <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600 font-bold' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <Home size={20} />
              <span className="text-[11px]">홈</span>
            </button>
            <button onClick={() => setActiveTab('myExpense')} className={`flex flex-col items-center gap-1 ${activeTab === 'myExpense' ? 'text-blue-600 font-bold' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <CreditCard size={20} />
              <span className="text-[11px]">내 소비</span>
            </button>
            <button onClick={() => setActiveTab('stockTrend')} className={`flex flex-col items-center gap-1 ${activeTab === 'stockTrend' ? 'text-blue-600 font-bold' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <LineChart size={20} />
              <span className="text-[11px]">주식 트렌드</span>
            </button>
            <button onClick={() => setActiveTab('investmentInfo')} className={`flex flex-col items-center gap-1 ${activeTab === 'investmentInfo' ? 'text-blue-600 font-bold' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <PieChart size={20} />
              <span className="text-[11px]">투자정보</span>
            </button>
          </nav>
        </>
      )}
    </div>
  );
}

/* =========================================================================
   1. 홈 - 소비 트렌드 발견
   ========================================================================= */
function HomeView({ setActiveTab, onOpenSearch, onOpenComment, onOpenDetail, isDarkMode }) {
  const issues = [
    {
      id: 1,
      tag: "베이커리 협업",
      title: "런던베이글뮤지엄 제휴 콜라보 대흥행",
      commentsCount: 128,
      likesCount: 342,
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      tag: "가성비 뷰티",
      title: "다이소 5천원 뷰티 앰플 품절 대란",
      commentsCount: 96,
      likesCount: 512,
      img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const cardStyle = isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[11px] font-extrabold text-pink-500 tracking-wider">LIFESTYLE TO WEALTH</span>
            <h1 className={`text-2xl font-black mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              요즘 다들 <span className="text-blue-600">뭐 사지 ?</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 mt-0.5">실시간 소비 레이더</p>
          </div>
          <div className={`p-3 rounded-full ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
            <ShoppingBag size={22} />
          </div>
        </div>

        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..." 
            className={`w-full border-none rounded-xl py-2.5 pl-9 pr-20 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 text-slate-900'}`}
            onKeyDown={(e) => e.key === 'Enter' && onOpenSearch(e.target.value)}
          />
          <button 
            onClick={(e) => onOpenSearch(e.currentTarget.previousElementSibling.value)}
            className="absolute right-1 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
          >
            발견 <ChevronRight size={12} />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 scrollbar-none">
          <span className="text-slate-400 flex items-center gap-1 shrink-0 text-[11px]">🕒 최근 본</span>
          {['#메가커피', '#삼양식품', '#아모레퍼시픽'].map((tag, idx) => (
            <button 
              key={idx} 
              onClick={() => onOpenSearch(tag.replace('#', ''))}
              className={`px-2.5 py-1 rounded-lg shrink-0 font-medium text-xs ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 실시간 급상승 소비 트렌드 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-sm font-extrabold flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span className="text-red-500">🔥</span> 실시간 급상승 소비 트렌드
          </h2>
          <span className="text-[10px] font-extrabold text-blue-600 tracking-wider">LIVE NOW</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <div className={`min-w-[220px] rounded-2xl overflow-hidden border shadow-sm shrink-0 ${cardStyle}`}>
            <div className="relative h-28 bg-slate-200">
              <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80" alt="디저트" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-md">2030 오픈런 간식 1위</span>
              <span className="absolute bottom-2 right-2 text-white text-[10px] font-bold">📈 +420%</span>
            </div>
            <div className="p-3">
              <h3 className={`font-bold text-xs line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>달콤바삭 끝판왕! 빠리바게트 초코...</h3>
              <p className="text-[11px] text-slate-400 mt-1">SNS 숏폼 타고 전국 매장 조기 품절 행진</p>
            </div>
          </div>

          <div className={`min-w-[180px] rounded-2xl overflow-hidden border shadow-sm shrink-0 ${cardStyle}`}>
            <div className="relative h-28 bg-slate-200">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80" alt="올리브영" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">세일 완판</span>
            </div>
            <div className="p-3">
              <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>올리브영</h3>
              <p className="text-[11px] text-slate-400 mt-1">실리콘투 · 코스...</p>
            </div>
          </div>
        </div>
      </div>

      {/* 내가 찜한 브랜드의 트렌드 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>내가 찜한 브랜드의 트렌드</h2>
            <p className="text-[11px] text-slate-400">소비자가 주목하는 최신 핫이슈 & 이벤트 모음</p>
          </div>
          {/* 전체보기 → 내 소비 탭으로 이동 */}
          <button onClick={() => setActiveTab('myExpense')} className="text-xs text-blue-600 font-bold flex items-center">
            전체보기<ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-2.5">
          <div className={`p-3.5 rounded-2xl border shadow-sm space-y-2.5 ${cardStyle}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white text-[9px] font-black tracking-tighter">MUSINSA</div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>무신사</span>
                  <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">빅세일</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">스프링 메가세일 최대 80% 할인</p>
              </div>
            </div>
            <div className={`p-2 rounded-xl flex items-center justify-between text-xs ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
              <div className="flex items-center gap-1 text-slate-300 truncate">
                <span className="text-pink-500">🏷️</span>
                <span className="truncate text-[11px]">무신사 스프링 메가세일 시작! 단독...</span>
              </div>
              {/* [수정] 세일 혜택 보기 → 세일 상세 페이지 */}
              <button 
                onClick={() => onOpenDetail({ type: 'sale', brand: '무신사' })}
                className="text-blue-500 font-bold shrink-0 flex items-center text-[10px]"
              >
                세일 혜택 보기 <ChevronRight size={12} />
              </button>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border shadow-sm space-y-2.5 ${cardStyle}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-800 rounded-full flex items-center justify-center text-white font-bold text-xs">☕</div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>스타벅스</span>
                  <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded">프로모션</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">프리퀀시 증정품 조기 소진 주의</p>
              </div>
            </div>
            <div className={`p-2 rounded-xl flex items-center justify-between text-xs ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
              <div className="flex items-center gap-1 text-slate-300 truncate">
                <span className="text-emerald-500">🎉</span>
                <span className="truncate text-[11px]">봄 시즌 한정 체리블라썸 음료 & MD 오픈...</span>
              </div>
              {/* [수정] 이벤트 보기 → 이벤트 상세 페이지 */}
              <button 
                onClick={() => onOpenDetail({ type: 'event', brand: '스타벅스' })}
                className="text-blue-500 font-bold shrink-0 flex items-center text-[10px]"
              >
                이벤트 보기 <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 신제품 & 소셜 핫이슈 */}
      <div className="space-y-3">
        <h2 className={`text-sm font-extrabold flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <span className="text-blue-600">⚡</span> 신제품 & 소셜 핫이슈
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {issues.map((item) => (
            <div key={item.id} className={`rounded-2xl overflow-hidden border shadow-sm flex flex-col justify-between ${cardStyle}`}>
              <div>
                <div className="h-28 bg-slate-100 relative overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 space-y-1">
                  <span className="text-[10px] font-medium text-slate-400">{item.tag}</span>
                  <h3 className={`font-bold text-xs leading-snug line-clamp-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                    <span className="flex items-center gap-0.5"><MessageSquare size={10} /> {item.commentsCount}</span>
                    <span className="flex items-center gap-0.5 text-pink-500"><Heart size={10} /> {item.likesCount}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 pt-0">
                <button 
                  onClick={() => onOpenComment(item)}
                  className="w-full text-left text-[11px] font-semibold text-slate-400 flex items-center justify-between border-t border-slate-50/10 pt-2 hover:text-blue-600"
                >
                  의견 남기기 <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   [추가] 알림 / 세일 혜택 / 이벤트 상세 페이지
   ========================================================================= */
function SubPageView({ subPage, onClose, isDarkMode }) {
  const [notifs, setNotifs] = useState([
    { id: 1, title: '무신사 스프링 메가세일 시작', desc: '찜한 브랜드의 빅세일이 열렸어요', time: '10분 전', read: false },
    { id: 2, title: '스타벅스 프리퀀시 증정품 소진 임박', desc: '조기 품절 주의', time: '1시간 전', read: false },
    { id: 3, title: '올리브영 세일 완판 소식', desc: '관련 종목 거래량이 늘고 있어요', time: '어제', read: true },
  ]);

  const benefits = {
    sale: {
      무신사: {
        badge: '빅세일',
        title: '스프링 메가세일 최대 80% 할인',
        period: '진행 중',
        items: ['신규 가입 쿠폰 최대 1만원', '브랜드별 단독 특가 및 한정 수량 혜택', '결제 수단별 추가 적립'],
      },
    },
    event: {
      스타벅스: {
        badge: '프로모션',
        title: '봄 시즌 한정 체리블라썸 음료 & MD',
        period: '진행 중',
        items: ['프리퀀시 완성 시 증정품 제공', '시즌 한정 음료 출시', '증정품 조기 소진 주의'],
      },
    },
  };

  const bg = isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800';
  const card = isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';
  const isNotif = subPage.type === 'notifications';
  const data = !isNotif ? benefits[subPage.type]?.[subPage.brand] : null;

  return (
    <div className={`min-h-screen ${bg}`}>
      <header className={`sticky top-0 z-50 px-4 py-3 flex items-center justify-between border-b ${isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-100'}`}>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1 -ml-1"><ChevronLeft size={24} /></button>
          <span className="text-lg font-bold">
            {isNotif ? '알림' : `${subPage.brand} ${subPage.type === 'sale' ? '세일 혜택' : '이벤트'}`}
          </span>
        </div>
        {isNotif && (
          <button
            onClick={() => setNotifs(notifs.map(n => ({ ...n, read: true })))}
            className="text-xs font-bold text-blue-600"
          >
            모두 읽음
          </button>
        )}
      </header>

      <div className="p-4 space-y-3">
        {isNotif && notifs.map(n => (
          <button
            key={n.id}
            onClick={() => setNotifs(notifs.map(x => x.id === n.id ? { ...x, read: true } : x))}
            className={`w-full text-left p-3.5 rounded-2xl border flex gap-3 ${card}`}
          >
            <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.read ? 'bg-transparent' : 'bg-red-500'}`} />
            <div className="flex-1">
              <p className="text-xs font-bold">{n.title}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{n.desc}</p>
              <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
            </div>
          </button>
        ))}

        {data && (
          <>
            <div className={`p-4 rounded-2xl border space-y-2 ${card}`}>
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded">{data.badge}</span>
              <h2 className="text-base font-black">{data.title}</h2>
              <p className="text-[11px] text-slate-400">기간: {data.period}</p>
            </div>
            <div className={`p-4 rounded-2xl border space-y-2.5 ${card}`}>
              <h3 className="text-sm font-extrabold">혜택 안내</h3>
              {data.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <Check size={14} className="text-blue-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button onClick={onClose} className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold py-3 rounded-xl">
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ⚠️ 이 아래에는 기존 파일에 있던 나머지 컴포넌트를 그대로 붙여넣으세요:
   CommentView, SearchView, MyExpenseView, StockTrendView, InvestmentInfoView, MyPageView */

/* =========================================================================
   2. 내 소비 - 나의 소비 관심사 분석
   ========================================================================= */
function MyExpenseView({ likedBrands, toggleLike, setLikedBrands, isDarkMode }) {
  const [newBrandInput, setNewBrandInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddBrand = () => {
    const trimmed = newBrandInput.trim();
    if (trimmed && !likedBrands.includes(trimmed)) {
      setLikedBrands([...likedBrands, trimmed]);
      setNewBrandInput('');
      setIsAdding(false);
    }
  };

  const cardStyle = isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';
  const subCardBg = isDarkMode ? 'bg-slate-700/50 border-slate-700' : 'bg-slate-50 border-slate-100';

  return (
    <div className="space-y-5">
      <div className={`py-1.5 px-3 rounded-xl flex items-center gap-2 text-[11px] font-medium ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>신한·현대카드 등 3개 카드사 및 페이 연동 완료</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>나의 소비 관심사 분석</h1>
        <div className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
          <ShoppingBag size={18} />
        </div>
      </div>

      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm space-y-4`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
            📊
          </div>
          <div>
            <h2 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>최근 한달 카테고리별 소비 분석</h2>
            <p className="text-[10px] text-slate-400">카드·페이 실결제 312건 전수 데이터 마이데이터 정밀 분석</p>
          </div>
        </div>

        <div className={`${subCardBg} p-3.5 rounded-2xl space-y-2 border`}>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">총 소비 누적액</span>
            <span className="text-pink-500 font-bold text-[11px]">↑ 직전 월 대비 +8.4%</span>
          </div>
          <p className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>1,842,000 원</p>
          <div className="flex h-2 rounded-full overflow-hidden gap-1 pt-1">
            <div className="w-[38%] bg-purple-500 rounded-full"></div>
            <div className="w-[29%] bg-pink-400 rounded-full"></div>
            <div className="w-[21%] bg-emerald-500 rounded-full"></div>
            <div className="w-[12%] bg-slate-400 rounded-full"></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 pt-1">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>식음료</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>패션·뷰티</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>리빙·편의</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>콘텐츠</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-purple-50/50 p-3 rounded-2xl border border-purple-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">F&B 소비</span>
              <span className="font-black text-purple-600 text-sm">38%</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">지출 금액</p>
              <p className="font-extrabold text-sm text-slate-900">70.1 만원</p>
            </div>
            <div className="bg-white p-2 rounded-xl text-[10px] space-y-1">
              <p className="text-slate-400">주요 이용</p>
              <p className="font-bold text-slate-800">스타벅스·배민 42건</p>
              <p className="text-slate-400 pt-1 border-t border-slate-50">최대 지출처: 스타벅스(28건)</p>
            </div>
          </div>

          <div className="bg-pink-50/50 p-3 rounded-2xl border border-pink-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full">패션/뷰티</span>
              <span className="font-black text-pink-600 text-sm">29%</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">지출 금액</p>
              <p className="font-extrabold text-sm text-slate-900">53.4 만원</p>
            </div>
            <div className="bg-white p-2 rounded-xl text-[10px] space-y-1">
              <p className="text-slate-400">주요 이용</p>
              <p className="font-bold text-slate-800">올리브영·무신사 18건</p>
              <p className="text-slate-400 pt-1 border-t border-slate-50">최대 지출처: 올리브영(12건)</p>
            </div>
          </div>

          <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">리빙/편의</span>
              <span className="font-black text-emerald-600 text-sm">21%</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">지출 금액</p>
              <p className="font-extrabold text-sm text-slate-900">38.6 만원</p>
            </div>
            <div className="bg-white p-2 rounded-xl text-[10px] space-y-1">
              <p className="text-slate-400">주요 이용</p>
              <p className="font-bold text-slate-800">다이소·GS25 29건</p>
              <p className="text-slate-400 pt-1 border-t border-slate-50">결제 빈도: 주 평균 2.4회</p>
            </div>
          </div>

          <div className="bg-slate-100/70 p-3 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">콘텐츠/여가</span>
              <span className="font-black text-slate-600 text-sm">12%</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">지출 금액</p>
              <p className="font-extrabold text-sm text-slate-900">22.1 만원</p>
            </div>
            <div className="bg-white p-2 rounded-xl text-[10px] space-y-1">
              <p className="text-slate-400">주요 이용</p>
              <p className="font-bold text-slate-800">넷플릭스·CGV 11건</p>
              <p className="text-slate-400 pt-1 border-t border-slate-50">정기 구독: 월 3.8만원</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI 결제기반 추천 */}
      <div className="bg-purple-50/60 p-4 rounded-3xl border border-purple-100 space-y-3">
        <span className="text-[10px] font-bold bg-purple-600 text-white px-2 py-0.5 rounded-full">✨ AI 결제기반 추천</span>
        <h3 className="font-bold text-sm text-slate-900">자주 결제한 브랜드, 바로 찜하고 알림 받기</h3>
        <p className="text-[11px] text-slate-500 leading-snug">결제 데이터 기반 추천 브랜드! 하트를 눌러 찜하면 주식 이슈와 혜택 알림을 실시간으로 보내드려요.</p>

        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shrink-0 space-y-2 text-center w-36 shadow-sm">
            <p className="font-bold text-xs text-slate-900">올리브영</p>
            <p className="text-[10px] text-pink-500 font-bold">최근 12회</p>
            <button 
              onClick={() => toggleLike('올리브영')}
              className={`w-full text-[11px] font-bold py-1.5 rounded-xl flex items-center justify-center gap-1 transition-colors ${
                likedBrands.includes('올리브영')
                  ? 'bg-pink-500 text-white'
                  : 'bg-blue-50 text-blue-600 border border-blue-100'
              }`}
            >
              <Heart size={12} fill={likedBrands.includes('올리브영') ? "currentColor" : "none"} />
              {likedBrands.includes('올리브영') ? '찜완료' : '찜하기'}
            </button>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-100 shrink-0 space-y-2 text-center w-36 shadow-sm">
            <p className="font-bold text-xs text-slate-900">스타벅스</p>
            <p className="text-[10px] text-blue-500 font-bold">최근 28회</p>
            <button 
              onClick={() => toggleLike('스타벅스')}
              className={`w-full text-[11px] font-bold py-1.5 rounded-xl flex items-center justify-center gap-1 transition-colors ${
                likedBrands.includes('스타벅스')
                  ? 'bg-pink-500 text-white'
                  : 'bg-blue-50 text-blue-600 border border-blue-100'
              }`}
            >
              <Heart size={12} fill={likedBrands.includes('스타벅스') ? "currentColor" : "none"} />
              {likedBrands.includes('스타벅스') ? '찜완료' : '찜하기'}
            </button>
          </div>
        </div>
      </div>

      {/* 내가 찜한 브랜드 */}
      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm space-y-3`}>
        <div className="flex justify-between items-center">
          <h3 className={`font-bold text-sm flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <Heart size={14} className="text-pink-500 fill-pink-500" /> 내가 찜한 브랜드 <span className="text-pink-500">{likedBrands.length}</span>
          </h3>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-xl ${isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            + 새 브랜드 추가
          </button>
        </div>

        {isAdding && (
          <div className="flex gap-2">
            <input 
              type="text" 
              value={newBrandInput}
              onChange={(e) => setNewBrandInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddBrand()}
              placeholder="브랜드명 입력..." 
              className={`flex-1 border-none rounded-xl py-1.5 px-3 text-xs focus:outline-none ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-100'}`}
            />
            <button onClick={handleAddBrand} className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl">추가</button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {likedBrands.map((b, i) => (
            <span key={i} className={`text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 ${isDarkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
              {b}
              <button onClick={() => toggleLike(b)} className="text-slate-400 hover:text-red-500">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xs">⚙️</div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">소비 → 주식 연결 엔진</h4>
              <p className="text-[10px] text-slate-500">내가 쓴 돈이 주주 수익으로 돌아오는 구조</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-2xl flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">💳 연동 브랜드 상장 매핑률</span>
          <span className="font-black text-blue-600 text-sm">83.3% (5/6개)</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. 주식 트렌드
   ========================================================================= */
function StockTrendView({ isDarkMode }) {
  const cardStyle = isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';
  const subCardBg = isDarkMode ? 'bg-slate-700/50 border-slate-700' : 'bg-slate-50 border-slate-100';

  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        <button className="bg-blue-700 text-white px-3.5 py-1.5 rounded-xl shrink-0">📈 전체 트렌드</button>
        <button className={`border px-3.5 py-1.5 rounded-xl shrink-0 ${isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-600 border-slate-200'}`}>🍽️ 식음료/F&B</button>
        <button className={`border px-3.5 py-1.5 rounded-xl shrink-0 ${isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-600 border-slate-200'}`}>💄 K-뷰티</button>
      </div>

      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm space-y-4`}>
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-pink-500 bg-pink-50/10 px-2 py-0.5 rounded-md">📈 소비자 버즈 급상승 1위</span>
          <span className="text-slate-400 text-[10px]">2024.11 ~ 2025.02</span>
        </div>

        <h2 className={`text-base font-black leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          품절 대란 'K-글루타치온 젤리'와 이너뷰티 급상승
        </h2>

        <div className="relative rounded-2xl overflow-hidden h-36 bg-slate-100">
          <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" alt="뷰티" className="w-full h-full object-cover" />
          <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md">
            🛡️ SNS 누적 리뷰 28만 건 돌파
          </span>
        </div>

        <div className="bg-blue-50/60 p-3.5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-blue-900">📈 소셜 미디어 버즈량 분석</span>
            <span className="text-[10px] text-slate-500">인스타·유튜브</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-blue-600">+142%</span>
            <span className="text-[11px] text-slate-500 font-medium">전분기 대비 온라인 언급 폭증</span>
          </div>
          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-[70%]"></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>기존 이너뷰티 평균 (100)</span>
            <span className="font-bold text-blue-600">현재 모멘텀 (242)</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className={`font-bold text-xs flex items-center gap-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
            <span>🔗</span> 밸류체인 연관 상장 기업 매핑
          </h3>

          <div className="space-y-1.5">
            <div className={`${subCardBg} p-2.5 rounded-xl flex items-center justify-between text-xs border`}>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[10px]">A</span>
                <div>
                  <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>에이피알 <span className="text-[10px] text-slate-400 font-normal">코스피 278470</span></p>
                  <p className="text-[10px] text-slate-400">자사몰 및 글로벌 글루타치온 라인업 공급</p>
                </div>
              </div>
              <span className="font-bold text-red-500">+4.35%</span>
            </div>

            <div className={`${subCardBg} p-2.5 rounded-xl flex items-center justify-between text-xs border`}>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-[10px]">C</span>
                <div>
                  <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>코스맥스 <span className="text-[10px] text-slate-400 font-normal">코스피 192820</span></p>
                  <p className="text-[10px] text-slate-400">이너뷰티 젤리 제형 특화 ODM 수혜</p>
                </div>
              </div>
              <span className="font-bold text-red-500">+1.82%</span>
            </div>

            <div className={`${subCardBg} p-2.5 rounded-xl flex items-center justify-between text-xs border`}>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[10px]">N</span>
                <div>
                  <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>노바렉스 <span className="text-[10px] text-slate-400 font-normal">코스닥 194700</span></p>
                  <p className="text-[10px] text-slate-400">국내 1위 건강기능식품 OEM/ODM 생산업체</p>
                </div>
              </div>
              <span className="font-bold text-red-500">+0.95%</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-2xl flex items-center justify-center gap-1">
          연관 기업 '에이피알' 투자정보 분석 보기 <ChevronRight size={14} />
        </button>
      </div>

      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm space-y-3`}>
        <h2 className={`font-bold text-sm flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <span className="text-blue-600">⚡</span> 주목할 신제품 · 원료 이슈
        </h2>
        <div className="space-y-2">
          <span className="text-[10px] text-slate-400">F&B 원료 트렌드 · 편의점 품절 지수 급증</span>
          <h3 className={`font-bold text-xs leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>저당 디저트 열풍과 대체당 원료 공급사 탐색</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            알룰로스·에리스트리톨 기반 무설탕 베이커리와 음료 매출이 전년 대비 185% 폭증하며, 대형 식품 제조사향 원료 공급 독점 기업들의 실적 재평가가 가속화되고 있습니다.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className={`${subCardBg} p-2 rounded-xl text-[10px] border`}>
              <span className="text-slate-400">대체당 원료 핵심사</span>
              <p className={`font-bold mt-0.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>삼양사 (상장)</p>
              <p className="text-emerald-500 font-semibold">알룰로스 대량 생산 체제</p>
            </div>
            <div className={`${subCardBg} p-2 rounded-xl text-[10px] border`}>
              <span className="text-slate-400">저당 완제품 유통사</span>
              <p className={`font-bold mt-0.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>CJ제일제당 (상장)</p>
              <p className="text-blue-500 font-semibold">B2B 원료 및 글로벌 수출</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. 투자 정보 - 에이피알(APR)
   ========================================================================= */
function InvestmentInfoView({ isDarkMode }) {
  const cardStyle = isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';
  const subCardBg = isDarkMode ? 'bg-slate-700/50 border-slate-700' : 'bg-slate-50 border-slate-100';

  return (
    <div className="space-y-5">
      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm space-y-3`}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>KOSPI 상장</span>
              <span className="text-[10px] text-slate-400">278470</span>
            </div>
            <h1 className={`text-xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>에이피알 (APR)</h1>
          </div>
          <button className={`p-2 rounded-xl ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
            <Bookmark size={18} />
          </button>
        </div>

        <div className="bg-pink-50/60 p-3 rounded-2xl flex items-center gap-2 text-xs text-slate-700">
          <span className="text-pink-500 text-base">🌷</span>
          <span>우리가 쓰는 뷰티 디바이스 <strong>'메디큐브'</strong>와 뷰티 브랜드를 운영하는 기업이에요.</span>
        </div>

        {/* 주가 그래프 정보 */}
        <div className="pt-2 space-y-1">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>현재 주가</span>
            <span>2026.10.28 장마감 기준</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>52,400 원</span>
            <span className="text-xs font-bold text-pink-500">▲ +2.1%</span>
          </div>

          <div className={`relative h-20 rounded-2xl border overflow-hidden p-2 flex flex-col justify-between ${isDarkMode ? 'bg-pink-950/20 border-pink-900/50' : 'bg-gradient-to-b from-pink-50/80 to-pink-100/30 border-pink-100'}`}>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium z-10">
              <span>최근 주가 추세</span>
              <span>최근 1개월</span>
            </div>

            <svg className="absolute bottom-0 left-0 w-full h-12" viewBox="0 0 300 50" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 35 Q 75 40 150 25 T 300 10 L 300 50 L 0 50 Z" fill="url(#pinkGradient)" />
              <path d="M 0 35 Q 75 40 150 25 T 300 10" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* AI 3줄 요약 브리프 */}
      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm space-y-3`}>
        <h2 className={`font-bold text-sm flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <Sparkles size={16} className="text-blue-600" /> AI 3줄 요약 브리프
        </h2>

        <div className="space-y-2 text-xs">
          <div className={`${subCardBg} p-2.5 rounded-xl flex gap-2 border`}>
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
            <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>2030 소비자 중심의 <strong className="text-blue-500">홈 뷰티기기 수요 급증세</strong> 지속</span>
          </div>

          <div className={`${subCardBg} p-2.5 rounded-xl flex gap-2 border`}>
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
            <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>미국 및 일본 수출액 중심 글로벌 채널의 비약적 신장</span>
          </div>

          <div className={`${subCardBg} p-2.5 rounded-xl flex gap-2 border`}>
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
            <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>브랜드 확장에 따른 최근 마케팅비 지출 관리 여부가 핵심 관건</span>
          </div>
        </div>

        <div className="bg-emerald-50/60 p-3 rounded-2xl space-y-1.5 text-xs">
          <p className="font-bold text-emerald-900 flex items-center gap-1">
            <span>🔄</span> 소비 트렌드 ⇄ 기업 실적 분석
          </p>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            올리브영 및 온라인 결제 데이터 급증이 뷰티 디바이스 실매출과 <strong className="text-emerald-700">매우 높은 양의 상관관계</strong>를 형성하고 있습니다.
          </p>
        </div>
      </div>

      {/* 한눈에 보는 핵심 실적 */}
      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm space-y-3`}>
        <div className="flex justify-between items-center">
          <h2 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>한눈에 보는 핵심 실적</h2>
          <span className="text-[10px] text-slate-400">연간 기준 (YoY)</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className={`${subCardBg} p-3 rounded-2xl space-y-1 border`}>
            <p className="text-[10px] text-slate-400">연간 매출액</p>
            <p className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>5,230억</p>
            <p className="text-[10px] font-bold text-pink-500">📈 +32% YoY</p>
          </div>

          <div className={`${subCardBg} p-3 rounded-2xl space-y-1 border`}>
            <p className="text-[10px] text-slate-400">영업이익 (이익률)</p>
            <p className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>1,040억</p>
            <p className="text-[10px] font-bold text-emerald-500">⊕ 이익률 19.8%</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md">
        00증권에서 상세보기 <ArrowUpRight size={16} />
      </button>
    </div>
  );
}

/* =========================================================================
   5. 마이페이지
   ========================================================================= */
function MyPageView({ likedBrands, setLikedBrands, isDarkMode, setIsDarkMode }) {
  const [switches, setSwitches] = useState({ newProd: true, earnings: true, report: true });

  const cardStyle = isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';
  const subCardBg = isDarkMode ? 'bg-slate-700/50 border-slate-700' : 'bg-slate-50 border-slate-100';

  return (
    <div className="space-y-5">
      {/* 프로필 카드 */}
      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm flex items-center gap-3`}>
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg">
          <User size={24} />
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className={`font-black text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>백보경님</h2>
            <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-0.5 rounded-full">🌷트렌드 탐험가 Lv.2</span>
          </div>
          <p className="text-[11px] text-slate-400">초보 투자자 2개월차</p>
          <div className="w-full bg-slate-100/20 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-blue-600 h-full w-[40%]"></div>
          </div>
        </div>
      </div>

      {/* 💳 카드 정보 등록/수정 배너 */}
      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm space-y-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs">
              💳
            </div>
            <div>
              <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>내 결제 카드 관리</h3>
              <p className="text-[10px] text-slate-400">소비 분석에 사용될 카드를 등록/수정하세요</p>
            </div>
          </div>
          <button 
            onClick={() => alert('카드 등록/수정 모달이 열립니다.')}
            className="text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors shrink-0"
          >
            카드 수정 &gt;
          </button>
        </div>

        {/* 등록된 대표 카드 정보 */}
        <div className={`${subCardBg} p-3 rounded-2xl flex items-center justify-between border`}>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded">신한</span>
            <div className="text-xs">
              <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Deep Dream 체크카드</p>
              <p className="text-[10px] text-slate-400">**** **** **** 1024</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            연동 완료
          </span>
        </div>
      </div>

      {/* 🌙 화면 테마 설정 (다크 모드 스위치) */}
      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm transition-colors`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm ${isDarkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-50 text-purple-600'}`}>
              {isDarkMode ? '🌙' : '☀️'}
            </div>
            <div>
              <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>화면 테마 설정</h3>
              <p className="text-[10px] text-slate-400">눈이 편안한 {isDarkMode ? '다크 모드' : '라이트 모드'} 사용 중</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${isDarkMode ? 'bg-purple-600 justify-end' : 'bg-slate-200 justify-start'}`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md transition-transform"></div>
          </button>
        </div>
      </div>

      {/* 내가 찜한 서랍 */}
      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm space-y-3`}>
        <div className="flex justify-between items-center">
          <h3 className={`font-bold text-sm flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span>💟</span> 내가 찜한 서랍
          </h3>
          <span className="text-[11px] text-slate-400">편집 &gt;</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {likedBrands.map((item, idx) => (
            <div key={idx} className={`${subCardBg} p-2.5 rounded-2xl flex items-center justify-between text-xs border`}>
              <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{item}</span>
              <X size={12} className="text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => setLikedBrands(likedBrands.filter(b => b !== item))} />
            </div>
          ))}
        </div>
      </div>

      {/* 트렌드 맞춤 알림 설정 */}
      <div className={`${cardStyle} p-4 rounded-3xl border shadow-sm space-y-3`}>
        <h3 className={`font-bold text-sm flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <span>🔔</span> 트렌드 맞춤 알림 설정
        </h3>

        <div className="space-y-3 divide-y divide-slate-50/10">
          <div className="pt-2 flex items-center justify-between">
            <div>
              <p className={`font-bold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>내 관심 브랜드 신제품 & 품절 대란 알림</p>
              <p className="text-[10px] text-slate-400">실시간 SNS 바이럴 및 팝업 스토어 오픈 소식</p>
            </div>
            <button 
              onClick={() => setSwitches({...switches, newProd: !switches.newProd})}
              className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${switches.newProd ? 'bg-blue-600 justify-end' : 'bg-slate-200 justify-start'}`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <p className={`font-bold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>관심 브랜드 연관 기업 실적 발표 알림</p>
              <p className="text-[10px] text-slate-400">소비 트렌드가 실적 공시로 연결되는 분기 모멘텀</p>
            </div>
            <button 
              onClick={() => setSwitches({...switches, earnings: !switches.earnings})}
              className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${switches.earnings ? 'bg-blue-600 justify-end' : 'bg-slate-200 justify-start'}`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. 검색 뷰
   ========================================================================= */
function SearchView({ searchQuery, setSearchQuery, onClose, isDarkMode }) {
  const [localInput, setLocalInput] = useState(searchQuery);
  const [recentSearches, setRecentSearches] = useState(['메가커피', '삼양식품', '아모레퍼시픽', '다이소']);

  const handleSearch = (term) => {
    const targetTerm = term !== undefined ? term : localInput;
    const trimmed = targetTerm.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed);
    setLocalInput(trimmed);

    if (!recentSearches.includes(trimmed)) {
      setRecentSearches([trimmed, ...recentSearches.slice(0, 4)]);
    }
  };

  const handleRemoveRecent = (e, tag) => {
    e.stopPropagation();
    setRecentSearches(recentSearches.filter(t => t !== tag));
  };

  const cardStyle = isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';

  return (
    <div className={`min-h-screen p-4 space-y-4 z-50 relative ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      <div className="flex items-center gap-2">
        <button onClick={onClose} className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-200 text-slate-700'}`}>
          <ChevronLeft size={24} />
        </button>
        <div className="relative flex-1 flex items-center">
          <Search size={16} className="absolute left-3.5 text-slate-400" />
          <input 
            type="text" 
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..." 
            className={`w-full border border-blue-500 rounded-xl py-2.5 pl-9 pr-16 text-xs focus:outline-none shadow-sm ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}
            autoFocus
          />
          <button 
            onClick={() => handleSearch()}
            className="absolute right-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg"
          >
            검색
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>최근 검색어</span>
          {recentSearches.length > 0 && (
            <button onClick={() => setRecentSearches([])} className="text-[10px] text-slate-400 hover:text-slate-600">
              전체 삭제
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {recentSearches.map((tag, idx) => (
            <span 
              key={idx}
              onClick={() => handleSearch(tag)}
              className={`border text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              #{tag}
              <X size={12} className="text-slate-400 hover:text-red-500" onClick={(e) => handleRemoveRecent(e, tag)} />
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h3 className={`font-bold text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
          "{searchQuery || localInput}" 연관 추천 결과
        </h3>
        <div className="space-y-2">
          <div className={`${cardStyle} p-3.5 rounded-2xl border shadow-sm flex items-center justify-between`}>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">소비 트렌드</span>
              <p className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{searchQuery || localInput || '인기 브랜드'} 관련 오픈런 & 품절 이슈</p>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   7. 트렌드 의견 나누기 뷰
   ========================================================================= */
function CommentView({ issue, onClose, isDarkMode }) {
  const [selectedFeeling, setSelectedFeeling] = useState('기대돼요');
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('idle');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('input_db')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const dbComments = data.map(item => {
          let feeling = '🔥 기대돼요';
          let text = item.input || '';

          if (text.startsWith('[')) {
            const closingIdx = text.indexOf(']');
            if (closingIdx !== -1) {
              const feelingKey = text.substring(1, closingIdx);
              text = text.substring(closingIdx + 1).trim();
              if (feelingKey === '이미 샀어요') feeling = '🛒 이미 샀어요';
              else if (feelingKey === '글쎄요') feeling = '🤔 글쎄요';
            }
          }

          return {
            id: item.id,
            user: '백보경 님',
            level: 'Lv.2',
            time: '작성됨',
            feeling: feeling,
            text: text
          };
        });

        setComments(dbComments);
      } else {
        setComments([
          {
            id: 'mock-1',
            user: '민트초코 님',
            level: 'Lv.2',
            time: '11분 전',
            feeling: '🔥 기대돼요',
            text: '저 여기 주말에 2시간 웨이팅해서 먹었는데 진짜 대박이에요... 주식 사야하나 고민됨'
          },
          {
            id: 'mock-2',
            user: '초보자 님',
            level: 'Lv.1',
            time: '30분 전',
            feeling: '🤔 글쎄요',
            text: '요즘 콜라보가 너무 많아서 금방 식지 않을까 걱정되네요.'
          }
        ]);
      }
    } catch (err) {
      console.error('댓글 불러오기 오류:', err.message);
    }
  };

  const handleSubmit = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || status === 'saving') return;

    setStatus('saving');

    try {
      const fullContent = `[${selectedFeeling}] ${trimmed}`;
      const { data, error } = await supabase
        .from('input_db')
        .insert({ input: fullContent })
        .select();

      if (error) throw error;

      const insertedItem = data?.[0];

      const newComment = {
        id: insertedItem ? insertedItem.id : Date.now(),
        user: '백보경 님',
        level: 'Lv.2',
        time: '방금 전',
        feeling: selectedFeeling === '기대돼요' ? '🔥 기대돼요' : selectedFeeling === '이미 샀어요' ? '🛒 이미 샀어요' : '🤔 글쎄요',
        text: trimmed
      };

      setComments([newComment, ...comments]);
      setInputText('');
      setStatus('saved');
    } catch (err) {
      console.error('의견 저장 에러:', err.message);
    } finally {
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  const handleDelete = async (id) => {
    if (typeof id === 'string' && id.startsWith('mock-')) {
      setComments(comments.filter(c => c.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('input_db')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setComments(comments.filter(c => c.id !== id));
    } catch (err) {
      console.error('댓글 삭제 에러:', err.message);
    }
  };

  const cardStyle = isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';

  return (
    <div className={`min-h-screen flex flex-col justify-between relative animate-fadeIn pb-24 z-50 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`sticky top-0 backdrop-blur-md z-40 px-4 py-3 flex items-center justify-between border-b ${isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-100'}`}>
        <button onClick={onClose} className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-700'}`}>
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-sm font-bold">트렌드 의견 나누기</h1>
        <button onClick={onClose} className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-700'}`}>
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className={`${cardStyle} p-3.5 rounded-2xl border shadow-sm flex items-center gap-3`}>
          <img src={issue?.img} alt={issue?.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">#{issue?.tag}</span>
            <h2 className={`font-bold text-xs leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{issue?.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-100 flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1">🔥 기대돼요</span>
            <span className="text-sm font-black text-blue-600">74%</span>
          </div>
          <div className="bg-purple-50/80 p-3 rounded-2xl border border-purple-100 flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900 flex items-center gap-1">🤔 글쎄요</span>
            <span className="text-sm font-black text-purple-600">26%</span>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          <h3 className="font-bold text-xs">실시간 의견 피드 ({comments.length})</h3>

          {comments.map((c) => (
            <div key={c.id} className={`${cardStyle} p-3 rounded-2xl border shadow-sm space-y-1.5 relative group`}>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                    {c.user[0]}
                  </div>
                  <div>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{c.user}</span>
                    <span className="text-[9px] text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded ml-1.5">{c.level}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                  <button onClick={() => handleDelete(c.id)} className="text-slate-300 hover:text-red-500 p-1">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <span className="inline-block text-[9px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                {c.feeling}
              </span>

              <p className={`text-xs leading-relaxed pr-6 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t p-3 space-y-2 z-50 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex gap-1.5">
          {[
            { id: '기대돼요', label: '🔥 기대돼요' },
            { id: '이미 샀어요', label: '🛒 이미 샀어요' },
            { id: '글쎄요', label: '🤔 글쎄요' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFeeling(f.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                selectedFeeling === f.id
                  ? 'bg-blue-600 text-white'
                  : isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="이 이슈에 대한 의견을 남겨주세요..."
            className={`flex-1 border rounded-xl py-2 px-3 text-xs focus:outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-200'}`}
          />
          <button
            onClick={handleSubmit}
            disabled={status === 'saving'}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shrink-0"
          >
            {status === 'saving' ? '저장중' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
}