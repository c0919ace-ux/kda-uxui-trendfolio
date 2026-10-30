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
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-20 font-sans text-slate-800 relative shadow-xl">
      {/* 댓글 상세 화면 모달 */}
      {selectedIssue ? (
        <CommentView 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
        />
      ) : isSearchOpen ? (
        /* 검색 화면 모달 */
        <SearchView 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => setIsSearchOpen(false)}
        />
      ) : (
        <>
          {/* Header */}
          <header className="sticky top-0 bg-white/95 backdrop-blur-md z-50 px-4 py-3 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              {activeTab === 'myPage' ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveTab('home')} className="p-1 -ml-1 text-slate-700">
                    <ChevronLeft size={24} />
                  </button>
                  <span className="text-lg font-bold text-slate-900">My Page</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-600 font-bold block leading-none">00증권</span>
                    <span className="text-base font-black text-slate-900 leading-none">TrendFolio</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              {activeTab !== 'myPage' && (
                <>
                  <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-full">
                    <Search size={20} />
                  </button>
                  <button className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-full relative">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                </>
              )}
              <button 
                onClick={() => setActiveTab('myPage')}
                className={`p-1.5 rounded-full transition-colors ${activeTab === 'myPage' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
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
              />
            )}
            {activeTab === 'myExpense' && (
              <MyExpenseView likedBrands={likedBrands} toggleLike={toggleLike} setLikedBrands={setLikedBrands} />
            )}
            {activeTab === 'stockTrend' && (
              <StockTrendView />
            )}
            {activeTab === 'investmentInfo' && (
              <InvestmentInfoView />
            )}
            {activeTab === 'myPage' && (
              <MyPageView likedBrands={likedBrands} setLikedBrands={setLikedBrands} />
            )}
          </main>

          {/* Bottom Nav */}
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-2.5 flex justify-between items-center z-50">
            <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <Home size={20} />
              <span className="text-[11px]">홈</span>
            </button>
            <button onClick={() => setActiveTab('myExpense')} className={`flex flex-col items-center gap-1 ${activeTab === 'myExpense' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <CreditCard size={20} />
              <span className="text-[11px]">내 소비</span>
            </button>
            <button onClick={() => setActiveTab('stockTrend')} className={`flex flex-col items-center gap-1 ${activeTab === 'stockTrend' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <LineChart size={20} />
              <span className="text-[11px]">주식 트렌드</span>
            </button>
            <button onClick={() => setActiveTab('investmentInfo')} className={`flex flex-col items-center gap-1 ${activeTab === 'investmentInfo' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
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
   1. 홈 뷰
   ========================================================================= */
function HomeView({ setActiveTab, onOpenSearch, onOpenComment }) {
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
            <span className="text-[11px] font-extrabold text-pink-500 tracking-wider">LIFESTYLE TO WEALTH</span>
            <h1 className="text-2xl font-black text-slate-900 mt-0.5">
              요즘 다들 <span className="text-blue-600">뭐 사지 ?</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 mt-0.5">실시간 소비 레이더</p>
          </div>
          <div className="p-3 bg-slate-100 rounded-full text-slate-800">
            <ShoppingBag size={22} />
          </div>
        </div>

        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..." 
            className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-9 pr-20 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg shrink-0 font-medium text-xs hover:bg-slate-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 실시간 급상승 소비 트렌드 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-1">
            <span className="text-red-500">🔥</span> 실시간 급상승 소비 트렌드
          </h2>
          <span className="text-[10px] font-extrabold text-blue-600 tracking-wider">LIVE NOW</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <div className="min-w-[220px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
            <div className="relative h-28 bg-slate-200">
              <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80" alt="디저트" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-md">2030 오픈런 간식 1위</span>
              <span className="absolute bottom-2 right-2 text-white text-[10px] font-bold">📈 +420%</span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-xs text-slate-900 line-clamp-1">달콤바삭 끝판왕! 빠리바게트 초코...</h3>
              <p className="text-[11px] text-slate-400 mt-1">SNS 숏폼 타고 전국 매장 조기 품절 행진</p>
            </div>
          </div>

          <div className="min-w-[180px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
            <div className="relative h-28 bg-slate-200">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80" alt="올리브영" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">세일 완판</span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-xs text-slate-900">올리브영</h3>
              <p className="text-[11px] text-slate-400 mt-1">실리콘투 · 코스...</p>
            </div>
          </div>
        </div>
      </div>

      {/* 내가 찜한 브랜드의 트렌드 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">내가 찜한 브랜드의 트렌드</h2>
            <p className="text-[11px] text-slate-400">소비자가 주목하는 최신 핫이슈 & 이벤트 모음</p>
          </div>
          <button onClick={() => setActiveTab('myExpense')} className="text-xs text-blue-600 font-bold flex items-center">
            전체보기<ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white text-[9px] font-black tracking-tighter">MUSINSA</div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900">무신사</span>
                  <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">빅세일</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">스프링 메가세일 최대 80% 할인</p>
              </div>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-700 truncate">
                <span className="text-pink-500">🏷️</span>
                <span className="truncate text-[11px]">무신사 스프링 메가세일 시작! 단독...</span>
              </div>
              <button className="text-blue-600 font-bold shrink-0 flex items-center text-[10px]">
                세일 혜택 보기 <ChevronRight size={12} />
              </button>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-800 rounded-full flex items-center justify-center text-white font-bold text-xs">☕</div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900">스타벅스</span>
                  <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded">프로모션</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">프리퀀시 증정품 조기 소진 주의</p>
              </div>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-700 truncate">
                <span className="text-emerald-600">🎉</span>
                <span className="truncate text-[11px]">봄 시즌 한정 체리블라썸 음료 & MD 오픈...</span>
              </div>
              <button className="text-blue-600 font-bold shrink-0 flex items-center text-[10px]">
                이벤트 보기 <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 신제품 & 소셜 핫이슈 */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-1">
          <span className="text-blue-600">⚡</span> 신제품 & 소셜 핫이슈
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {issues.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-28 bg-slate-100 relative overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 space-y-1">
                  <span className="text-[10px] font-medium text-slate-400">{item.tag}</span>
                  <h3 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                    <span className="flex items-center gap-0.5"><MessageSquare size={10} /> {item.commentsCount}</span>
                    <span className="flex items-center gap-0.5 text-pink-500"><Heart size={10} /> {item.likesCount}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 pt-0">
                <button 
                  onClick={() => onOpenComment(item)}
                  className="w-full text-left text-[11px] font-semibold text-slate-400 flex items-center justify-between border-t border-slate-50 pt-2 hover:text-blue-600"
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
   2. 내 소비 뷰
   ========================================================================= */
function MyExpenseView({ likedBrands, toggleLike, setLikedBrands }) {
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

  return (
    <div className="space-y-5">
      <div className="bg-slate-100 py-1.5 px-3 rounded-xl flex items-center gap-2 text-[11px] text-slate-600 font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>신한·현대카드 등 3개 카드사 및 페이 연동 완료</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">나의 소비 관심사 분석</h1>
        <div className="p-2 bg-slate-100 rounded-full text-slate-700">
          <ShoppingBag size={18} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
            📊
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900">최근 한달 카테고리별 소비 분석</h2>
            <p className="text-[10px] text-slate-400">카드·페이 실결제 312건 전수 데이터 마이데이터 정밀 분석</p>
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">총 소비 누적액</span>
            <span className="text-pink-500 font-bold text-[11px]">↑ 직전 월 대비 +8.4%</span>
          </div>
          <p className="text-2xl font-black text-slate-900">1,842,000 원</p>
          <div className="flex h-2 rounded-full overflow-hidden gap-1 pt-1">
            <div className="w-[38%] bg-purple-500 rounded-full"></div>
            <div className="w-[29%] bg-pink-400 rounded-full"></div>
            <div className="w-[21%] bg-emerald-500 rounded-full"></div>
            <div className="w-[12%] bg-slate-400 rounded-full"></div>
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
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Heart size={14} className="text-pink-500 fill-pink-500" /> 내가 찜한 브랜드 <span className="text-pink-500">{likedBrands.length}</span>
          </h3>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="text-[11px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-xl"
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
              className="flex-1 bg-slate-100 border-none rounded-xl py-1.5 px-3 text-xs focus:outline-none"
            />
            <button onClick={handleAddBrand} className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl">추가</button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {likedBrands.length === 0 ? (
            <p className="text-xs text-slate-400 py-2">찜한 브랜드가 없습니다. 위에서 찜하기를 눌러보세요!</p>
          ) : (
            likedBrands.map((b, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                {b}
                <button 
                  onClick={() => toggleLike(b)} 
                  className="text-slate-400 hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. 주식 트렌드 뷰
   ========================================================================= */
function StockTrendView() {
  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        <button className="bg-blue-700 text-white px-3.5 py-1.5 rounded-xl shrink-0">📈 전체 트렌드</button>
        <button className="bg-white text-slate-600 border border-slate-200 px-3.5 py-1.5 rounded-xl shrink-0">🍽️ 식음료/F&B</button>
        <button className="bg-white text-slate-600 border border-slate-200 px-3.5 py-1.5 rounded-xl shrink-0">💄 K-뷰티</button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-md">📈 소비자 버즈 급상승 1위</span>
          <span className="text-slate-400 text-[10px]">2024.11 ~ 2025.02</span>
        </div>

        <h2 className="text-base font-black text-slate-900 leading-snug">
          품절 대란 'K-글루타치온 젤리'와 이너뷰티 급상승
        </h2>

        <div className="relative rounded-2xl overflow-hidden h-36 bg-slate-100">
          <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" alt="뷰티" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. 투자 정보 뷰
   ========================================================================= */
function InvestmentInfoView() {
  return (
    <div className="space-y-5">
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">KOSPI 상장</span>
              <span className="text-[10px] text-slate-400">278470</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 mt-1">에이피알 (APR)</h1>
          </div>
          <button className="p-2 bg-slate-100 rounded-xl text-slate-600">
            <Bookmark size={18} />
          </button>
        </div>

        <div className="bg-pink-50/60 p-3 rounded-2xl flex items-center gap-2 text-xs text-slate-700">
          <span className="text-pink-500 text-base">🌷</span>
          <span>우리가 쓰는 뷰티 디바이스 <strong>'메디큐브'</strong>와 뷰티 브랜드를 운영하는 기업이에요.</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. 마이페이지 뷰
   ========================================================================= */
function MyPageView({ likedBrands, setLikedBrands }) {
  return (
    <div className="space-y-5">
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg">
          <User size={24} />
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="font-black text-base text-slate-900">백보경님</h2>
            <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-0.5 rounded-full">🌷트렌드 탐험가 Lv.2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. 검색 뷰
   ========================================================================= */
function SearchView({ searchQuery, setSearchQuery, onClose }) {
  const [localInput, setLocalInput] = useState(searchQuery);

  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-4 z-50 relative">
      <div className="flex items-center gap-2">
        <button onClick={onClose} className="p-1 text-slate-700 hover:bg-slate-200 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input 
            type="text" 
            value={localInput}
            onChange={(e) => {
              setLocalInput(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..." 
            className="w-full bg-white border border-blue-500 rounded-xl py-2.5 pl-9 pr-4 text-xs focus:outline-none shadow-sm"
            autoFocus
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center py-12 space-y-2">
        <p className="font-bold text-sm text-slate-800">
          "{localInput || searchQuery}"에 대한 검색 결과
        </p>
        <p className="text-xs text-slate-400">
          {localInput ? '관련 소비 트렌드 및 주식 종목을 찾았습니다.' : '검색어를 입력해 주세요.'}
        </p>
      </div>
    </div>
  );
}

/* =========================================================================
   7. 트렌드 의견 나누기 뷰 (Supabase DB 저장 & 삭제 & 영구 보존 완벽 구현)
   ========================================================================= */
function CommentView({ issue, onClose }) {
  const [selectedFeeling, setSelectedFeeling] = useState('기대돼요');
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('idle');
  const [comments, setComments] = useState([]);

  // 💡 1. 창을 열었을 때 Supabase DB에서 기존 댓글들 불러오기 (새로고침/재접속 시 유지)
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
          // 저장된 "[기대돼요] 내용" 형태에서 감정과 본문 분리
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
        // DB 데이터가 없는 경우 초기 가이드 예시 댓글 2개 표기
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

  // 💡 2. 댓글 새 작성 & Supabase 저장
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
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  // 💡 3. 댓글 삭제 (Supabase DB에서도 완전 삭제)
  const handleDelete = async (id) => {
    // 목업(예시) 댓글 삭제 처리
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
      alert('댓글 삭제 실패: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative animate-fadeIn pb-24 z-50">
      <div className="sticky top-0 bg-white/95 backdrop-blur-md z-40 px-4 py-3 flex items-center justify-between border-b border-slate-100">
        <button onClick={onClose} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-sm font-bold text-slate-900">트렌드 의견 나누기</h1>
        <button onClick={onClose} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <img src={issue?.img} alt={issue?.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">#{issue?.tag}</span>
            <h2 className="font-bold text-xs text-slate-900 leading-snug">{issue?.title}</h2>
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
          <h3 className="font-bold text-xs text-slate-900">실시간 의견 피드 ({comments.length})</h3>

          {comments.map((c) => (
            <div key={c.id} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm space-y-1.5 relative group">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                    {c.user[0]}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{c.user}</span>
                    <span className="text-[9px] text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded ml-1.5">{c.level}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                  {/* 💡 삭제 버튼 */}
                  <button 
                    onClick={() => handleDelete(c.id)}
                    title="댓글 삭제"
                    className="text-slate-300 hover:text-red-500 p-1 rounded-md transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <span className="inline-block text-[9px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                {c.feeling}
              </span>

              <p className="text-xs text-slate-700 leading-relaxed pr-6">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 p-3 space-y-2 z-50">
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
            placeholder="이 이슈에 대한 의견을 남겨주세요..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
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