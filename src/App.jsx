import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Search, Bell, User, ShoppingBag, TrendingUp, Sparkles, 
  ChevronRight, Heart, Bookmark, ArrowUpRight, MessageSquare,
  Home, CreditCard, LineChart, PieChart, Check, X,
  Shield, Settings, Clock, ChevronLeft, Lock
} from 'lucide-react';

// Vercel Environment Variables 사용
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);

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
      {/* 의견 남기기 모달/화면 */}
      {selectedIssue ? (
        <CommentView 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
        />
      ) : isSearchOpen ? (
        <SearchView 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => setIsSearchOpen(false)}
          setActiveTab={setActiveTab}
        />
      ) : (
        <>
          {/* Header */}
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
                  <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-full">
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

          {/* Main Content */}
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
                onOpenComment={(issue) => setSelectedIssue(issue)}
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

          {/* Bottom Nav */}
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center z-50">
            <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <Home size={22} />
              <span className="text-xs">홈</span>
            </button>
            <button onClick={() => setActiveTab('myExpense')} className={`flex flex-col items-center gap-1 ${activeTab === 'myExpense' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <CreditCard size={22} />
              <span className="text-xs">내 소비</span>
            </button>
            <button onClick={() => setActiveTab('stockTrend')} className={`flex flex-col items-center gap-1 ${activeTab === 'stockTrend' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <LineChart size={22} />
              <span className="text-xs">주식 트렌드</span>
            </button>
            <button onClick={() => setActiveTab('investmentInfo')} className={`flex flex-col items-center gap-1 ${activeTab === 'investmentInfo' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
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
   1. 홈 뷰 (의견 남기기 모달 연결)
   ========================================================================= */
function HomeView({ setActiveTab, likedBrands, toggleLike, onOpenSearch, onOpenComment }) {
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

        <div className="relative flex items-center">
          <Search size={18} className="absolute left-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-20 text-sm focus:outline-none focus:border-blue-500 shadow-sm"
            onKeyDown={(e) => e.key === 'Enter' && onOpenSearch(e.target.value)}
          />
          <button 
            onClick={(e) => onOpenSearch(e.currentTarget.previousElementSibling.value)}
            className="absolute right-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg"
          >
            검색
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1 scrollbar-none">
          <span className="text-slate-400 flex items-center gap-1 shrink-0">🕒 최근 본</span>
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

      {/* 실시간 급상승 소비 트렌드 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <span className="text-red-500">🔥</span> 실시간 급상승 소비 트렌드
          </h2>
          <span className="text-[11px] font-extrabold text-blue-600">LIVE NOW</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <div className="min-w-[240px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
            <div className="relative h-32 bg-slate-200">
              <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80" alt="디저트" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">2030 오픈런 간식 1위</span>
              <span className="absolute bottom-2 right-2 bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md">↗ +420%</span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm text-slate-900 line-clamp-1">달콤바삭 끝판왕! 빠리바게트 초코...</h3>
              <p className="text-xs text-slate-500 mt-1">SNS 숏폼 타고 전국 매장 조기 품절 행진</p>
            </div>
          </div>

          <div className="min-w-[200px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
            <div className="relative h-32 bg-slate-200">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80" alt="올리브영" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">세일 완판</span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm text-slate-900">올리브영</h3>
              <p className="text-xs text-slate-500 mt-1">실리콘투 · 코스...</p>
            </div>
          </div>
        </div>
      </div>

      {/* 내가 찜한 브랜드의 트렌드 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">내가 찜한 브랜드의 트렌드</h2>
            <p className="text-xs text-slate-500">소비자가 주목하는 최신 핫이슈 & 이벤트 모음</p>
          </div>
          <button onClick={() => setActiveTab('myExpense')} className="text-xs text-blue-600 font-semibold flex items-center">
            전체보기 <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white text-[10px] font-extrabold tracking-tighter">MUSINSA</div>
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
              <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xs">☕</div>
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
        </div>
      </div>

      {/* 신제품 & 소셜 핫이슈 (의견 남기기 버튼) */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <span className="text-blue-600">⚡</span> 신제품 & 소셜 핫이슈
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {issues.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-28 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover z-10 relative"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="text-2xl absolute z-0">✨</span>
                </div>
                <div className="p-3 space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{item.tag}</span>
                  <h3 className="font-bold text-xs text-slate-900 leading-snug">{item.title}</h3>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-0.5"><MessageSquare size={12} /> {item.commentsCount}</span>
                    <span className="flex items-center gap-0.5 text-pink-500"><Heart size={12} /> {item.likesCount}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 pt-0">
                <button 
                  onClick={() => onOpenComment(item)}
                  className="w-full text-left text-xs font-semibold text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2 hover:text-blue-600"
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
   2. 내 소비 뷰 (복구된 풍성한 UI)
   ========================================================================= */
function MyExpenseView({ likedBrands, toggleLike }) {
  const allBrands = [
    { name: "스타벅스", category: "카페/디저트", exp: "주 4회 방문", icon: "☕", bg: "bg-emerald-700" },
    { name: "나이키", category: "패션/잡화", exp: "최근 3개월 25만원", icon: "✔️", bg: "bg-black" },
    { name: "올리브영", category: "뷰티/헬스", exp: "월 평균 8만원", icon: "💄", bg: "bg-lime-600" },
    { name: "무신사", category: "패션/쇼핑", exp: "최근 1개월 12만원", icon: "M", bg: "bg-slate-900" },
    { name: "다이소", category: "생활/잡화", exp: "주 2회 방문", icon: "🌸", bg: "bg-red-600" },
    { name: "메가커피", category: "카페/음료", exp: "주 5회 방문", icon: "💛", bg: "bg-yellow-500" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-5 text-white space-y-3 shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-medium">3월 소비 요약</span>
          <span className="text-xs opacity-80">전월 대비 +12%</span>
        </div>
        <div>
          <p className="text-xs text-blue-100">이번 달 총 소비 금액</p>
          <h2 className="text-2xl font-black mt-0.5">1,420,500 원</h2>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center justify-between text-xs">
          <span>☕ 카페/디저트 지출이 가장 많아요</span>
          <span className="font-bold text-yellow-300">42%</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-900">내가 자주 이용하는 브랜드</h2>
          <span className="text-xs text-slate-400">하트 클릭 시 찜 등록</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {allBrands.map((b, idx) => {
            const isLiked = likedBrands.includes(b.name);
            return (
              <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${b.bg} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                    {b.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900">{b.name}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{b.category}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{b.exp}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleLike(b.name)} 
                  className={`p-2 rounded-full transition-colors ${isLiked ? 'text-pink-500 bg-pink-50' : 'text-slate-300 bg-slate-50'}`}
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. 주식 트렌드 뷰 (복구된 풍성한 UI)
   ========================================================================= */
function StockTrendView({ setActiveTab }) {
  const stocks = [
    { name: "CJ제일제당", code: "097950", price: "324,500원", change: "+3.8%", tag: "오픈런 간식 히트", isUp: true },
    { name: "삼양식품", code: "003230", price: "215,000원", change: "+5.2%", tag: "해외 품절 대란", isUp: true },
    { name: "신세계인터내셔날", code: "031430", price: "18,450원", change: "-1.1%", tag: "봄 세일 진행중", isUp: false },
    { name: "아모레퍼시픽", code: "090430", price: "128,000원", change: "+2.4%", tag: "뷰티 앰플 품절", isUp: true }
  ];

  return (
    <div className="space-y-5">
      <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-2 shadow-lg">
        <span className="text-xs font-bold text-blue-400 tracking-wider">CONSUMPTION TO STOCK</span>
        <h1 className="text-xl font-bold">내 소비가 주식이 된다면?</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          자주 사는 제품과 브랜드 기업의 실시간 주가를 확인하고 트렌드에 투자해 보세요.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <span>📈</span> 실시간 관심 수혜주 TOP 4
        </h2>

        <div className="space-y-2.5">
          {stocks.map((s, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{s.name}</span>
                  <span className="text-[10px] text-slate-400">{s.code}</span>
                </div>
                <span className="inline-block text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {s.tag}
                </span>
              </div>
              <div className="text-right">
                <div className="font-extrabold text-sm text-slate-900">{s.price}</div>
                <div className={`text-xs font-bold ${s.isUp ? 'text-red-500' : 'text-blue-500'}`}>
                  {s.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. 투자 정보 뷰 (복구된 풍성한 UI)
   ========================================================================= */
function InvestmentInfoView() {
  const reports = [
    { title: "2030 오픈런 디저트 열풍과 관련 수혜주 분석", author: "00증권 리서치", date: "2026.03.28", views: "1.2k" },
    { title: "다이소 가성비 뷰티 라인업 확장에 따른 화장품 ODM 영향", author: "트렌드 Lab", date: "2026.03.25", views: "850" },
    { title: "K-푸드 글로벌 인기에 따른 음식점 및 식품 기업 전망", author: "00증권 리서치", date: "2026.03.20", views: "2.1k" }
  ];

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-xl font-black text-slate-900">소비 인사이트 & 리포트</h1>
        <p className="text-xs text-slate-500">빅데이터로 분석한 최신 트렌드 투자 리포트</p>
      </div>

      <div className="bg-purple-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
        <div>
          <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded">WEEKLY PICK</span>
          <h3 className="font-bold text-sm mt-1">이번 주 가장 핫한 소비 키워드</h3>
          <p className="text-xs text-purple-200 mt-0.5">#오픈런_간식 #가성비_뷰티</p>
        </div>
        <Sparkles size={28} className="text-yellow-300 shrink-0" />
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">최신 투자 분석 리포트</h2>
        <div className="space-y-2.5">
          {reports.map((r, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2 hover:border-purple-200 transition-colors">
              <h3 className="font-bold text-sm text-slate-900 leading-snug">{r.title}</h3>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-50">
                <span>{r.author} · {r.date}</span>
                <span>조회 {r.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. 마이 페이지 뷰 (복구된 풍성한 UI)
   ========================================================================= */
function MyPageView({ likedBrands, setLikedBrands }) {
  return (
    <div className="space-y-5">
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-lg shadow-md">
          백
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="font-bold text-base text-slate-900">백보경 님</h2>
            <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Lv.2 수집가</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">trend_collector@trendfolio.com</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
          <Heart size={16} className="text-pink-500 fill-pink-500" /> 내가 찜한 브랜드 목록 ({likedBrands.length}개)
        </h3>
        {likedBrands.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">아직 찜한 브랜드가 없습니다.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {likedBrands.map((brand, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                {brand}
                <button 
                  onClick={() => setLikedBrands(likedBrands.filter(b => b !== brand))}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100 text-xs">
        <div className="p-3.5 flex items-center justify-between text-slate-700 hover:bg-slate-50 cursor-pointer">
          <span className="flex items-center gap-2"><Clock size={16} /> 최근 작성한 트렌드 의견</span>
          <ChevronRight size={14} className="text-slate-400" />
        </div>
        <div className="p-3.5 flex items-center justify-between text-slate-700 hover:bg-slate-50 cursor-pointer">
          <span className="flex items-center gap-2"><Shield size={16} /> 계정 보안 및 알림 설정</span>
          <ChevronRight size={14} className="text-slate-400" />
        </div>
        <div className="p-3.5 flex items-center justify-between text-slate-700 hover:bg-slate-50 cursor-pointer">
          <span className="flex items-center gap-2"><Settings size={16} /> 고객센터 및 의견 보내기</span>
          <ChevronRight size={14} className="text-slate-400" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. 검색 뷰
   ========================================================================= */
function SearchView({ searchQuery, setSearchQuery, onClose }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={onClose} className="p-1 text-slate-700">
          <ChevronLeft size={24} />
        </button>
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 shadow-sm"
            autoFocus
          />
        </div>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center py-8 text-slate-400 text-sm">
        "{searchQuery}"에 대한 검색 결과가 있습니다.
      </div>
    </div>
  );
}

/* =========================================================================
   7. 트렌드 의견 나누기 뷰 (Supabase DB 저장 연동)
   ========================================================================= */
function CommentView({ issue, onClose }) {
  const [selectedFeeling, setSelectedFeeling] = useState('기대돼요');
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('idle');

  const [comments, setComments] = useState([
    {
      id: 1,
      user: '민트초코 님',
      level: 'Lv.2',
      time: '11분 전',
      feeling: '🔥 기대돼요',
      text: '저 여기 주말에 2시간 웨이팅해서 먹었는데 진짜 대박이에요... 주식 사야하나 고민됨',
      likes: 12
    },
    {
      id: 2,
      user: '초보자 님',
      level: 'Lv.1',
      time: '30분 전',
      feeling: '🤔 글쎄요',
      text: '요즘 콜라보가 너무 많아서 금방 식지 않을까 걱정되네요.',
      likes: 3
    }
  ]);

  const handleSubmit = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || status === 'saving') return;

    setStatus('saving');

    try {
      const fullContent = `[${selectedFeeling}] ${trimmed}`;
      const { error } = await supabase
        .from('input_db')
        .insert({ input: fullContent });

      if (error) throw error;

      const newComment = {
        id: Date.now(),
        user: '백보경 님',
        level: 'Lv.2',
        time: '방금 전',
        feeling: selectedFeeling === '기대돼요' ? '🔥 기대돼요' : selectedFeeling === '이미 샀어요' ? '🛒 이미 샀어요' : '🤔 글쎄요',
        text: trimmed,
        likes: 0
      };

      setComments([newComment, ...comments]);
      setInputText('');
      setStatus('saved');
    } catch (err) {
      console.error('의견 저장 에러:', err.message);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative animate-fadeIn pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-40 px-4 py-3 flex items-center justify-between border-b border-slate-100">
        <button onClick={onClose} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-base font-bold text-slate-900">트렌드 의견 나누기</h1>
        <button onClick={onClose} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full">
          <X size={22} />
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <img src={issue?.img} alt={issue?.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">#{issue?.tag}</span>
            <h2 className="font-bold text-sm text-slate-900 leading-snug">{issue?.title}</h2>
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

        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-sm text-slate-900">실시간 의견 피드</h3>

          {comments.map((c) => (
            <div key={c.id} className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                    {c.user[0]}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{c.user}</span>
                    <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded ml-1.5">{c.level}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">{c.time}</span>
              </div>

              <span className="inline-block text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                {c.feeling}
              </span>

              <p className="text-xs text-slate-700 leading-relaxed">{c.text}</p>

              <div className="flex justify-end pt-1">
                <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-pink-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                  <Heart size={12} /> {c.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 의견 입력 바 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 p-3.5 space-y-2.5 z-50">
        <div className="flex gap-2">
          {[
            { id: '기대돼요', label: '🔥 기대돼요' },
            { id: '이미 샀어요', label: '🛒 이미 샀어요' },
            { id: '글쎄요', label: '🤔 글쎄요' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFeeling(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedFeeling === f.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
            placeholder="이 이슈에 대한 의견이나 소비 경험을 남겨주세요..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSubmit}
            disabled={status === 'saving'}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 transition-colors disabled:bg-slate-300"
          >
            {status === 'saving' ? '저장중...' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
}