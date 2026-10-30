import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js'; // Supabase 패키지
import { 
  Search, Bell, User, ShoppingBag, TrendingUp, Sparkles, 
  ChevronRight, Heart, Bookmark, ArrowUpRight, MessageSquare,
  Home, CreditCard, LineChart, PieChart, Check, X,
  Shield, Settings, Clock, ChevronLeft, Lock
} from 'lucide-react';

// 💡 본인의 Supabase URL과 Anon Key를 여기에 입력하세요
const SUPABASE_URL = "https://fzgjbqlvnmenmkoloxhn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6EC5-VTJtf_Kr2-5_-2QOA_9UQSTtvc";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  // 탭 상태: 'home', 'myExpense', 'stockTrend', 'investmentInfo', 'myPage'
  const [activeTab, setActiveTab] = useState('home');

  // 검색 모달/페이지 관련 상태
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 찜한 브랜드 목록
  const [likedBrands, setLikedBrands] = useState(['스타벅스', '나이키', '올리브영', '무신사']);

  const toggleLike = (brandName) => {
    if (likedBrands.includes(brandName)) {
      setLikedBrands(likedBrands.filter(b => b !== brandName));
    } else {
      setLikedBrands([...likedBrands, brandName]);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-20 font-sans text-slate-800 relative shadow-xl">
      {/* 검색 화면이 켜졌을 때 검색 전용 페이지 표시 */}
      {isSearchOpen ? (
        <SearchView 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => setIsSearchOpen(false)}
          setActiveTab={setActiveTab}
        />
      ) : (
        <>
          {/* GNB Header */}
          <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 px-4 py-3 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              {activeTab === 'myPage' ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveTab('home')} className="p-1 -ml-1 text-slate-700">
                    <ChevronLeft size={24} />
                  </button>
                  <span className="text-lg font-bold text-slate-900">My Page</span>
                </div>
              ) : (
                <>
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-blue-600 font-semibold block leading-none">00증권</span>
                    <span className="text-base font-bold text-slate-900 leading-none">TrendFolio</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              {activeTab !== 'myPage' && (
                <>
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-full"
                  >
                    <Search size={22} />
                  </button>
                  <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-full relative">
                    <Bell size={22} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                </>
              )}
              <button 
                onClick={() => setActiveTab('myPage')}
                className={`p-1.5 rounded-full transition-colors ${activeTab === 'myPage' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                <User size={20} />
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-4 space-y-6">
            {activeTab === 'home' && (
              <HomeView 
                setActiveTab={setActiveTab} 
                likedBrands={likedBrands} 
                toggleLike={toggleLike}
                onOpenSearch={(query = '') => {
                  setSearchQuery(query);
                  setIsSearchOpen(true);
                }}
              />
            )}
            {activeTab === 'myExpense' && (
              <MyExpenseView likedBrands={likedBrands} toggleLike={toggleLike} />
            )}
            {activeTab === 'stockTrend' && (
              <StockTrendView setActiveTab={setActiveTab} />
            )}
            {activeTab === 'investmentInfo' && (
              <InvestmentInfoView />
            )}
            {activeTab === 'myPage' && (
              <MyPageView likedBrands={likedBrands} setLikedBrands={setLikedBrands} />
            )}
          </main>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center z-50">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
            >
              <Home size={22} />
              <span className="text-xs">홈</span>
            </button>
            <button 
              onClick={() => setActiveTab('myExpense')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'myExpense' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
            >
              <CreditCard size={22} />
              <span className="text-xs">내 소비</span>
            </button>
            <button 
              onClick={() => setActiveTab('stockTrend')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'stockTrend' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
            >
              <LineChart size={22} />
              <span className="text-xs">주식 트렌드</span>
            </button>
            <button 
              onClick={() => setActiveTab('investmentInfo')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'investmentInfo' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}
            >
              <PieChart size={22} />
              <span className="text-xs">투자정보</span>
            </button>
          </nav>
        </>
      )}
    </div>
  );
}

/* =========================================================================
   1. 홈 뷰 (이미지 6 기준)
   ========================================================================= */
function HomeView({ setActiveTab, likedBrands, toggleLike, onOpenSearch }) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-pink-500 tracking-wider">LIFESTYLE TO WEALTH</span>
            <h1 className="text-2xl font-black text-slate-900 mt-0.5">
              요즘 다들 <span className="text-blue-600">뭐 사지 ?</span>
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-1">실시간 소비 레이더</p>
          </div>
          <div className="p-3 bg-slate-100 rounded-full text-slate-700">
            <ShoppingBag size={24} />
          </div>
        </div>

        {/* 검색창 */}
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-20 text-sm focus:outline-none focus:border-blue-500 shadow-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onOpenSearch(e.target.value);
              }
            }}
          />
          <button 
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling;
              onOpenSearch(input.value);
            }}
            className="absolute right-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1 transition-colors"
          >
            검색
          </button>
        </div>

        {/* 최근 본 키워드 */}
        <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1 scrollbar-none">
          <span className="text-slate-400 flex items-center gap-1 shrink-0">
            <span className="text-[10px]">🕒</span> 최근 본
          </span>
          {['#메가커피', '#삼양식품', '#아모레퍼시픽'].map((tag, idx) => (
            <button 
              key={idx} 
              onClick={() => onOpenSearch(tag.replace('#', ''))}
              className="bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full shrink-0 font-medium hover:bg-slate-50"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <span className="text-red-500">🔥</span> 실시간 급상승 소비 트렌드
          </h2>
          <span className="text-[11px] font-extrabold text-blue-600 tracking-wider">LIVE NOW</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <div className="min-w-[240px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
            <div className="relative h-32 bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80" 
                alt="디저트" 
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                2030 오픈런 간식 1위
              </span>
              <span className="absolute bottom-2 right-2 bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md flex items-center">
                ↗ +420%
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm text-slate-900 line-clamp-1">달콤바삭 끝판왕! 빠리바게트 초코...</h3>
              <p className="text-xs text-slate-500 mt-1">SNS 숏폼 타고 전국 매장 조기 품절 행진</p>
            </div>
          </div>

          <div className="min-w-[200px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
            <div className="relative h-32 bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80" 
                alt="올리브영" 
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                세일 완판
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm text-slate-900">올리브영</h3>
              <p className="text-xs text-slate-500 mt-1">실리콘투 · 코스...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">내가 찜한 브랜드의 트렌드</h2>
            <p className="text-xs text-slate-500">소비자가 주목하는 최신 핫이슈 & 이벤트 모음</p>
          </div>
          <button 
            onClick={() => setActiveTab('myExpense')}
            className="text-xs text-blue-600 font-semibold flex items-center"
          >
            전체보기 <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white text-[10px] font-extrabold tracking-tighter">
                MUSINSA
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">무신사</span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">빅세일</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">스프링 메가세일 최대 80% 할인</p>
              </div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 truncate">
                <span className="text-pink-500">🏷️</span>
                <span className="truncate">무신사 스프링 메가세일 시작! 단독...</span>
              </div>
              <button className="text-blue-600 font-bold shrink-0 flex items-center text-[11px]">
                세일 혜택 보기 <ChevronRight size={12} />
              </button>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xs">
                ☕
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">스타벅스</span>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded">프로모션</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">프리퀀시 증정품 조기 소진 주의</p>
              </div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 truncate">
                <span className="text-emerald-600">🎉</span>
                <span className="truncate">봄 시즌 한정 체리블라썸 음료 & MD 오픈...</span>
              </div>
              <button className="text-blue-600 font-bold shrink-0 flex items-center text-[11px]">
                이벤트 보기 <ChevronRight size={12} />
              </button>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lime-500 rounded-xl flex items-center justify-center text-white font-black text-xs">
                OLIVE
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">올리브영</span>
                  <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-1.5 py-0.5 rounded">NEW 브랜드</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">해외 더마 브랜드 국내 1호 단독 론칭</p>
              </div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 truncate">
                <span className="text-blue-500">🛡️</span>
                <span className="truncate">화제의 해외 더마 브랜드 단독 론칭...</span>
              </div>
              <button className="text-blue-600 font-bold shrink-0 flex items-center text-[11px]">
                입점 브랜드 보기 <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <span className="text-blue-600">⚡</span> 신제품 & 소셜 핫이슈
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="h-28 bg-slate-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" 
                  alt="베이커리" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 space-y-1.5">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">베이커리 협업</span>
                <h3 className="font-bold text-xs text-slate-900 leading-snug">런던베이글뮤지엄 제휴 콜라보 대흥행</h3>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-0.5"><MessageSquare size={12} /> 128</span>
                  <span className="flex items-center gap-0.5 text-pink-500"><Heart size={12} /> 342</span>
                </div>
              </div>
            </div>
            <div className="p-3 pt-0">
              <button className="w-full text-left text-xs font-semibold text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
                의견 남기기 <ChevronRight size={12} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="h-28 bg-purple-50 relative overflow-hidden flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" 
                  alt="뷰티 앰플" 
                  className="w-full h-full object-cover z-10 relative"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="text-2xl absolute z-0">✨</span>
              </div>
              <div className="p-3 space-y-1.5">
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">가성비 뷰티</span>
                <h3 className="font-bold text-xs text-slate-900 leading-snug">다이소 5천원 뷰티 앰플 품절 대란</h3>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-0.5"><MessageSquare size={12} /> 96</span>
                  <span className="flex items-center gap-0.5 text-pink-500"><Heart size={12} /> 512</span>
                </div>
              </div>
            </div>
            <div className="p-3 pt-0">
              <button className="w-full text-left text-xs font-semibold text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
                의견 남기기 <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. 내 소비 뷰 (이미지 4 기준)
   ========================================================================= */
function MyExpenseView({ likedBrands, toggleLike }) {
  const recommendedBrands = [
    { name: '올리브영', count: '최근 12회', sub: 'CJ / K-뷰티 유통' },
    { name: '스타벅스', count: '최근 28회', sub: '이마트 / SBUX' },
    { name: '무신사', count: '최근 8회', sub: 'K-패션 플랫폼' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-100 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs text-slate-600 font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>신한·현대카드 등 3개 카드사 및 페이 연동 완료</span>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900">나의 소비 관심사 분석</h1>
        <button className="p-2 bg-slate-100 rounded-full text-slate-700">
          <ShoppingBag size={20} />
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
            <PieChart size={18} />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900">최근 한달 카테고리별 소비 분석</h2>
            <p className="text-[11px] text-slate-400">카드·페이 실결제 312건 전수 데이터 마이데이터 정밀 분석</p>
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">총 소비 누적액</span>
            <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-md text-[11px]">
              ↑ 직전 월 대비 +8.4%
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">1,842,000<span className="text-base font-normal">원</span></p>
        </div>

        <div className="space-y-2">
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-purple-500 w-[38%]"></div>
            <div className="h-full bg-pink-400 w-[29%]"></div>
            <div className="h-full bg-emerald-500 w-[21%]"></div>
            <div className="h-full bg-slate-400 w-[12%]"></div>
          </div>
          <div className="grid grid-cols-4 gap-1 text-[11px] text-center text-slate-500 font-medium">
            <span className="flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span> 식음료
            </span>
            <span className="flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-pink-400 inline-block"></span> 패션·뷰티
            </span>
            <span className="flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> 리빙·편의
            </span>
            <span className="flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-400 inline-block"></span> 콘텐츠
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-50/80 p-3.5 rounded-xl space-y-2 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span> F&B 소비
              </span>
              <span className="text-sm font-black text-purple-600">38%</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">지출 금액</span>
              <span className="text-base font-bold text-slate-900">70.1<span className="text-xs font-normal">만원</span></span>
            </div>
            <div className="bg-white p-2 rounded-lg text-[11px] space-y-1">
              <div className="text-slate-500">주요 이용: <span className="font-bold text-slate-800">스타벅스·배민 42건</span></div>
              <div className="text-slate-400 text-[10px]">최대 지출처: 스타벅스 (28건)</div>
            </div>
          </div>

          <div className="bg-slate-50/80 p-3.5 rounded-xl space-y-2 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-pink-400"></span> 패션/뷰티
              </span>
              <span className="text-sm font-black text-pink-500">29%</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">지출 금액</span>
              <span className="text-base font-bold text-slate-900">53.4<span className="text-xs font-normal">만원</span></span>
            </div>
            <div className="bg-white p-2 rounded-lg text-[11px] space-y-1">
              <div className="text-slate-500">주요 이용: <span className="font-bold text-slate-800">올리브영·무신사 18건</span></div>
              <div className="text-slate-400 text-[10px]">최대 지출처: 올리브영 (12건)</div>
            </div>
          </div>

          <div className="bg-slate-50/80 p-3.5 rounded-xl space-y-2 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 리빙/편의
              </span>
              <span className="text-sm font-black text-emerald-600">21%</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">지출 금액</span>
              <span className="text-base font-bold text-slate-900">38.6<span className="text-xs font-normal">만원</span></span>
            </div>
            <div className="bg-white p-2 rounded-lg text-[11px] space-y-1">
              <div className="text-slate-500">주요 이용: <span className="font-bold text-slate-800">다이소·GS25 29건</span></div>
              <div className="text-slate-400 text-[10px]">결제 빈도: 주 평균 2.4회</div>
            </div>
          </div>

          <div className="bg-slate-50/80 p-3.5 rounded-xl space-y-2 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span> 콘텐츠/여가
              </span>
              <span className="text-sm font-black text-slate-700">12%</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">지출 금액</span>
              <span className="text-base font-bold text-slate-900">22.1<span className="text-xs font-normal">만원</span></span>
            </div>
            <div className="bg-white p-2 rounded-lg text-[11px] space-y-1">
              <div className="text-slate-500">주요 이용: <span className="font-bold text-slate-800">넷플릭스·CGV 11건</span></div>
              <div className="text-slate-400 text-[10px]">정기 구독: 월 3.8만원</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 space-y-3">
        <div>
          <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
            <Sparkles size={10} /> AI 결제기반 추천
          </span>
          <h3 className="font-bold text-sm text-slate-900 mt-1.5">자주 결제한 브랜드, 바로 찜하고 알림 받기</h3>
          <p className="text-xs text-slate-500">결제 데이터 기반 추천 브랜드! 하트를 눌러 찜하면 주식 이슈와 혜택 알림을 실시간으로 보내드려요.</p>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {recommendedBrands.map((brand, idx) => {
            const isLiked = likedBrands.includes(brand.name);
            return (
              <div key={idx} className="min-w-[130px] bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between shrink-0 space-y-2">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-slate-900">{brand.name}</span>
                    <span className="text-[9px] text-pink-500 bg-pink-50 font-semibold px-1 rounded">{brand.count}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{brand.sub}</p>
                </div>
                <button 
                  onClick={() => toggleLike(brand.name)}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors ${
                    isLiked 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  <Heart size={12} className={isLiked ? 'fill-white' : ''} />
                  {isLiked ? '찜완료' : '찜하기'}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 text-center pt-1">
          🔗 찜한 브랜드는 3페이지 투자정보와 연동됩니다
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Heart size={16} className="text-pink-500 fill-pink-500" /> 
            내가 찜한 브랜드 <span className="text-pink-500 font-extrabold">{likedBrands.length}</span>
          </h3>
          <button className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-lg">
            + 새 브랜드 추가
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {likedBrands.map((brand, idx) => (
            <span 
              key={idx} 
              className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
            >
              <span>{brand === '스타벅스' ? '☕' : brand === '나이키' ? '👟' : brand === '올리브영' ? '✨' : '👕'}</span>
              <span>{brand}</span>
              <button onClick={() => toggleLike(brand)} className="text-slate-400 hover:text-slate-600">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl text-white space-y-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
            <TrendingUp size={18} />
          </div>
          <div>
            <h4 className="font-bold text-xs text-blue-100">소비 → 주식 연결 엔진</h4>
            <p className="text-[11px] text-blue-200">내가 쓴 돈이 주주 수익으로 돌아오는 구조</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl flex justify-between items-center border border-white/10">
          <span className="text-xs font-medium flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-white text-blue-600 rounded flex items-center justify-center text-[10px] font-bold">💳</span>
            연동 브랜드 상장 매핑률
          </span>
          <span className="text-base font-black text-white">83.3% <span className="text-xs font-normal text-blue-200">(5/6개)</span></span>
        </div>

        <p className="text-[10px] text-blue-200 pt-0.5">
          등록된 6개 브랜드 중 5개 브랜드의 지주사 및 주요 OEM 납품사가 국내외 증시에 상장되어 있습니다.
        </p>
      </div>
    </div>
  );
}

/* =========================================================================
   3. 주식 트렌드 뷰 (이미지 5 기준)
   ========================================================================= */
function StockTrendView({ setActiveTab }) {
  const [selectedCategory, setSelectedCategory] = useState('전체 트렌드');
  const categories = ['전체 트렌드', '식음료/F&B', 'K-뷰티', 'IT/플랫폼'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat === '식음료/F&B' && '🍴 '}
            {cat === 'K-뷰티' && '💄 '}
            {cat === 'IT/플랫폼' && '💻 '}
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="bg-pink-50 text-pink-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <span>📈</span> 소비자 버즈 급상승 1위
          </span>
          <span className="text-[11px] text-slate-400 font-medium">2024.11 ~ 2025.02</span>
        </div>

        <h1 className="text-lg font-bold text-slate-900 leading-snug">
          품절 대란 'K-글루타치온 젤리'와 이너뷰티 급상승
        </h1>

        <div className="relative rounded-xl overflow-hidden h-40 bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" 
            alt="글루타치온 젤리" 
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
            <span>🛡️</span> SNS 누적 리뷰 28만 건 돌파
          </span>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>📈</span> 소셜 미디어 버즈량 분석
            </span>
            <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
              인스타·유튜브
            </span>
          </div>

          <p className="text-xl font-black text-blue-600">
            +142% <span className="text-xs font-bold text-slate-700">전분기 대비 온라인 언급 폭증</span>
          </p>

          <div className="space-y-1">
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div className="h-full bg-slate-400 w-[35%]"></div>
              <div className="h-full bg-blue-600 w-[65%]"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>기존 이너뷰티 평균 (100)</span>
              <span className="text-blue-600 font-bold">현재 모멘텀 (242)</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 flex items-start gap-1 pt-1 leading-tight">
            <span>ⓘ</span> 온라인 언급량 증가는 소비자 관심도 지표이며, 실제 기업 매출 및 주가 상승을 보장하지 않습니다.
          </p>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <span className="text-emerald-600">🧩</span> 밸류체인 연관 상장 기업 매핑
          </div>

          <div className="space-y-2">
            <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                  A
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">에이피알</span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 font-semibold px-1 rounded">코스피 278470</span>
                  </div>
                  <p className="text-[10px] text-slate-400">자사몰 및 글로벌 글루타치온 라인업 공급</p>
                </div>
              </div>
              <span className="text-xs font-bold text-red-500">+4.35%</span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-xs">
                  C
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">코스맥스</span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 font-semibold px-1 rounded">코스피 192820</span>
                  </div>
                  <p className="text-[10px] text-slate-400">이너뷰티 젤리 제형 특화 ODM 수혜</p>
                </div>
              </div>
              <span className="text-xs font-bold text-red-500">+1.82%</span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  N
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">노바렉스</span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 font-semibold px-1 rounded">코스닥 194700</span>
                  </div>
                  <p className="text-[10px] text-slate-400">국내 1위 건강기능식품 OEM/ODM 생산업체</p>
                </div>
              </div>
              <span className="text-xs font-bold text-red-500">+0.95%</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('investmentInfo')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          연관 기업 '에이피알' 투자정보 분석 보기 <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <span>⚡</span> 주목할 신제품 · 원료 이슈
        </h2>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">F&B 원료 트렌드</span>
            <span className="text-slate-400">편의점 품절 지수 급증</span>
          </div>

          <h3 className="font-bold text-sm text-slate-900">
            저당 디저트 열풍과 대체당 원료 공급사 탐색
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed">
            알룰로스·에리스리톨 기반 무설탕 베이커리와 음료 매출이 전년 대비 185% 폭증하며, 대형 식품 제조사향 원료 공급 독점 기업들의 실적 재평가가 가속화되고 있습니다.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-blue-50/70 p-2.5 rounded-xl border border-blue-100">
              <span className="text-[10px] text-slate-400 block">대체당 원료 핵심사</span>
              <span className="font-bold text-xs text-slate-900 block mt-0.5">삼양사 (상장)</span>
              <span className="text-[10px] text-blue-600 font-semibold mt-1 block">알룰로스 대량 생산 체제</span>
            </div>

            <div className="bg-blue-50/70 p-2.5 rounded-xl border border-blue-100">
              <span className="text-[10px] text-slate-400 block">저당 완제품 유통사</span>
              <span className="font-bold text-xs text-slate-900 block mt-0.5">CJ제일제당 (상장)</span>
              <span className="text-[10px] text-blue-600 font-semibold mt-1 block">B2B 원료 및 글로벌 수출</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <span>📰</span> 트렌드 분석 언론 보도 요약
        </h2>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
          <div className="p-3.5 flex justify-between items-start gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                <span className="font-semibold text-slate-700">한국경제</span>
                <span>•</span>
                <span>2시간 전</span>
              </div>
              <h3 className="font-bold text-xs text-slate-900 line-clamp-1">2030 올영 세일 정조준... “글루타치온·...</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">에이피알 메디큐브 신제품 젤리 라인, 론칭 첫 주 완판 행진에 추...</p>
            </div>
            <ArrowUpRight size={16} className="text-slate-400 shrink-0 mt-1" />
          </div>

          <div className="p-3.5 flex justify-between items-start gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                <span className="font-semibold text-slate-700">매일경제</span>
                <span>•</span>
                <span>4시간 전</span>
              </div>
              <h3 className="font-bold text-xs text-slate-900 line-clamp-1">K-이너뷰티 글로벌 주문 폭주... 코스맥스·...</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">미국·일본 이커머스에서 한국산 비타민·글루타치온 젤리 제형 수...</p>
            </div>
            <ArrowUpRight size={16} className="text-slate-400 shrink-0 mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. 투자정보 뷰 (이미지 2 기준)
   ========================================================================= */
function InvestmentInfoView() {
  const [isBookmarked, setIsBookmarked] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                KOSPI 상장
              </span>
              <span className="text-[11px] text-slate-400 font-medium">278470</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">에이피알 (APR)</h1>
          </div>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2.5 rounded-xl border transition-colors ${
              isBookmarked 
                ? 'bg-slate-50 border-slate-200 text-slate-800' 
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            <Bookmark size={20} className={isBookmarked ? 'fill-slate-800' : ''} />
          </button>
        </div>

        <div className="bg-pink-50/70 border border-pink-100 p-3 rounded-xl flex items-start gap-2 text-xs text-slate-700">
          <span className="text-pink-500 shrink-0">🌸</span>
          <p className="font-medium leading-relaxed">
            우리가 쓰는 뷰티 디바이스 <span className="font-bold">'메디큐브'</span>와 뷰티 브랜드를 운영하는 기업이에요.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-slate-400 font-medium">현재 주가</span>
          <span className="text-[10px] text-slate-400">2026.10.28 장마감 기준</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900">52,400<span className="text-lg font-normal">원</span></span>
          <span className="text-sm font-bold text-red-500">▲ +2.1%</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-100">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>최근 주가 추세</span>
            <span>최근 1개월</span>
          </div>
          
          <div className="h-16 w-full relative pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 50">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path 
                d="M 0 35 Q 50 40 100 25 T 200 28 T 300 10 L 300 50 L 0 50 Z" 
                fill="url(#chartGradient)" 
              />
              <path 
                d="M 0 35 Q 50 40 100 25 T 200 28 T 300 10" 
                fill="none" 
                stroke="#ec4899" 
                strokeWidth="2.5" 
              />
              <circle cx="300" cy="10" r="4" fill="#ec4899" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3.5">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <Sparkles size={18} className="text-blue-600" /> AI 3줄 요약 브리프
        </h2>

        <div className="space-y-2">
          <div className="bg-slate-50 p-3 rounded-xl flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              2030 소비자 중심의 <span className="text-blue-600 font-bold">홈 뷰티기기 수요 급증세</span> 지속
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              미국 및 일본 수출액 중심 <span className="text-blue-600 font-bold">글로벌 채널의 비약적 신장</span>
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              브랜드 확장에 따른 <span className="text-blue-600 font-bold">최근 마케팅비 지출 관리 여부</span>가 핵심 관건
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl space-y-2 border border-slate-100">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700">
            <span>🔄 소비 트렌드</span>
            <span>↔️</span>
            <span>기업 실적 분석</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            올리브영 및 온라인 결제 데이터 급증이 뷰티 디바이스 실매출과 <span className="text-emerald-600 font-bold">매우 높은 양의 상관관계</span>를 형성하고 있습니다.
          </p>

          <div className="bg-white p-2.5 rounded-lg border border-slate-100 flex items-start gap-2 text-[10px] text-slate-400 mt-2">
            <span className="text-pink-500 font-bold text-xs">ⓘ</span>
            <p className="leading-tight">
              소비자 관심이나 제품 인기가 주가 상승을 보장하지 않으므로 투자 시 신중한 판단이 필요합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3.5">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-900">한눈에 보는 핵심 실적</h2>
          <span className="text-[11px] text-slate-400 font-medium">연간 기준 (YoY)</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-xl space-y-1">
            <span className="text-[11px] text-slate-400 font-medium block">연간 매출액</span>
            <p className="text-xl font-black text-slate-900">5,230<span className="text-xs font-normal">억</span></p>
            <span className="text-[11px] font-bold text-red-500 block pt-1">📈 +32% YoY</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl space-y-1">
            <span className="text-[11px] text-slate-400 font-medium block">영업이익 (이익률)</span>
            <p className="text-xl font-black text-slate-900">1,040<span className="text-xs font-normal">억</span></p>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 pt-1">
              <span className="w-3.5 h-3.5 border border-emerald-600 rounded-full flex items-center justify-center text-[9px] font-bold">┼</span>
              이익률 19.8%
            </span>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-500">매출 목표 달성률</span>
            <span className="text-blue-600 font-bold">88.4% 달성</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-900 rounded-full w-[88.4%]"></div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <Search size={18} className="text-blue-600" /> 내가 찜한 브랜드의 주식 이슈 & 투자 시그널
        </h2>

        <div className="space-y-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900">올리브영</span>
                <span className="text-[11px] text-slate-400">연관주: CJ (001040)</span>
              </div>
              <span className="text-xs font-bold text-red-500">📈+3.8%</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              올영세일 역대 최대 매출 경신 및 H&B 시장 독점력 강화로 모회사 지분가치 및 배당 확대 기대감 고조
            </p>
            <div className="flex gap-1.5 text-[10px]">
              <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded">#지분가치</span>
              <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded">#H&B독점</span>
              <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded">#배당확대</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900">무신사</span>
                <span className="text-[11px] text-slate-400">연관주: 감성코퍼레이션 (036620)</span>
              </div>
              <span className="text-xs font-bold text-red-500">📈+1.5%</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              봄 메가세일 흥행 지속 및 K-패션 해외 직판로 개척 수혜로 라이선스·의류 파트너사 호실적 기대
            </p>
            <div className="flex gap-1.5 text-[10px]">
              <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded">#메가세일흥행</span>
              <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded">#수출성장</span>
              <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded">#K패션수혜</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900">에이피알</span>
                <span className="text-[11px] text-slate-400">본종목 (278470)</span>
              </div>
              <span className="text-xs font-bold text-red-500">📈+2.1%</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              미국 및 일본 뷰티 디바이스 직수출 급증에 힘입어 1분기 영업이익 어닝 서프라이즈 가시화
            </p>
            <div className="flex gap-1.5 text-[10px]">
              <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded">#어닝서프라이즈</span>
              <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded">#해외직수출</span>
              <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded">#디바이스돌풍</span>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-900 hover:bg-slate-900 text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md">
        00증권에서 상세보기 <ChevronRight size={18} />
      </button>
    </div>
  );
}

/* =========================================================================
   5. 마이페이지 뷰 (이미지 3 기준)
   ========================================================================= */
function MyPageView({ likedBrands, setLikedBrands }) {
  const [shelfTab, setShelfTab] = useState('brand');
  const [notifications, setNotifications] = useState({
    newProduct: true,
    financialReport: true,
    weeklyReport: true
  });

  const initialBrandItems = [
    { id: 'm', logo: 'M', name: '무신사', tag: '소비 급상승', color: 'bg-slate-100 text-slate-800' },
    { id: 'oy', logo: 'OY', name: '올리브영', tag: '뷰티 1위', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'sb', logo: 'SB', name: '스타벅스', tag: '스테디셀러', color: 'bg-emerald-50 text-emerald-700' },
    { id: 'nk', logo: 'NK', name: '나이키', tag: '스니커즈 열풍', color: 'bg-purple-50 text-purple-700' },
    { id: 'tb', logo: 'TB', name: '탬버린즈', tag: 'MZ 럭셔리', color: 'bg-blue-50 text-blue-700' },
    { id: 'dc', logo: 'DC', name: '디스커버리', tag: '아웃도어', color: 'bg-purple-100 text-purple-800' },
  ];

  const [shelfItems, setShelfItems] = useState(initialBrandItems);

  const removeItem = (id) => {
    setShelfItems(shelfItems.filter(item => item.id !== id));
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 relative">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">백보경님</h1>
              <span className="bg-pink-50 text-pink-600 border border-pink-100 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>♀</span> 트렌드 탐험가 Lv.2
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500">초보 투자자 2개월차</p>
          </div>
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white">
            <User size={24} />
          </div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl space-y-1.5 border border-slate-100">
          <div className="flex justify-between items-center text-[11px]">
            <span className="w-5 h-5 bg-purple-600 rounded-full text-white flex items-center justify-center text-[10px] font-bold">
              ✨
            </span>
            <span className="text-slate-500 font-semibold">다음 레벨까지 <span className="text-purple-600 font-extrabold">32XP</span></span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full w-[65%]"></div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <Bookmark size={18} className="text-purple-600 fill-purple-600" /> 내가 찜한 서랍
          </h2>
          <button className="text-xs text-slate-400 font-medium">편집 &gt;</button>
        </div>

        <div className="bg-slate-200/70 p-1 rounded-xl flex text-xs font-bold">
          <button 
            onClick={() => setShelfTab('brand')}
            className={`flex-1 py-2 rounded-lg text-center transition-all ${
              shelfTab === 'brand' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            관심 브랜드 (6)
          </button>
          <button 
            onClick={() => setShelfTab('company')}
            className={`flex-1 py-2 rounded-lg text-center transition-all ${
              shelfTab === 'company' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            관심 기업 (3)
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {shelfItems.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl ${item.color} font-black text-xs flex items-center justify-center shrink-0`}>
                  {item.logo}
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900">{item.name}</h3>
                  <span className="text-[10px] text-purple-600 font-bold">{item.tag}</span>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-slate-500 p-1">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <Bell size={18} className="text-purple-600" /> 트렌드 맞춤 알림 설정
        </h2>

        <div className="space-y-3.5 divide-y divide-slate-100">
          <div className="flex items-center justify-between pt-1">
            <div className="space-y-0.5">
              <h3 className="font-bold text-xs text-slate-900">내 관심 브랜드 신제품 & 품절 대란 알림</h3>
              <p className="text-[10px] text-slate-400">실시간 SNS 바이럴 및 팝업 스토어 오픈 소식</p>
            </div>
            <button 
              onClick={() => toggleNotification('newProduct')}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                notifications.newProduct ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                notifications.newProduct ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3.5">
            <div className="space-y-0.5">
              <h3 className="font-bold text-xs text-slate-900">관심 브랜드 연관 기업 실적 발표 알림</h3>
              <p className="text-[10px] text-slate-400">소비 트렌드가 실적 공시로 연결되는 분기 모멘텀</p>
            </div>
            <button 
              onClick={() => toggleNotification('financialReport')}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                notifications.financialReport ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                notifications.financialReport ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3.5">
            <div className="space-y-0.5">
              <h3 className="font-bold text-xs text-slate-900">이번 주 급상승 2030 소비 트렌드 리포트</h3>
              <p className="text-[10px] text-slate-400">매주 월요일 아침 8시 발송되는 핵심 인텔리전스</p>
            </div>
            <button 
              onClick={() => toggleNotification('weeklyReport')}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                notifications.weeklyReport ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                notifications.weeklyReport ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <Clock size={18} className="text-purple-600" /> 최근 확인한 콘텐츠 히스토리
          </h2>
          <button className="text-xs text-slate-400 font-medium">기록 삭제</button>
        </div>

        <div className="space-y-2">
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-pink-100 overflow-hidden shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=200&q=80" 
                  alt="리포트" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="bg-purple-50 text-purple-600 text-[9px] font-bold px-1.5 py-0.5 rounded">트렌드 리포트</span>
                  <span className="text-[10px] text-slate-400">어제 조회</span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 line-clamp-1">K-글루타치온 젤리 트렌드 리포트</h3>
                <p className="text-[10px] text-slate-400 line-clamp-1">MZ 이너뷰티 소비 급증과 건강기능식품 밸류체인</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300 shrink-0 ml-1" />
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 overflow-hidden shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80" 
                  alt="기업 분석" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="bg-pink-50 text-pink-600 text-[9px] font-bold px-1.5 py-0.5 rounded">AI 기업 분석</span>
                  <span className="text-[10px] text-slate-400">3일 전 조회</span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 line-clamp-1">에이피알(메디큐브) AI 기업 분석</h3>
                <p className="text-[10px] text-slate-400 line-clamp-1">홈 뷰티 디바이스 북미/일본 침투율과 실적 전망</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300 shrink-0 ml-1" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <Lock size={18} className="text-purple-600" /> 데이터 및 보안 설정
        </h2>

        <div className="space-y-2 pt-1">
          <div className="p-2.5 rounded-xl bg-slate-50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xs text-slate-900">소비 마이데이터(MyData) 연동 관리</h3>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">신한카드 외 2개 금융사 정상 연동 중</p>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xs text-slate-900">개인정보 및 트렌드 데이터 이용 동의 현황</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">필수 3건 동의 완료 · 선택 맞춤형 혜택 동의 중</p>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400 space-x-2 pt-2 pb-4">
        <button className="hover:underline">서비스 이용약관</button>
        <span>·</span>
        <button className="hover:underline">로그아웃</button>
        <span>·</span>
        <button className="hover:underline">회원 탈퇴</button>
      </div>
    </div>
  );
}

/* =========================================================================
   6. 검색 및 통합 검색 결과 뷰 (Supabase 연동 포함)
   ========================================================================= */
function SearchView({ searchQuery, setSearchQuery, onClose, setActiveTab }) {
  const [term, setTerm] = useState(searchQuery || '');
  const [recentSearches, setRecentSearches] = useState(['메가커피', '삼양식품', '아모레퍼시픽', '에이피알', '올리브영']);
  const [status, setStatus] = useState("idle");

  const popularKeywords = [
    { rank: 1, name: '에이피알', isUp: true },
    { rank: 2, name: '글루타치온 젤리', isUp: true },
    { rank: 3, name: '올리브영 세일', isUp: false },
    { rank: 4, name: '무신사 메가세일', isUp: true },
    { rank: 5, name: '다이소 뷰티', isUp: true }
  ];

  // Supabase input_db 테이블에 데이터 추가 함수
  const handleInsert = async (content) => {
    const trimmedContent = content.trim();
    if (!trimmedContent || status === "saving") return;

    setStatus("saving");

    try {
      const { error } = await supabase
        .from("input_db")
        .insert({ input: trimmedContent });

      if (error) throw error;

      setStatus("saved");
      console.log("Supabase 저장 성공:", trimmedContent);
    } catch (err) {
      console.error("Supabase 저장 실패:", err.message);
      setStatus("error");
    }
  };

  const handleSearch = (keyword) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    setTerm(trimmed);
    
    if (!recentSearches.includes(trimmed)) {
      setRecentSearches([trimmed, ...recentSearches.slice(0, 4)]);
    }

    handleInsert(trimmed);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-5 animate-fadeIn">
      <div className="flex items-center gap-2">
        <button onClick={onClose} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <div className="relative flex-1 flex items-center">
          <Search size={18} className="absolute left-3 text-slate-400" />
          <input 
            type="text" 
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(term)}
            placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..."
            autoFocus
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:border-blue-500 shadow-sm"
          />
          {term && (
            <button onClick={() => setTerm('')} className="absolute right-3 text-slate-400">
              <X size={16} />
            </button>
          )}
        </div>
        <button 
          onClick={() => handleSearch(term)}
          disabled={status === "saving"}
          className="bg-blue-600 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shrink-0 disabled:bg-slate-400"
        >
          {status === "saving" ? "저장중..." : "검색"}
        </button>
      </div>

      {!term ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">최근 검색어</span>
              <button onClick={() => setRecentSearches([])} className="text-slate-400">전체 삭제</button>
            </div>
            {recentSearches.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item, idx) => (
                  <span 
                    key={idx}
                    onClick={() => handleSearch(item)}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer hover:bg-slate-50"
                  >
                    <span>{item}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setRecentSearches(recentSearches.filter(s => s !== item));
                      }} 
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-2">최근 검색 내역이 없습니다.</p>
            )}
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <span className="text-red-500">🔥</span> 실시간 인기 검색 트렌드
              </h3>
              <span className="text-[10px] text-slate-400">14:00 기준</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {popularKeywords.map((item) => (
                <div 
                  key={item.rank}
                  onClick={() => handleSearch(item.name)}
                  className="flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-extrabold w-4 text-center ${item.rank <= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
                      {item.rank}
                    </span>
                    <span className="font-semibold text-slate-800">{item.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${item.isUp ? 'text-red-500' : 'text-slate-400'}`}>
                    {item.isUp ? '▲ 급상승' : '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 font-medium">
            '<span className="text-blue-600 font-bold">{term}</span>' 검색 결과입니다.
          </p>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">연관 상장 기업</span>
            <div className="flex items-center justify-between pt-1">
              <div>
                <h4 className="font-bold text-sm text-slate-900">에이피알 (278470)</h4>
                <p className="text-xs text-slate-400 mt-0.5">뷰티 디바이스 메디큐브 제조 및 유통</p>
              </div>
              <button 
                onClick={() => {
                  onClose();
                  setActiveTab('investmentInfo');
                }}
                className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                분석 보기 <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">관련 소비 트렌드</span>
            <h4 className="font-bold text-xs text-slate-900 pt-1">글루타치온 젤리 & 이너뷰티 품절 대란</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              2030 소비자의 이너뷰티 디바이스 및 기능성 디저트 구매 급증에 따른 분석 결과...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}